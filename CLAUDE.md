# xai-plugin-marketplace

## Pull request workflow

Every change, however small, goes through these five steps in order:

1. **Create the PR as a draft.** Push the branch and run `gh pr create --draft` as soon as the first
   commit exists. Never open a PR straight into review.
2. **Test.** Run this repo's checks and exercise the change for real (tests, a local run, a preview
   deploy). Write what you ran and what it showed into the PR description.
3. **Make changes.** Fix what testing turned up, push to the same draft, and test again.
4. **Self-review.** Read the whole diff as a reviewer would (`gh pr diff <number>`): correctness,
   anything outside the PR's scope, leftover debug code, secrets, and the rules in this file. Fix what
   you find before moving on.
5. **Mark it ready for review** with `gh pr ready <number>`, and only after steps 2–4 pass. Say in the
   description anything that is still unverified.

If review asks for a rework rather than a small fix, return the PR to draft
(`gh pr ready --undo <number>`) and repeat steps 2–5.
