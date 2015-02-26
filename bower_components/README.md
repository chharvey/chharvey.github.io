
# `./bower_components/`

**Memo to Developers**

This directory, `./bower_components/`, is checked in with git.
Thus any packages installed here (via `bower install <package>`), and any changes to such packages, are tracked by git.

Packages tracked by git should be *mentioned*, that is, referenced by this project.
That way when the project is deployed, the package it *mentions* is deployed along with it.

Packages not referenced but rather *used* by this project should not be installed here.
They can be installed into a directory that is ignored by git (see `../.gitignore`),
such as `../node_modules/`.
Packages *used* by this project should neither be deployed nor checked in with git.
