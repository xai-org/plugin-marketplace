import importlib.util
import json
from pathlib import Path
import pytest

SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "validate-catalog.py"
SPEC = importlib.util.spec_from_file_location("validate_catalog", SCRIPT_PATH)
assert SPEC is not None and SPEC.loader is not None
validate_catalog = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validate_catalog)


VALID_SHA = "0" * 40


def test_valid_url_source(tmp_path):
    seen = set()
    entry = {
        "name": "my-plugin",
        "source": {
            "source": "url",
            "url": "https://github.com/example/plugin.git",
            "sha": VALID_SHA,
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert errors == []
    assert "my-plugin" in seen


def test_type_url_source(tmp_path):
    seen = set()
    entry = {
        "name": "type-url-plugin",
        "source": {
            "type": "url",
            "url": "https://github.com/example/type-plugin.git",
            "sha": VALID_SHA,
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert errors == []


def test_missing_sha_on_type_url(tmp_path):
    seen = set()
    entry = {
        "name": "no-sha-plugin",
        "source": {
            "type": "url",
            "url": "https://github.com/example/type-plugin.git",
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert any("missing `sha` field" in e for e in errors)


def test_invalid_sha_format(tmp_path):
    seen = set()
    entry = {
        "name": "bad-sha",
        "source": {
            "source": "url",
            "url": "https://github.com/example/plugin.git",
            "sha": "not-a-valid-sha",
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert any("not a 40-character lowercase hex string" in e for e in errors)


def test_invalid_url_protocol(tmp_path):
    seen = set()
    entry = {
        "name": "insecure-plugin",
        "source": {
            "source": "url",
            "url": "http://github.com/example/plugin.git",
            "sha": VALID_SHA,
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert any("must start with 'https://'" in e for e in errors)


def test_duplicate_plugin_name(tmp_path):
    seen = {"duplicate-name"}
    entry = {
        "name": "duplicate-name",
        "source": {
            "source": "url",
            "url": "https://github.com/example/plugin.git",
            "sha": VALID_SHA,
        },
    }
    errors = validate_catalog.validate_entry(entry, 1, seen, tmp_path)
    assert any("duplicate plugin name" in e for e in errors)


def test_invalid_name_casing(tmp_path):
    seen = set()
    entry = {
        "name": "Invalid_Plugin_Name",
        "source": {
            "source": "url",
            "url": "https://github.com/example/plugin.git",
            "sha": VALID_SHA,
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert any("must be in lowercase kebab-case" in e for e in errors)


def test_valid_local_dict_source(tmp_path):
    plugin_dir = tmp_path / "plugins" / "local-plugin"
    plugin_dir.mkdir(parents=True)
    seen = set()
    entry = {
        "name": "local-plugin",
        "source": {
            "type": "local",
            "path": "./plugins/local-plugin",
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert errors == []


def test_local_source_escapes_repo(tmp_path):
    seen = set()
    entry = {
        "name": "escaping-plugin",
        "source": {
            "type": "local",
            "path": "../../../outside",
        },
    }
    errors = validate_catalog.validate_entry(entry, 0, seen, tmp_path)
    assert any("escapes repo root" in e for e in errors)


def test_validate_file_end_to_end(tmp_path):
    catalog_path = tmp_path / "marketplace.json"
    catalog_data = {
        "name": "test-marketplace",
        "plugins": [
            {
                "name": "plugin-one",
                "source": {
                    "source": "url",
                    "url": "https://github.com/a/b.git",
                    "sha": VALID_SHA,
                },
            },
            {
                "name": "plugin-one",  # Duplicate name
                "source": {
                    "source": "url",
                    "url": "https://github.com/a/b.git",
                    "sha": VALID_SHA,
                },
            },
        ],
    }
    catalog_path.write_text(json.dumps(catalog_data), encoding="utf-8")
    errors = validate_catalog.validate_file(catalog_path, repo_root=tmp_path)
    assert any("duplicate plugin name" in e for e in errors)
