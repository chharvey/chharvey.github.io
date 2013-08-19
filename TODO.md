TO DO
========

## Site-wide to-do list ##
### semantics ###
- `img alt` attributes should be semantic
- don't rely on `title` attributes for any element (mobile browsers)
- `rel` attributes on `link` and `a` elements, see [http://dev.w3.org/html5/spec/links.html#linkTypes](http://dev.w3.org/html5/spec/links.html#linkTypes)
- breadcrumbs! three choices:
- - "owns": `&ni;` or `\220b`
- - "superset": `&supe;` or `2287`
- - "slash":/ or "bar": |
- Add any boolean `hidden` attribute to all elements not ready for publishing
- Change all possessive and contraction apostrophe characters `&apos;` to right single quotes `&rsquo;`

### styles ###
- Change all 'includes' to 'extends' with the new less.js v1.4
- FIND A FUCKING LESS COMPILER!

### scripts ###
- get rid of all Server-Side Includes. There has GOT to be a way to repeat dynamic HTML snippets using JavaScript! Maybe **Liquid** or **Jekyll**?


## specific projects ##
### /index.html ###
- make popping text on index page fade in and out easier

### /site-design/typo.html ###
- inline elements: highlighting
- quotation-scheme examples
- code scheme

### /home/folio/ pages ###
- class drop-downs shouldn't be summary elements, just because the behavior is something ideal. Use divs and JavaScript to emulate the drop-down/expando behavior.
- re-write all index pages for higher-ed courses. Get rid of PHP files:
- - meta charset
- - course titles, instructor homepage, semester time

### /resume/ ###
- fix print.css!