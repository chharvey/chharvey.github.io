# TO DO #

Specs for all TODO lists:

- [ ] 2014-03-30 every list must go under a heading and every heading must be followed by exactly
	one list, unless that heading is followed by subheading(s) that are followed by list(s).
- [ ] 2014-03-06 every list item must begin with a hyphen, `-`, the character that denotes an
	`<li>` in Markdown. Then follow this with the string ` [ ] `, which denotes an empty checkbox.
	Follow this with the date in the format `YYYY-MM-DD`, which is the date the item is added.
	(Starting on 2013-12-14. list items before that date will not have dates added. See Git repo
	history for more info.)
- [ ] 2014-03-06 add list items to the bottom of each list, so that the list stays in chronological
	order (starting as of today).
- [x] 2014-03-06 when list items are complete, *do not* delete the list item or wrap it with the
	`<del>` tag. Instead, replace the space in the checkbox with a lower-case `x` to indicate the
	item has been completed. (Starting as of today; see Git repo history for items deleted before today.)

## Site-wide TODO list ##

### Semantics ###
- [x] 2013-08-24 `img alt` attributes should be semantic
- [x] 2013-08-24 all self-closing tags should end in `/>`, not ` />`. (remove the space before
	the slash)
- [x] 2014-03-06 change all apostrophes (`'`) to right single quotes `&rsquo;` on the following
	pages... (Leave the apostrophes alone in regular pages. The typographical precision is not
	worth the effort.)
	- 'portal' pages (`/home/edu.html`, `/home/math.html`, etc.)
	- **formal** documents such as articles or blog posts (maybe in `/blog/`?)
- [ ] 2014-06-26 consistent time stamps and document/post metadata
- [ ] 2014-06-26 use `i[lang]>abbr` for all instances of "etc", "i.e." and "e.g." on **formal** pages
- [ ] 2014-06-26 add `geo` custom-elements to locations in `resume.html`

#### links ####
- [ ] 2014-03-27 `<a>` links should contain more textual content for SEO. the `title` attribute may
	contain a description of the linked document.
- [x] 2014-04-04, 2014-06-07 REMINDER: given an element, when deciding to add a link to that element, always
	put the link *inside* the other element. E.g. always do `code > a` or `dfn > a`, not `a > code`
	or `a > dfn`.

#### highlights ####
- [x] 2013-12-14 see which `b.ref`s you can change to `cite`s (titles of works) and `a`s (links to
	documents, sections, etc.)
- [x] 2014-03-02 see which `<b>` tags you can remove; which ones do you *really* need?

#### metadata and micro-semantics (very low priority) ####
- [ ] 2014-03-03 `rel` attributes on `link` and `a` elements, see
	[http://dev.w3.org/html5/spec/links.html#linkTypes](http://dev.w3.org/html5/spec/links.html#linkTypes)
	- `next`: current doc is part of a series, and that the `a`, for example in breadcrumbs,
		links to the next document in the series. May be used with `sibling`
	- `prev`: current doc is part of a series, and that the `a`, for example in breadcrumbs,
		links to the previous document in the series. May be used with `sibling`
	- `top`: links to the "logical top level" document. implies `ancestor`
	- `parent`: links to the "logical parent" of this page
	- `ancestor`: links to the "logical parent" of this page, or the "logical parent" of
		an `ancestor` of this page (recursively defined)
	- `child`: links to a "logical child" of this page
	- `descendent`: links to a "logical child" of this page, or a "logical child" of
		a `descendent` of this page (recursively defined)
	- `sibling`: links to a page that has the same "logical parent" as this page
	- `external`: the linked page is not part of the same site
- [x] 2013-03-03 choose between:
	- ~~microformats (special `class`es)~~
	- microdata (`itemscope` and `itemprop`, via [schema.org]())
- [ ] 2013-03-03 ARIA roles

### Styles ###
- [x] 2014-04-04 in `mods.less` eventually find a way to abstract the `.message` blocks
- [ ] 2014-04-08 change all `[data-e=""]` selectors to `[data-e~=""]`
- [x] 2014-04-08 add `[data-status~="normative"]`, `[data-status~="nonnormative"]`,
	`[data-status~="draft"]`, etc to stylesheets, get rid of class `.draft`, `.nonnormative`, etc.
- [x] 2014-06-07 write comment documentation for selectors in `/core/styles/typo/_text.less`
- [ ] 2014-07-07 change font (headings, body, prose, etc.) scheme ? (optional)
- [ ] 2014-07-07 find a way to do `.vru-top-0` and `.vru-top-1` cleanly
- [x] 2014-07-08 remove units from `0px` and `0rem` on `.H.Epsilon` and `.H.Zeta` in `_headings.less`
- [x] 2014-07-08 change up the `.fontsize-` Interfaces so that `-inline` is default and
	`-block` overrides
- [ ] 2014-07-08 break down `/core/styles/_interfaces.less` and move into `/core/styles/tools/`

#### boxes ####
- [x] 2013-08-18 code scheme
- [ ] 2014-02-16 do labels/tooltips/whatever hint: [http://kushagragour.in/lab/hint/](http://kushagragour.in/lab/hint/)
- [x] 2014-03-01 use `<small>` for labels&mdash;they really are disclamers/caveats/etc.
- [x] 2014-06-19 split messages (`.Msg`) from tags (`.Tag`)
- [x] 2014-06-23 background gradients for buttons and labels
- [ ] 2014-07-08 remove `margin-bottom:` from `.Button` Objects because margin doesn't go
	with `display: inline`

### scripts ###
- [ ] 2013-12-14 investigate the use of templates (`<template>`)
- [ ] 2014-03-01 use JS to change the line-height of blockquotes to 1.5 times the usual amount
	(currently (2014-03-01), from 1.2 to 1.8), and then adjust margin-bottom to keep vertical rhythm.

## Home Pages TODO list ##

### Index ###
- [x] 2013-08-18 make popping text on index page fade in and out easier
- [ ] 2014-06-18 add golden spiral background images (SVG) to squares

### About ###
- [x] 2014-06-17 compile bio, contact, and links pages into one 'about' page.
- [x] 2014-06-19 move "My Blogs" and "Copyright" sections, add acknowledgements section (high priority)
- [x] 2014-06-19 get picture with Axel (medium priority)
- [ ] 2014-06-19 contact images into sprites (low priority)
- [x] 2014-06-22 "Acknowledgements" section: add more detail, give credit to everyone
- [x] 2014-06-22 Find a page for "Copyright" section
- [x] 2014-07-06 add `<address>`` element to about page around contact links

### Resume ###
- [x] 2014-03-26 remove `!important` from `.res-spacetime {font-size}` and `.res-spacetime {color}`
	and somehow fix quasi-element `span.hsub`.
- [x] 2014-03-26 add web-dev exp
- [ ] 2014-04-07 find a way to use JS to add `.res-footer`s (pagecount, etc.)
- [x] 2014-04-08 fix `list-style-type: none;` in definition of `.res-tech-apps {}`

### Folio ###

#### math.html ####
- [ ] 2014-06-18 find course number for student teaching and add `id` to last section
- [ ] 2014-06-18 add content to student teaching section (PHHS Algebra II)

## Site Design TODO list ##

### General ###
This is all gonna go in a spec somewhere...
- [ ] 2014-03-30 instead of using classes (`span.hsub`, etc.) for QUASI-ELEMENTS, use the `data-*`
	attribute. For example, `<span data-qe="subh">`. Then style these with `[data-qe="subh"]`. The
	selector is equally as specific as `.subh` but may be less efficient; though this is a minor
	cost to pay for semantic benefit.
- [ ] 2014-04-01 separate pure-style classes (e.g. `.list-basic`, `.dl-table-sml`, `.table-list`,
	etc.) from semantic classes (e.g. `.dl-ordered`, `.hsub`, `.postal`, etc.). Maybe use the HTML
	`data-*` attribute?
- [ ] 2014-06-08 **REMINDER**: CSS Objects should be *named* semantically, for the
	"theoretical redesign future", but should not *convey* semantics, i.e. provide any semantic
	meaning. To "extend" an Element semantically, use HTML like `data-*`, or microdata
	(`itemscope` and `itemprop`), or ARIA roles. CSS Interfaces, on the other hand, are permitted
	to be named "unsemantically", i.e. their names may describe their definitions. This is because
	Interface names are visible in CSS, so Objects can implement them, but they're not visible in
	HTML, so Elements cannot. Elements can only instantiate CSS Classes ("Objects").

### phi.html ###
- [ ] FIX IT. the whole thing.

### grid.html ###
- [x] 2014-01-21 finish last section (Phi demonstration)
- [ ] 2014-03-05 add Gutter section below all Grid stuff
- [x] 2014-04-22 rewrite all table-cell functionality
- [x] 2014-04-22 update content with styles
- [x] 2014-04-22 use SVG for background grid images

### typo.html ###
- [x] 2013-08-18 inline elements: highlighting
- [ ] 2014-07-08 add schemes for `.Dir` and `.Key` Objects
- [ ] 2014-07-08 remove 'TAVX' table

### colors.html ###
- [x] 2014-06-07 fix new color palettes
