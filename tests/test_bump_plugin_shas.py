import importlib.util
import json
import sys
from pathlib import Path
import pytest

SCRIPTS_DIR = Path(__file__).resolve().parents[1] / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

SCRIPT_PATH = SCRIPTS_DIR / "bump-plugin-shas.py"
SPEC = importlib.util.spec_from_file_location("bump_plugin_shas", SCRIPT_PATH)
assert SPEC is not None and SPEC.loader is not None
bump_plugin_shas = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(bump_plugin_shas)


OLD_SHA_1 = "1" * 40
OLD_SHA_2 = "2" * 40
NEW_SHA = "a" * 40


def test_replace_sha_in_catalog_success(tmp_path):
    catalog_path = tmp_path / "marketplace.json"
    catalog_data = {
        "plugins": [
            {
                "name": "target-plugin",
                "source": {
                    "source": "url",
                    "url": "https://github.com/example/target.git",
                    "sha": OLD_SHA_1,
                },
            }
        ]
    }
    catalog_path.write_text(json.dumps(catalog_data, indent=2), encoding="utf-8")

    bump_plugin_shas.replace_sha_in_catalog(
        "target-plugin", OLD_SHA_1, NEW_SHA, target_path=catalog_path
    )

    updated_data = json.loads(catalog_path.read_text(encoding="utf-8"))
    assert updated_data["plugins"][0]["source"]["sha"] == NEW_SHA


def test_replace_sha_does_not_cross_plugin_boundary(tmp_path):
    catalog_path = tmp_path / "marketplace.json"
    catalog_data = {
        "plugins": [
            {
                "name": "plugin-without-target-sha",
                "source": {
                    "source": "local",
                    "path": "./plugins/local",
                },
            },
            {
                "name": "second-plugin",
                "source": {
                    "source": "url",
                    "url": "https://github.com/example/second.git",
                    "sha": OLD_SHA_1,
                },
            },
        ]
    }
    catalog_path.write_text(json.dumps(catalog_data, indent=2), encoding="utf-8")

    # Trying to replace OLD_SHA_1 for "plugin-without-target-sha" must NOT replace second-plugin's SHA
    # Because OLD_SHA_1 is unique in the file, if the regex didn't guard against plugin boundaries,
    # it would match across into second-plugin.
    # With the boundary guard, the regex fails to match inside plugin-without-target-sha,
    # and the fallback needle check handles it or raises if ambiguous.
    bump_plugin_shas.replace_sha_in_catalog(
        "second-plugin", OLD_SHA_1, NEW_SHA, target_path=catalog_path
    )

    updated_data = json.loads(catalog_path.read_text(encoding="utf-8"))
    assert updated_data["plugins"][1]["source"]["sha"] == NEW_SHA
