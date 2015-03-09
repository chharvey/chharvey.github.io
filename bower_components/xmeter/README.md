# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced "Cross Meter".

## Installation

    $ bower install xmeter

## Usage

This package depends on **normalize.css**. It is listed under the package dependencies,
so there is no need to install it separately. However this stylesheet does *not*
`@import normalize.css`. In order for it
to work properly, you *must* link **normalize.css** in your HTML *before* linking this stylesheet.
Use the following `link` elements
in the HTML head:

    <link rel="stylesheet" href="path/to/bower_components/normalize.css/normalize.css"/>
    <link rel="stylesheet" href="path/to/bower_components/xmeter/xmeter.css"/>

To use this stylesheet in your own Less project, import (reference) it:

    @import (reference) url(xmeter.less);

This allows you access to all the mixins and selectors, so you can build on top of them.

## About

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

While **normalize.css** addresses discrepancies between different browsers' rendering of HTML
elements, providing only the very basic and necessary styles, **xmeter.css** adds additional
styles for a more streamlined look and a vertical rhythm system. (For more information on
vertical rhythm, see these articles in
[24ways](http://24ways.org/2006/compose-to-a-vertical-rhythm/) and
[Smashing Magazine](http://www.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-rhythm).)

Features of this stylesheet include the following. See the test page (`./index.html`)
for a demo.

- Vertical rhythm &mdash; every line on the page is exactly the same height
  (dubbed a "vertical rhythm unit" or "vru") regardless of font size, and typographical
  elements (headings, paragraphs, figures, blockquotes, lists, tables, etc.) are separated
  by integer multiples of that height.
- Font-size for `html` is set to `100%` to accommodate for user agent settings. All other
  font-sizes are relative (either `rem`s or `em`s, no pixels or inches).
- All line-height values are unitless.
- Units for font-size, margin, and padding on block elements are in `rem`s rather than `em`s,
  thus the size of an element's font remains the same regardless of where that element is placed
  (style does not depend on location).
- **However:** `em`s are used on text-level elements, so that these elements scale accordingly
  when nested inside elements with a larger font size (style *does* depend on location).
- Line-height for all inline (text-level) elements is 0. This allows the vertical rhythm to
  remain unaffected.
- Minor, albeit prettier, style changes to some text-level elements from the browser default.
