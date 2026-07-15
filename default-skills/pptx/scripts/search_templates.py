#!/usr/bin/env python3
"""Search the template taxonomy using BM25 ranking with field-specific filtering.

Results are randomized within the same relevance tier to prevent alphabetical bias.
"""

import argparse
import json
import math
import os
import random
import re
import sys

TAXONOMY_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "template_taxonomy.json"
)

TEXT_FIELDS = [
    "stem",
    "color_scheme",
    "typography",
    "visual_density",
    "background",
    "accent_elements",
    "mood",
]

# BM25 parameters
K1 = 1.5
B = 0.75


def tokenize(text):
    """Split text into lowercase tokens."""
    return re.findall(r"[a-z0-9]+", text.lower())


def build_corpus(templates):
    """Tokenize all templates and compute corpus-level stats."""
    docs = []
    for t in templates:
        text = " ".join(str(t.get(f, "")).lower() for f in TEXT_FIELDS)
        docs.append(tokenize(text))
    return docs


def bm25_scores(docs, query_tokens):
    """Compute BM25 scores for each document given query tokens."""
    n = len(docs)
    avgdl = sum(len(d) for d in docs) / n if n else 1

    # Document frequency for each query term
    df = {}
    for token in query_tokens:
        df[token] = sum(1 for d in docs if token in d)

    # IDF using the standard BM25 formula
    idf = {}
    for token in query_tokens:
        idf[token] = math.log((n - df[token] + 0.5) / (df[token] + 0.5) + 1)

    scores = []
    for doc in docs:
        dl = len(doc)
        score = 0.0
        for token in query_tokens:
            tf = doc.count(token)
            numerator = tf * (K1 + 1)
            denominator = tf + K1 * (1 - B + B * dl / avgdl)
            score += idf[token] * numerator / denominator
        scores.append(score)
    return scores


def field_matches(template, filters):
    """Check if a template matches all field-specific filters."""
    for field, terms in filters.items():
        value = str(template.get(field, "")).lower()
        if not all(term in value for term in terms):
            return False
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Search pptx template taxonomy with BM25 ranking and field filters.",
        epilog="Examples:\n"
        "  %(prog)s dark luxury minimalist\n"
        "  %(prog)s --mood startup --color teal\n"
        "  %(prog)s fintech pitch --density balanced\n",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "keywords",
        nargs="*",
        help="Keywords to search across all fields (e.g. dark luxury fintech)",
    )
    parser.add_argument("--mood", nargs="+", help="Filter by mood (e.g. startup corporate)")
    parser.add_argument("--color", nargs="+", help="Filter by color_scheme (e.g. dark navy)")
    parser.add_argument("--density", nargs="+", help="Filter by visual_density (e.g. data-heavy)")
    parser.add_argument("--typography", nargs="+", help="Filter by typography (e.g. serif modern)")
    parser.add_argument(
        "--background", nargs="+", help="Filter by background (e.g. gradient photo)"
    )
    parser.add_argument("--accent", nargs="+", help="Filter by accent_elements")
    parser.add_argument(
        "--limit", "-n", type=int, default=5, help="Max results to return (default: 5)"
    )
    parser.add_argument(
        "--no-shuffle", action="store_true", help="Disable randomization (not recommended)"
    )
    parser.add_argument("--file", default=TAXONOMY_PATH, help="Path to template_taxonomy.json")
    args = parser.parse_args()

    keywords = [kw.lower() for kw in args.keywords] if args.keywords else []

    # Build field-specific filters
    filters = {}
    if args.mood:
        filters["mood"] = [t.lower() for t in args.mood]
    if args.color:
        filters["color_scheme"] = [t.lower() for t in args.color]
    if args.density:
        filters["visual_density"] = [t.lower() for t in args.density]
    if args.typography:
        filters["typography"] = [t.lower() for t in args.typography]
    if args.background:
        filters["background"] = [t.lower() for t in args.background]
    if args.accent:
        filters["accent_elements"] = [t.lower() for t in args.accent]

    if not keywords and not filters:
        parser.print_help()
        sys.exit(1)

    with open(args.file) as f:
        templates = json.load(f)

    results = templates

    # Apply field-specific filters first (exact substring match)
    if filters:
        results = [t for t in results if field_matches(t, filters)]

    # Apply BM25 keyword ranking
    if keywords:
        docs = build_corpus(results)
        query_tokens = []
        for kw in keywords:
            query_tokens.extend(tokenize(kw))

        scores = bm25_scores(docs, query_tokens)

        # Pair results with scores, drop zero-relevance
        scored = [(s, t) for s, t in zip(scores, results) if s > 0]

        if scored:
            scored.sort(key=lambda x: x[0], reverse=True)
            # Shuffle within same-score tiers to avoid alphabetical bias
            if not args.no_shuffle:
                grouped = {}
                for s, t in scored:
                    key = round(s, 3)
                    grouped.setdefault(key, []).append(t)
                results = []
                for key in sorted(grouped, reverse=True):
                    group = grouped[key]
                    random.shuffle(group)
                    results.extend(group)
            else:
                results = [t for _, t in scored]
        elif filters:
            # Keywords matched nothing, but field filters did -- keep the
            # filtered set instead of returning an empty list.
            if not args.no_shuffle:
                random.shuffle(results)
        else:
            results = []
    else:
        # No keywords, just field filters -- shuffle fully
        if not args.no_shuffle:
            random.shuffle(results)

    output = results[: args.limit]
    print(json.dumps(output, indent=2))
    if len(results) > args.limit:
        print(
            f"\n# Showing {args.limit} of {len(results)} matches. Use --limit to see more.",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
