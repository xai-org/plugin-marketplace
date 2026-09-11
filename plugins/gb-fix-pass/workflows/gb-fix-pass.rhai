let meta = #{
    name: "gb-fix-pass",
    description: "Run gb-extract-or-inline, gb-dead-and-duplicate, gb-fix-comments, then gb-fix-layout over every file the branch changed, one subagent per file per pass, then review the whole branch with gb-unification-pass. Leaves the edits uncommitted for review.",
    phases: [
        #{ title: "Extract or inline", detail: "one gb-extract-or-inline agent per changed source file" },
        #{ title: "Dead and duplicate", detail: "one gb-dead-and-duplicate agent per changed file, then one agent applies the cross-file findings" },
        #{ title: "Comments", detail: "one gb-fix-comments agent per changed file" },
        #{ title: "Layout", detail: "one gb-fix-layout agent per changed file" },
        #{ title: "Unification", detail: "one read-only gb-unification-pass agent over the whole branch" },
    ],
};

// Each pass reports against its skill's fixed sections; a missing section is a skipped pass.
let extract_schema = #{
    "type": "object", "required": ["extracted", "left_inline"],
    "properties": #{
        "extracted": #{ "type": "array", "items": #{ "type": "string" } },
        "left_inline": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
let dead_schema = #{
    "type": "object", "required": ["orphans", "twins", "pass_throughs", "tests", "asserts", "cross_file"],
    "properties": #{
        "orphans": #{ "type": "array", "items": #{ "type": "string" } },
        "twins": #{ "type": "array", "items": #{ "type": "string" } },
        "pass_throughs": #{ "type": "array", "items": #{ "type": "string" } },
        "tests": #{ "type": "array", "items": #{ "type": "string" } },
        "asserts": #{ "type": "array", "items": #{ "type": "string" } },
        "cross_file": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
let cross_file_schema = #{
    "type": "object", "required": ["applied", "skipped"],
    "properties": #{
        "applied": #{ "type": "array", "items": #{ "type": "string" } },
        "skipped": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
let unification_schema = #{
    "type": "object", "required": ["applies", "types", "size", "one_thing", "verdict"],
    "properties": #{
        "applies": #{ "type": "boolean" },
        "types": #{ "type": "array", "items": #{ "type": "string" } },
        "size": #{ "type": "array", "items": #{ "type": "string" } },
        "one_thing": #{ "type": "array", "items": #{ "type": "string" } },
        "verdict": #{ "type": "string" },
    },
};
let comments_schema = #{
    "type": "object", "required": ["deleted", "reworded", "reshaped", "renamed"],
    "properties": #{
        "deleted": #{ "type": "array", "items": #{ "type": "string" } },
        "reworded": #{ "type": "array", "items": #{ "type": "string" } },
        "reshaped": #{ "type": "array", "items": #{ "type": "string" } },
        "renamed": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
let layout_schema = #{
    "type": "object", "required": ["spacing", "moves", "rejected_moves"],
    "properties": #{
        "spacing": #{ "type": "array", "items": #{ "type": "string" } },
        "moves": #{ "type": "array", "items": #{ "type": "string" } },
        "rejected_moves": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
// The panel shows the label; the full path is too long for it, so it gets the file name only.
fn file_name(path) {
    let cut = path.index_of("/");
    let name = path;
    while cut >= 0 {
        name = name.sub_string(cut + 1, name.len() - cut - 1);
        cut = name.index_of("/");
    }
    name
}

// Paths come from the diff header lines, never from an agent, so the scope is exact.
fn changed_files(diff) {
    let files = [];
    for line in diff.split("\n") {
        if line.starts_with("diff --git a/") {
            let rest = line.sub_string(13, line.len() - 13);
            let sep = rest.index_of(" b/");
            if sep > 0 { files.push(rest.sub_string(0, sep)); }
        }
    }
    files
}

fn is_prose_file(path) {
    if path.ends_with(".lock") { return false; }
    if path.contains("/generated/") || path.contains("/target/") { return false; }
    if path.ends_with(".snap") || path.ends_with(".json") { return false; }
    true
}

fn skip_manifest_for_layout(path) {
    path.ends_with(".toml") || path.ends_with(".yaml") || path.ends_with(".yml") || path.ends_with(".md")
}

// `git_diff_since` takes a commit hash. A ref such as `origin/main` is resolved to the merge base first.
fn is_commit_hash(s) {
    if type_of(s) != "string" { return false; }
    if s.len() < 7 || s.len() > 40 { return false; }
    for c in s.chars() {
        if !("0123456789abcdef".contains(c)) { return false; }
    }
    true
}

let requested = if args == () || args.base == () { "origin/main" } else { args.base };
// `repo` is the checkout to work in. Without it the session's own working directory is the checkout
let repo = if args == () || args.repo == () { "" } else { args.repo };
let in_repo = if repo == "" { "" } else { "cd " + repo + " && " };
let where = if repo == "" { "in the current working directory" } else { "in the directory " + repo };

// `git_diff_since` reads the session's checkout and takes a commit hash. An agent does the git work when either differs
let BASE = requested;
let all_files = [];
if is_commit_hash(requested) && repo == "" {
    all_files = changed_files(git_diff_since(BASE));
} else {
    let resolved = agent(
        "Work " + where + ". Run `" + in_repo + "git merge-base HEAD " + requested + "` and return the full 40-character hash under `hash`. "
        + "If the ref is unknown, run `" + in_repo + "git fetch origin --quiet` once and retry. "
        + "Then run `" + in_repo + "git diff --name-only <hash>` and return every path it prints under `files`, repo-relative, one per array item. "
        + "Do not change any file.",
        #{
            label: "resolve base",
            capability_mode: "execute",
            output_schema: #{
                "type": "object", "required": ["hash", "files"],
                "properties": #{
                    "hash": #{ "type": "string" },
                    "files": #{ "type": "array", "items": #{ "type": "string" } },
                },
            },
        },
    );
    // Rhai's `trim` edits the string in place and returns unit
    let hash = "";
    if resolved.success == true && type_of(resolved.output) == "map" && type_of(resolved.output.hash) == "string" {
        hash = resolved.output.hash;
        hash.trim();
    }
    if !is_commit_hash(hash) {
        pause("infra", "Could not resolve `" + requested + "` " + where + ". Pass `args.base` as a hash and `args.repo` as the checkout path.");
    }
    BASE = hash;
    if type_of(resolved.output.files) == "array" { all_files = resolved.output.files; }
    log("base " + requested + " is " + BASE + " (" + all_files.len().to_string() + " changed files)");
}

let files = [];
for f in all_files { if is_prose_file(f) { files.push(f); } }
if files.len() == 0 { complete(#{ summary: "No changed files with prose to fix against " + BASE + ".", files: [] }); }
log(files.len().to_string() + " files changed against " + BASE);

let cost_rules = "";
cost_rules += "Do not run cargo in any form: no build, no check, no test, no clippy, no fmt. ";
cost_rules += "Do not commit, do not push, do not run just. Other agents share this working tree and a cargo lock; ";
cost_rules += "the edits stay uncommitted for the user to review. Edit only the one file named. ";
cost_rules += "Work " + where + "; every path below is relative to it. ";
cost_rules += "Stay inside the hunks this branch changed, which you see with: " + in_repo + "git diff " + BASE + " -- <file>. ";

phase("Extract or inline");
let ejobs = [];
let efiles = [];
for f in files {
    if skip_manifest_for_layout(f) { continue; }
    efiles.push(f);
    let p = "";
    p += "Apply the gb-extract-or-inline skill to ONE file: " + f + ". ";
    p += "Read the installed skill gb-extract-or-inline first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/) and follow it exactly. ";
    p += "Only functions this branch changed are in scope. Find at most three candidates. For each, apply the extract-when, leave-inline-when, and input-count rules; extract only the ones that pass. Extracting nothing is a valid outcome. ";
    p += "Move code, do not rewrite it; name the function after the rule; put it directly below its caller; change nothing else. ";
    p += cost_rules;
    p += "Report each extraction under extracted as name, parameter count, and the rule, and each candidate you left alone under left_inline with the reason. Empty arrays are valid.";
    ejobs.push(#{
        prompt: p,
        label: "Extract or inline for " + file_name(f),
        capability_mode: "read-write",
        output_schema: extract_schema,
    });
}
let eresults = [];
if ejobs.len() > 0 { eresults = parallel(ejobs); }
let extract_report = [];
let ei = 0;
for r in eresults {
    if r == () || !r.success { extract_report.push(#{ file: efiles[ei], failed: true }); }
    else { extract_report.push(#{ file: efiles[ei], extracted: r.output.extracted, left_inline: r.output.left_inline }); }
    ei += 1;
}

phase("Dead and duplicate");
let djobs = [];
for f in files {
    if skip_manifest_for_layout(f) { continue; }
    let p = "";
    p += "Apply the gb-dead-and-duplicate skill to ONE file: " + f + ". ";
    p += "Read the installed skill gb-dead-and-duplicate first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/) and follow it exactly. ";
    p += "For each of its five goals, work from the diff of this file: orphans from what it removed, twins and pass-throughs from what it added, tests and asserts from the tests it touched. ";
    p += "Every claim of unused carries the search you ran and its count. Only this change's mess counts; dead code that was dead before this branch stays. ";
    p += "Edit only this file, and only to delete an orphan that lives entirely inside it, to call an existing helper instead of a twin, to inline a pass-through whose callers are all in this file, or to delete a redundant test or assert. ";
    p += "A finding that needs an edit in another file goes under cross_file as one line naming the file, the symbol, and the action; do not touch that file. ";
    p += cost_rules;
    p += "Report one line per finding under orphans, twins, pass_throughs, tests, asserts, and cross_file, each with its evidence and the action taken. Empty arrays are valid.";
    djobs.push(#{
        prompt: p,
        label: "Dead and duplicate for " + file_name(f),
        capability_mode: "read-write",
        output_schema: dead_schema,
    });
}
let dresults = [];
if djobs.len() > 0 { dresults = parallel(djobs); }

let dead_report = [];
let cross_file = [];
let di = 0;
let dfiles = [];
for f in files { if !skip_manifest_for_layout(f) { dfiles.push(f); } }
for r in dresults {
    if r == () || !r.success {
        dead_report.push(#{ file: dfiles[di], failed: true });
    } else {
        dead_report.push(#{ file: dfiles[di], orphans: r.output.orphans, twins: r.output.twins, pass_throughs: r.output.pass_throughs, tests: r.output.tests, asserts: r.output.asserts, cross_file: r.output.cross_file });
        for c in r.output.cross_file { cross_file.push(dfiles[di] + ": " + c); }
    }
    di += 1;
}

// Orphans span files; only one agent with every report can delete them without a race
let cross_result = ();
if cross_file.len() > 0 {
    let cp = "";
    cp += "Apply these cross-file findings from a gb-dead-and-duplicate pass. Each line names the file that reported it, the symbol, and the action. ";
    cp += "Read the installed skill gb-dead-and-duplicate first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/). For each finding, run the search the skill asks for yourself, with rg, and apply it only when the search confirms it: ";
    cp += "delete an orphan and its tests and its doc or config entries; move a twin's callers to the existing helper; inline a pass-through at every call site. ";
    cp += "Skip a finding the search does not confirm and say why. Edit only files this branch changed: " + json_encode(files) + ". ";
    cp += cost_rules;
    cp += "Findings: " + json_encode(cross_file) + ". Report each finding under applied or skipped with one line of evidence.";
    cross_result = agent(cp, #{ label: "Cross-file deletions", capability_mode: "read-write", output_schema: cross_file_schema });
}

phase("Comments");
let cjobs = [];
for f in files {
    let p = "";
    p += "Apply the gb-fix-comments skill to ONE file: " + f + ". ";
    p += "Read the installed skill gb-fix-comments first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/) and follow it exactly: ";
    p += "decide deletion first, then words, then shape, for every comment this branch wrote or changed in that file. ";
    p += "A comment includes // and /// and //! and # lines, and any description field a person reads in a manifest. ";
    p += "Never touch a blank line; a deleted comment leaving a double blank line is expected. ";
    p += "The only code change allowed is renaming an identifier this branch introduced that uses a banned word; change every use site in this file and list old -> new under renamed. ";
    p += cost_rules;
    p += "Report one line per comment under deleted, reworded (quote before and after), and reshaped, and one line per rename under renamed. Empty arrays are valid.";
    cjobs.push(#{
        prompt: p,
        label: "Comments for " + file_name(f),
        capability_mode: "read-write",
        output_schema: comments_schema,
    });
}
let cresults = parallel(cjobs);

let comments_report = [];
let i = 0;
for r in cresults {
    if r == () || !r.success {
        comments_report.push(#{ file: files[i], failed: true });
    } else {
        comments_report.push(#{ file: files[i], deleted: r.output.deleted, reworded: r.output.reworded, reshaped: r.output.reshaped, renamed: r.output.renamed });
    }
    i += 1;
}

phase("Layout");
let ljobs = [];
let layout_files = [];
for f in files {
    if skip_manifest_for_layout(f) { continue; }
    layout_files.push(f);
    let p = "";
    p += "Apply the gb-fix-layout skill to ONE file: " + f + ". ";
    p += "Read the installed skill gb-fix-layout first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/) and follow it exactly: ";
    p += "spacing first, placement last, then recheck the spacing around every moved line. ";
    p += "The comments in this file were already fixed by another agent; do not reword or delete comments, only fix the blank lines around them. ";
    p += "Touch blank lines only inside the hunks this branch changed. A function the branch did not change keeps its spacing, however it reads. ";
    p += "A move needs a one-sentence independence argument naming what the moved line touches and what the lines it crossed touch; if you cannot write that sentence from reading, do not move it and list it under rejected_moves. ";
    p += cost_rules;
    p += "Report one line per change under spacing and moves, and every move you rejected with the reason. Empty arrays are valid.";
    ljobs.push(#{
        prompt: p,
        label: "Layout for " + file_name(f),
        capability_mode: "read-write",
        output_schema: layout_schema,
    });
}
let lresults = [];
if ljobs.len() > 0 { lresults = parallel(ljobs); }

let layout_report = [];
let moved_files = [];
i = 0;
for r in lresults {
    if r == () || !r.success {
        layout_report.push(#{ file: layout_files[i], failed: true });
    } else {
        layout_report.push(#{ file: layout_files[i], spacing: r.output.spacing, moves: r.output.moves, rejected_moves: r.output.rejected_moves });
        if r.output.moves.len() > 0 { moved_files.push(layout_files[i]); }
    }
    i += 1;
}

phase("Unification");
let up = "";
up += "Apply the gb-unification-pass skill to this whole branch. Read the installed skill gb-unification-pass first (its SKILL.md is under ~/.grok/plugins/gb-fix-pass/skills/ or ~/.grok/skills/) and follow it exactly. ";
up += "First decide whether this is Agent Host migration work by the skill's section 0; if not, set applies to false, leave the three lists empty, and say so in verdict. ";
up += "Otherwise review the branch diff against " + BASE + " (git diff " + BASE + ") for the three goals: existing types first, PR-sized pieces, one thing per PR. ";
up += "The files are: " + json_encode(files) + ". ";
up += "Read only. Do not edit any file, do not run cargo or tests, do not commit. Use the diff, the proto files, and rg as evidence. ";
up += "Report one line per finding under types (the new type or shape, and the existing one it should use), size (whether this branch is one PR-sized piece, and the split if not), and one_thing (anything that should be its own PR: proto changes, a new component, a rename, a deletion). ";
up += "verdict is one sentence a reviewer can read first: ready as one PR, or what to split out.";
let ur = agent(up, #{ label: "Unification pass", capability_mode: "read-only", output_schema: unification_schema });

let summary = files.len().to_string() + " files; " + moved_files.len().to_string() + " with a reported move; edits left uncommitted";
if ur != () && ur.success {
    if ur.output.applies { summary += "; unification: " + ur.output.verdict; }
    else { summary += "; unification pass skipped, not Agent Host work"; }
}
log(summary);

let report = "# gb-fix-pass against " + BASE + "\n\n";
report += "## Extract or inline\n\n";
for e in extract_report {
    report += "### " + e.file + "\n";
    if e.failed == true { report += "agent failed\n\n"; continue; }
    report += "- extracted: " + json_encode(e.extracted) + "\n";
    report += "- left inline: " + json_encode(e.left_inline) + "\n\n";
}
report += "## Dead and duplicate\n\n";
for d in dead_report {
    report += "### " + d.file + "\n";
    if d.failed == true { report += "agent failed\n\n"; continue; }
    report += "- orphans: " + json_encode(d.orphans) + "\n";
    report += "- twins: " + json_encode(d.twins) + "\n";
    report += "- pass-throughs: " + json_encode(d.pass_throughs) + "\n";
    report += "- tests: " + json_encode(d.tests) + "\n";
    report += "- asserts: " + json_encode(d.asserts) + "\n";
    report += "- cross-file: " + json_encode(d.cross_file) + "\n\n";
}
if cross_result != () && cross_result.success {
    report += "### Cross-file\n- applied: " + json_encode(cross_result.output.applied) + "\n- skipped: " + json_encode(cross_result.output.skipped) + "\n\n";
} else if cross_file.len() > 0 {
    report += "### Cross-file\nagent failed; findings left unapplied: " + json_encode(cross_file) + "\n\n";
}
report += "## Comments\n\n";
for c in comments_report {
    report += "### " + c.file + "\n";
    if c.failed == true { report += "agent failed\n\n"; continue; }
    report += "- deleted: " + json_encode(c.deleted) + "\n";
    report += "- reworded: " + json_encode(c.reworded) + "\n";
    report += "- reshaped: " + json_encode(c.reshaped) + "\n";
    report += "- renamed: " + json_encode(c.renamed) + "\n\n";
}
report += "## Layout\n\n";
for l in layout_report {
    report += "### " + l.file + "\n";
    if l.failed == true { report += "agent failed\n\n"; continue; }
    report += "- spacing: " + json_encode(l.spacing) + "\n";
    report += "- moves: " + json_encode(l.moves) + "\n";
    report += "- rejected moves: " + json_encode(l.rejected_moves) + "\n\n";
}
report += "## Files with a reported move\n\n" + json_encode(moved_files) + "\n\n";
report += "## Unification pass\n\n";
if ur == () || !ur.success {
    report += "agent failed\n";
} else if !ur.output.applies {
    report += "Skipped: " + ur.output.verdict + "\n";
} else {
    report += "**Verdict:** " + ur.output.verdict + "\n\n";
    report += "- existing types: " + json_encode(ur.output.types) + "\n";
    report += "- PR-sized pieces: " + json_encode(ur.output.size) + "\n";
    report += "- one thing per PR: " + json_encode(ur.output.one_thing) + "\n";
}
let path = write_scratch_file("gb-fix-pass.md", report);
complete(#{ summary: summary, path: path, report: report, unification: if ur != () && ur.success { ur.output } else { () }, extract: extract_report, dead: dead_report, comments: comments_report, layout: layout_report });
