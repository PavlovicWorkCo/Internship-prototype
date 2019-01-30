```# Contributing to the project

## Guidelines

### Commit messages

The project follows basic guidelines for commit message writing that are based off [Conventional Commits](https://conventionalcommits.org/).

The basic structure of a commit message should be:```

<type>[optional scope]: <description>

[optional body]

[optional footer]

```Where `type` can be one of several options:

- `fix`: a bug fix
- `feat`: introducing a new feature
- `ci`: changes related to the CI
- `chore`: chores related to codebase health: linting updates, removal of dead code, etc
- `docs`: anything related to documentation
- `perf`: performance updates
- `refactor`: refactors around the codebase
- `revert`: reverting previous commits
- `style`: changes to styles of existing components
- `test`: anything related to tests

Types can also be scoped to a context, as in:```

feat(parser): add ability to parse arrays

```In general, it makes sense to use component or screen names as scopes. For example:```

feat(profile): recover data from previous entry

```However, the list of possible scopes should be considered flexible; new scope labels can be used when it makes sense. Some context, afterall, is better than no context.

Other examples:```

feat(languages): add spanish language
```

```
docs: update README links
```

```
perf: convert all demifunctors to endoprotos

Demifunctors use too much memory. Instead, we now use endoprotos to power our carygotes, since they have demonstrably lower memory requirements.

Fixes issue #14

```The description of the commit message should utilize the imperative mood as if you are giving orders to the codebase to change
its behavior. For example:```

Make xyzzy do frotz

```Try to stay away from doing the following:```

[This patch] makes xyzzy do frotz
[I] changed xyzzy to do frotz

```### Branch Naming

The structure of branch naming is as follows:```

<type>/<scope>

```Types can be found above in the commits section. Scopes can be flexible but should still contextualize the work at hand. For example:```

feat/recover-profile-data
chore/update-readme
fix/server-crashing
```

### Pull requests

While no strict guidelines for pull requests are enforced, we should all strive to make PRs as informative as possible.

- Give if a good title (don't just reuse the commit title and body)
- If related, add a reference to the Jira ticket at the end of the PR title (e.g.: "Fixing thingamabobs [COMA-10]")
- State the purpose of the PR (the "what")
- Optionally, include the reasons why this work is taking place (the "why")
- Be explicit about which of the monorepo packages your change applies to by adding the correct label: `cava-grill-shared`, `cava-mobile`, `cava-web`, or `general`
- If necessary, be specific about which kind of feedback you want: code, technical approach, naming, etc
- Also if necessary, be explicit about when to contribute feedback; if the PR is a WIP (work-in-progress), it should state so
- Mention team members by @name when you want them included in the discussion
- Make it as small as possible. A pull request should have a single topic; if necessary, break it down and create a different PR

Basic rules of civility apply when giving, and discussing, PR feedback.

- Talk about the code, not the person
- Discussions have an objective goal
- Be clear on what is an opinion or a question and what is a required change
- Remember the intention is always to move a project forward, not to block a change
- Ask for clarification where needed
- Emojis are fine :+1:
When a PR is approved and ready to be merged, it should either be squashed and merged (giving it a name and description that follows the commit guidelines) or rebased as-is to maintain the commit history. In the latter case, make sure the history is clean and doesn't include "feedback" commits; git history can be rewritten with [interactive rebases](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).
```
