# Review instructions

Apply these to every pull request. A commit that carries a
`Stainless-Generated-From` trailer is a change to the API document, so review
the public surface it changes and its commit subject, not the generated lines.

## Report these as Important, as well as functional bugs

- A violation of this repository's `CLAUDE.md`. Quote the rule.
- A new public name, parameter or option that the PR description does not
  list.
- A hand edit to a line the generator writes. It conflicts on the next
  regeneration. Point at the fix in the API document or the SDK
  configuration instead.
- A change to a generator-owned file (`.stats.yml`, `ci.yml`, the publish,
  release and sync workflows, `scripts/`, `release-please-config.json`)
  outside a generated commit.
- A behaviour change with no test that fails before it and passes after.
- A fix made to one copy of logic that exists more than once: sync and
  async, stable and beta, a method and its twin.
- A commit subject that would read wrong in the changelog: an internal
  cause, a link customers can't open, or a type that cuts a release for a
  change customers don't see.
- A link to, or the name of, a private Sent repository, an internal system
  or a provider, anywhere in the diff.
- A comment that restates the code, names the generator, or marks code as
  hand-written.

## Don't report these

- The style of generated code. The generator decides it.
- A missing runtime check of an API response, or missing client-side
  validation that the API already does.
- Formatting that `./scripts/format` would fix.
