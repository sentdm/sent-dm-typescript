# Working in this repository

Context for contributors, human or AI, on how this SDK is put together and
the things reviews come back to. Setup instructions live in
[CONTRIBUTING.md](CONTRIBUTING.md), and [REVIEW.md](REVIEW.md) is the rubric a
reviewer applies.

## Overview

The official TypeScript SDK for the Sent API, published as `@sentdm/sentdm` on npm.
Almost all of it is generated from Sent's OpenAPI document by Sent's SDK
pipeline, which runs outside this repository. Releases are cut by
release-please from the commit history on `main`.

### Who owns which files

- **Everything is generated unless this file says otherwise.** There is no
  hand-written directory, and generated files carry no marker comment.
- **Generator-owned, so don't edit them here**: `.stats.yml`,
  `.github/workflows/ci.yml`, the publish, release and sync workflows,
  `scripts/`, and `release-please-config.json`. The next generated commit
  rewrites them, and an edit conflicts.
- **release-please-owned**: `CHANGELOG.md`, `.release-please-manifest.json`
  and the version constant. They are rewritten in each release PR.
- **Hand-written and kept across regenerations**: this file, `REVIEW.md`
  and `.github/CODEOWNERS`.
- **Custom code in this repository today**: the `@arethetypeswrong/cli` version bump and the formatted lockfile, both carried because the pinned template crashed on current Node.

### Editing generated files

- **Check whether a line is generated before you change it.** Every commit
  the generator produced carries a `Stainless-Generated-From: <sha>` trailer,
  and a hand-written commit has none. Find the latest one with
  `git log -1 --grep='Stainless-Generated-From' --format='%(trailers:key=Stainless-Generated-From,valueonly)'`,
  fetch it with `git fetch origin <sha>`, then diff the file against it. Lines
  that appear only on your side are custom code.
- **Custom code is the exception, and it stays small.** A commit to a
  generated file is carried forward as a patch on every regeneration. Adding
  lines applies cleanly. Changing lines the generator writes conflicts the
  next time the API document changes, and a conflict blocks every SDK's
  release, not only this one.
- **Fix generator-owned behaviour at the source.** A wrong type, a wrong
  name or a missing field is a change to the API document or to the SDK
  configuration, neither of which is in this repository. Open an issue here
  that describes the wrong output and the request or response it came from.
- **No provenance comments.** Don't add a comment that marks code as
  hand-written or names the generator, and remove one from a block you are
  already editing.

### Branches

- PRs target `main`.
- Branches named `release-please--branches--main…` belong to release-please.
  Don't push to them or merge into them. Merging the release PR publishes.
- Generated commits reach `main` from the SDK pipeline. Don't rebase, squash
  or amend them, the trailer is how custom code is told apart.

## Build, test, lint

The entry points are `./scripts/bootstrap`, `./scripts/build`, `./scripts/lint`, `./scripts/test` and `./scripts/format`. Use them rather than calling the toolchain
directly, they pin the versions CI uses. `./scripts/test` starts a mock
server from the API document, so nothing in a default run calls
`api.sent.dm`.

## Breaking changes

- **Anything a user can import or call without a private marker is public,**
  documented or not. New names start private and are made public on purpose.
- **Runtime behaviour is the contract.** A change only a type checker notices
  isn't breaking. A change in what the code does at runtime is, even when
  every signature stays the same.
- **Keep old code working.** A rename or a removal keeps an alias. A
  behaviour change users could depend on waits for a deprecation cycle or
  the next major version.
- **A major version is a maintainer's call.** Describe the compatibility
  impact in the PR instead of deciding it in the commit type.
- **A fix to one twin goes to the other**: the sync and async method pairs, and the stable and beta resources.

## Commits and pull requests

- **Conventional Commits with a scope drive release-please**: `feat(api):`,
  `fix(client):`, `chore(repo):`. The subject becomes the changelog line
  customers read, so write it for them: what changed, and what to do about
  it. Never an internal cause.
- **`ci:` and `test:` are hidden from the changelog.** `chore:`, `docs:`,
  `feat:` and `fix:` are not, and any of them cuts a release when promoted.
- **Don't commit generator-owned files from a feature branch.** They
  conflict with the next generated commit.
- **One logical change per PR.** Port a behaviour change to the other Sent
  SDKs and link the sibling PRs.
- **The description says** what was wrong, with a before-and-after example,
  what changed, and how you know it works. Call out behaviour changes and
  wire-level changes.
- **This repository is public.** Nothing in it, including PR text,
  `CHANGELOG.md` and release notes, links to or names Sent's private
  repositories, internal systems or providers. Write for the customer who
  installs the package.
