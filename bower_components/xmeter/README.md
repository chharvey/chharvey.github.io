# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced "Cross Meter".

## Installation and Usage

This package is really a two-in-one. First, it is a set of tools (functions,
fallbacks, modules, etc.) that make your life easier when working on a site's
existing stylesheet or starting a brand new one. Secondly, it provides a base
stylesheet, a starting point, for developing a new site. It is geared towards
sites (or sections of sites) that are more static and typographically inclined
and not so dynamic like “web apps.”
Read the [About](#about) section for more info.

There are two ways you can use this package. One option is if you’re
**developing** your own front-end package (such as a CSS library or site-wide
stylesheet) that *uses* this package as a dependency, and the other option is
if you’re **deploying** a project (such as a website or blog) that *mentions*
(i.e., references) this stylesheet.

This package uses **normalize.css** as a dependency.
If you’re *developing* a package, then it is automatically installed,
but if you’re *deploying* a project, you have to install it manually (via `bower`, etc.).

**Important:** `xmeter.css` does *not* `@import normalize.css`
(*this may change in the future—stay tuned for updates*).
In order for it to work properly on your page,
you *must* link **normalize.css** in your CSS / HTML *before* linking this stylesheet.

### Development

(The First Option)

To install:

    $ npm install xmeter

#### Using the Tools

Take a look in the `src/` folder. In here you will find a set of tools, starting
with `__tool`, from which to pick and choose to use for your package. Note that
the contents of each file are wrapped with the id selector `#XMETER {}` to keep
it encapsulated. Think of `#XMETER` as one huge object whose properties are
the mixins. Or think of it as a namespace. Whatever.

If you want to use a particular tool in your stylesheet, you will have to
`@import (reference)` that tool, and then invoke it with `#XMETER`. For example,
if you plan to use the `.font-size-block()` mixin in your Less, you must include

```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.fontsize.less');
```

at the top of your stylesheet. Then when you want to “call” the mixin, do

```less
.my-selector {
  #XMETER .font-size-block(2.0; 1.5);
}
```

To use the xmeter variables and constants,

```less
@import (reference) url('/node_modules/xmeter/src/__settings.less');

.my-selector {
  #XMETER .VARS(); // invokes the set of variables
  line-height: 2 * @xmeter_line_height;
}
.my-other-selector {
  #XMETER .CONSTS(); // invokes the set of constants
  width: @1o2;
}
```

*The difference between **variables** and **constants** is that values are reflected in
the names of constants but not variables. For example, `@xmeter_line_height` so happens to be 1.5.
This value may change in the future (though it probably won’t), but the variable name need not change.
This merely indicates the line height has been changed.
On the other hand, `@1o2` is a constant whose value is 50%. It would be silly to change this value
for obvious reasons.*

#### Using the Base

Also in the `src/` folder are a set of files starting with `_base`. These files,
unlike tools, provide actual styles for actual elements. Also unlike tools, these
stylesheets are *not* meant to be cherrypicked. They are compiled separately<sup>&lowast;</sup> and
concatenated together in the main file `xmeter.css`. If you’re developing a
stylesheet that you want built off of xmeter, include

```less
@import url('/node_modules/xmeter/node_modules/normalize.css/normalize.css');
@import url('/node_modules/xmeter/xmeter.css');
```

at the top of  your file. Notice that **normalize.css** must be imported separately,
and before **xmeter**.

This package also comes installed with a [test page](./test.html)
that links to the main stylesheet.

*<sup>&lowast;</sup>The reason the stylesheets are compiled separately is to increase
encapsulation. They still have access to global variables (such as `#XMETER`),
but now local variables and mixins can be defined within the file without
affecting other files.*

### Deployment

(The Second Option)

This option is for you if you don’t wanna develop with **xmeter**, you just
wanna use it on your site. It’s a great starting point that “normalizes”
unclassed HTML elements before any specific classes and styles get added on.

See the [test page](./test.html) for a preview.

To install:

    $ bower install https://github.com/chharvey/xmeter.git
    $ bower install normalize.css

To reference this stylesheet on your own site:

```html
<link rel="stylesheet" href="/bower_components/normalize.css/normalize.css"/>
<link rel="stylesheet" href="/bower_components/xmeter/xmeter.css"/>
```

If for some reason you do not have these stylesheets installed locally, you may
fetch them off the web as you would from a CDN (though this is not recommended).

```html
<link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css"/>
<link rel="stylesheet" href="https://chharvey.github.io/xmeter/xmeter.css"/>
```

## About

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

While **normalize.css** addresses discrepancies between different browsers’
rendering of HTML elements, providing only the very basic and necessary styles,
**xmeter.css** adds additional tools and styles for a more streamlined look and a
vertical rhythm system. (For more information on vertical rhythm, see these articles in
[24ways](http://24ways.org/2006/compose-to-a-vertical-rhythm/) and
[Smashing Magazine](http://www.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-rhythm).)

Features of this stylesheet include the following. See the test page (`./test.html`)
for a demo.

- Vertical rhythm &mdash; every line on the page is exactly the same height
  (dubbed a "vertical rhythm unit" or "vru") regardless of font size, and
  typographical elements (headings, paragraphs, figures, blockquotes, lists,
  tables, etc.) are separated by integer multiples of that height.
- Font-size for `html` is set to `100%` to accommodate for user agent settings.
  All other font-sizes are relative (either `rem`s or `em`s, no pixels or inches).
- All line-height values are unitless.
- Units for font-size, margin, and padding on block elements are in `rem`s
  rather than `em`s, thus the size of an element's font remains the same
  regardless of where that element is placed (style does not depend on location).
- **However:** `em`s are used on text-level elements, so that these elements
  scale accordingly when nested inside elements with a larger font size
  (style *does* depend on location).
- Line-height for all inline (text-level) elements is 0. This allows the
  vertical rhythm to remain unaffected.
- Minor, albeit prettier, style changes to some text-level elements from the browser default.
- Fallback tools for browser discrepancies on CSS3 properties.
- `.sprite()` mixin makes it easy to work with background image sprites.

## Changelog

It’s on [Github](https://github.com/chharvey/xmeter/releases).
