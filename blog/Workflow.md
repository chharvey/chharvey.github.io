# Semantic Versioning

This section describes my modifications to
[Tom Preston-Werner's <cite>Sematnic Versioning</cite>](http://semver.org/).

In any software (and/or Web) development environment involving staged releases, it's best to use
Semantic Versioning. This is a versioning model in which every version number has a meaningful
indication to users and developers. Without getting into too much detail, I will summarize below.

- The version number of an application (or website, henceforth referred to as "an app") is written
as so: v<var>X</var>.<var>Y</var>.<var>Z</var>, where *v* stands for "version",
<var>X</var> is the major version,
<var>Y</var> is the minor version, and
<var>Z</var> is the patch.
- Every time a Major Version is released, <var>X</var> is incremented, and <var>Y</var> and <var>Z</var> reset to 0.
Every time a Minor Version is released, <var>X</var> remains the same, <var>Y</var> is incremented, and <var>Z</var> resets to 0.
Every time a Patch is released, <var>X</var> and <var>Y</var> remain the same, and <var>Z</var> is incremented.
- The place value of the integer does not carry over. For example, the next Patch for *v1.4.9*
would be *v1.4.10*, not *v1.5.0*.

## Major Versions

incorporate new features that change the application or API in a non-backward-compatible way.
This means that the implementation of Major features would require a change in previous functionality.
In the world of front-end web development, since there isn't really an API, I would consider the
following as "Major" revisions:
- Any semantic changes to content (the meaning of the content changes) to a lot of documents or
large portion of the site.
- Any revamps of any systems, such as CSS architecture, grid layouts, etc., *that would necessitate
a change in HTML or content*. This last part is important. If a system revamped but was handled automatically (e.g. the classnames stayed the same; only their definitions changed), this would not be a Major revision.
- Any *major* changes to look-and-feel. Though this would be considered an "unsemantic" revision,
a major change to a site's appearance constitutes a new Major version number. The reasoning behind
this is mostly psychological and helps users in some way probably.

## Minor Versions

incorporate new features that change the app in a backward-compatible way. This means that the
implementation of Minor features would not require any change in previous functionality.
- Anything added to the site that does not require changing a previously-defined aspect of the site.
- These are where most "bells and whistles" would be categorized.
- Also, any cleaning up or organizing code or source files (e.g, to improve efficiency/performance) would be considered a Minor feature, even though this does not add new functionality.

## Patches

incorporate bug fixes only. These are fixes to errors, either compile-time (syntactic), run-time,
or semantic, and must be backward-compatible. Do not release any new features in a Patch. Typically, a bugfix only *adds* code to fix a problem; rarely does it require deletion of code. Think of it as the *quickest* way to fix something. Do not concentrate on efficiency/performance unless the time it takes to do so is marginal.
- Typo corrections
- Changes in formatting code (indents, newlines, etc.)
- Minor changes to CSS styles / HTML Elements

# Branching Model

This section describes my modifications to
[Vincent Driessen's <cite>Successful Git Branching Model</cite>](http://nvie.com/posts/a-successful-git-branching-model/).

There are five types of branches: `master`, `develop`, feature branches, hotfix branches, and release branches.

## `master`

The `master` branch is where the most up-to-date *released* version of the app lives. Users have
read access to `master` and should be able to download any version, including old versions. Every
commit on `master` corresponds to a stable release with a unique version number. The most recent
commit on `master` corresponds to the most recent released version.
Every time a new commit is made on `master` and a new version is released,
`master` merges into `develop` and also into any active [release branches](#release) to keep them
up to date with the most recent released changes.
`master` is never deleted.

Note: Every commit on `master` should have the *possibility* of being fast-forwarded. Fast-forwarding
is generally a bad idea for `master` in particular: if we want commits to correspond to releases and
fast-forwarding is enabled, then a fast-forward to master will introduce more commits on the
`master` branch than necessary. Thus it is advisable to use

    $ git config branch.master.mergeoptions = --no-ff

However, we want the *possibility of fast-forwarding every commit*,
so there are no merge conflicts when we commit to `master`. Since `master` represents the most
stable release, we don't want any unexpected surprises when merging.
Thus every time a commit is made on `master`, `master` should be merged into any active release branch
so that final touches can be made before the next release.

## `develop`

The `develop` branch represents the most up-to-date *unreleased* version of the app. All the
completed fixes and features are committed to `develop`. There should be no works in progress:
only the finished product of the fix/feature is committed. `develop` lives in parallel to `master`.
At some point in time, the code on `develop` will eventually make its way onto `master` via a
[release branch](#release).
`develop` is never deleted.

It is advised to have a separate develop branch corresponding to the next *major* version.
This way, the minor features can still be committed to `develop` but the features for the next major version,
say v4.0.0, can be committed to branch `dev-v4` without interfering with the minor releases.
`master` should be merged into `dev-v4` to keep it up to date with the latest released changes, and
`develop` should be frequently merged into `dev-v4` to keep it up to date with the latest unreleased changes.
`dev-v4` is merged back into `develop` when the major features of v4.0.0 are stable, typically when
its corresponding GitHub Milestone is closed.

## Feature

A feature branch begins with the prefix `feat-` and usually contains an issue number (if there is
an issue on GitHub) and then some short descriptor. Example: `feat-17footnotes`.

Feature branches are for works in progress of major or minor features for the next major or minor
version. They are not for bug fixes or patches.

A feature branch is branched off of `develop`, work is then done on the feature branch, and once
the work and testing of the new feature is complete, the branch is merged back into `develop`,
at which point the feature branch is deleted.

## Hotfix

The hotfix branches begin with prefix `fix-` and usually contain an issue number (if there is an
issue on GitHub) and then some short descriptor. Example: `fix-13sprites`.

Hotfix branches are analogous to [feature branches](#feature) for `develop`, except hotfix branches
are used for fixing small bugs and errors instead of introducing new features.
A branch called `hotfix` is branched off of `master` every time a new version of any kind
is released. Essentially, `hotfix` lives in parallel to `master` but corresponds only to a
particular version number.

All hotfix branches branch off of `hotfix`, and when work is complete for that fix,
the branch merges back into `hotfix` and is then deleted. Thus the branch `hotfix` actually
contains multiple fixes. At some point in time, `hotfix` is merged back into `master` **creating
a new Patch Version release**, and then `hotfix` is deleted.
And of course, every new release on `master` is merged into `develop` and any active
[release branches](#release) as well.

## Release

Lastly, the release branches begin with `rel-` and end with a version number. Example: `rel-v3.2.0`.

The release branches are a bit of a mix between feature and hotfix branches. At some
stage in development when a release (say v3.2.0) has been determined (this usually happens when
a Milestone is closed), a release branch `rel-v3.2.0` branches off of `develop`. From this point on,
no further feature branches are to be merged into `rel-v3.2.0` and no new features are to be added.
Only small fixes for v3.2.0 are to be made on this branch.
That way, `develop` can continue progressing while the features for v3.2.0 are "locked."

When v3.2.0 is ready to be released, `rel-v3.2.0` is merged into `master`,
**creating a new Minor (or Major) release**, and then `rel-v3.2.0` is deleted.
And of course, every new release on `master` is merged into `develop` and any other active
release branches as well. (Usually there won't be any other release branches, but there could be
an active release branch for the next major release, `rel-v4.0.0`. In this case, the changes on
`master` need to be merged in.)

# Example Workflow

## Single Issue Examples

Required Labels for GitHub issues. These are mutually-exclusive (an issue must have exactly one of these).

- `feature-hotfix`: A request to fix a bug (not really a feature).
- `feature-minor` : A request to add a minor feature.
- `feature-major` : A request to add a major feature.

Optional Labels. Mutually-exclusive labels are grouped in brackets.

[`priority-high` | `priority-medium` | `priority-low` | `priority-wontfix`] || [`layer-HTML` | `layer-CSS` | `layer-JS`] || `question` || `duplicate`

Issues are also assigned to GitHub Milestones. Milestones are named after expected future release version numbers.

Good developers will address the bugs first, then the minor issues, then the major issues.
This is the typical priority order. Of course, work can be done on all three at the same time but
it's best to finalize the bugfixes first.

### Single Bug Example

Let's say you're working on a project and you're at some point in time at which the project is 100% stable:
there are no bugs, and no new features to be added. You have two branches, `master` and `develop`,
which live parallel alongside each other.

A developer or user notices a bug in the current version (latest release on `master`).
This could be a syntactic error, run-time error, or semantic error. They submit a new GitHub Issue,
say *#5: background image missing*. This issue would be given the label `feature-hotfix` and
assigned to a GitHub Milestone with a patch version number.
Then a developer creates the branch a new branch `fix-5bgimg` off of `hotfix` (which is already
branched off `master`).
Developers do work on this branch, and when it is fixed, close the issue or submit a pull request.
When the project manager sees the closed issue/pull request, `fix-5bgimg` is merged back into
`hotfix` and then `fix-5bgimg` is deleted.

### Minor Feature Example

Same situation as before, stable project.

Then either a developer or user requests a new minor feature, say a new color scheme, and submits a new
GitHub Issue called *#13: new color scheme*.
Because a new color scheme is a new feature that wouldn't require any changing of previous functionality,
it will be given the label `feature-minor`. It would also be assigned to a GitHub Milestone with a minor version number.
A developer creates a new branch called `feat-13colorscheme` off `develop`.
Developers do work on the branch, and when they decide it is complete, they close the GitHub Issue
or submit a pull request. The branch is not merged until the project manager sees the
closed issue/pull request and decides to merge it back into `develop`. When `feat-13colorscheme`
is merged back into `develop`, the feature branch is deleted.

### Major Feature Example

Major features are difficult because they are long-term features and typically take more time to
complete than minor features do. In addition, major features aren't as frequently released, and
they aren't typically released one at a time. It is usually the case that a bunch of major features
are released all together, so that the number of non-backward-compatible changes is minimized.
Thus it takes careful consideration of how and when to release major versions of an app.
This section describes a model example of a major feature.

Same situation as before, stable project.

A developer or user requests a new major feature and submits a new GitHub Issue. The Issue would be
assigned to a Milestone with a major version number.

A major feature branch is very similar to a minor feature branch. It would be branched off `develop`,
and when complete, the GitHub Issue would be closed. However since major features are more slowly
released than minor features, it wouldn't make sense to merge this feature into `develop`:
if so, the latest unreleased version of the project would contain a bunch of minor features and perhaps
one major feature. In this case, the next released version would have to be a major release, even if
there is only one major feature introduced.

If we want our next scheduled release to be a minor release, we don't want any major features
introduced into the `develop` branch, even if the major feature is complete.
Instead, we should branch a **development branch** `dev-v4` off
of `develop` and merge the major feature branch into the new development branch.

## Release Examples

### Patch Release Example

Same situation as before, stable project. Say the project's latest release is v3.2.1.

Patches are released only when bugs on `master` have been fixed via the `hotfix` branch.
At some point in time, *Milestone v3.2.2* will be closed. This happens when all
the Issues in the Milestone are closed. At this point, if all the fixes and bugs have been worked out,
`hotfix` is merged into `master`, creating v3.2.2.
Then `master` is merged into `develop` (and any existing release branches).

### Minor Release Example

Same situation as before, stable project. Say the project's latest release is v3.2.1.

When a minor feature Issue is closed, that feature branch is most likely merged into `develop` and
*Milestone v3.3.0* is closer to being complete. When all the Issues for the
Milestone are closed, the Milestone itself is closed. At this point, `rel-v3.3.0` is branched
off `develop` and only fixes and bugs for v3.3.0 may be committed to `rel-v3.3.0`.
Any new features will be committed to a development branch.

The time at which Version 3.3.0 is released is probably dependent on a deadline. Beforehand,
any changes to `master` (namely, hotfixes) should be merged into `develop` and `rel-v3.3.0`
as previously mentioned.

When Version 3.3.0 is ready to be released, `rel-v3.3.0` is merged into `master` and then
`master` is merged into `develop` (and any other existing release branches).

### Major Release Example

Same situation as before, stable project. Say the project's latest release is v3.2.1.

When a major feature Issue is closed, that feature branch is most likely merged into the next
major development branch, e.g., `dev-v4`. When all the issues for *Milestone v4.0.0* are closed,
the Milestone itself is closed.

At this point, regardless of whether there are any active hotfix or release branches,
`dev-v4` is merged into `develop`, `dev-v4` is deleted, and a new branch `rel-v4.0.0` is branched
off of `develop`. (Remember, the development branch `dev-v4` is where major work can be done and features can be added. In contrast, the release branch `rel-v4.0.0` is only for bugfixes. Once `rel-v4.0.0` is branched off `develop`, work can be done on `develop` for the next Minor release, namely, v4.1.0.)

The work on any existing hotfix branches and release branches continues as normal, merging into
`master` when appropriate. Then any changes to `master` are merged into `develop` and `rel-v4.0.0`
as previously mentioned.

When Version 4.0.0 is ready to be released, which is probably due to a deadline, `rel-v4.0.0` is
merged into `master` and then `master` is merged into `develop` (and any other existing release branches).
