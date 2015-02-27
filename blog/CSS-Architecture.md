**Define properties, selectors, and stylesheets in order of increasing specificity.**

# Property Order

Properties within a CSS block should be written in order of decreasing structure definition. The inverted pyramid below illustrates how CSS properties are related.

![An inverted pyramid illustrates how CSS properties are related. The top contains structural properties, the middle contains content/textual properties, and the bottom contains schematic properties.](https://chharvey.github.io/chhlib/css-pyramid-props.svg)

Authors are encouraged to define properties in order shown from top to bottom in the pyramid. The top base of the pyramid contains properties that set up foundation and structure, such as display and position. The middle contains content, font, and text properties. Notice how container is defined before content. Then we finish with low-level schematic properties, such as color, at the vertex on the bottom.

Use this outline as a guide to ordering CSS properties.

1. structural properties:
  1. display
  -  width, height
  -  padding
  -  border
  -  outline
  -  margin
  -  box-sizing
  -  box-shadow
  -  positioning and float
  -  z-index
  -  transformations
- textual properties:
  1. content and counter
  -  font
  -  line-height
  -  letter-spacing
  -  text-align
  -  text-indent
  -  text-transform
  -  text-decoration
  -  text-shadow
  -  white-space
  -  list-style
- schematic properties:
  1. color
  -  background
  -  opacity
  -  visibility
  -  overflow
  -  cursor
  -  transition effects
  -  miscellaneous

# Selector Order

Within a stylesheet, the order of selectors is not that crucial (assuming, of course, that [your stylesheets are organized properly](#stylesheet-order)). Stylesheets should be modular, containing similar classes for similar functions. Thus the problem of organizing your selectors really becomes organizing your stylesheets (see the section below). However, even within similar selectors, there are some cases in which ordering is important. Consider the example below.

    <style>
    .foo + .bar {color: red;}  /* if .bar immediately follows .foo, it is colored red */
    .foo ~ .bar {color: blue;} /* all .bar following .foo are colored blue */
    </style>
    <div class="foo"> Exercise: </div>
    <div class="bar"> What color is this? Hint: it's not red. </div>

The adjacent sibling of an element *is* a general sibling, but it is a &ldquo;specific&rdquo; type of sibling, namely, an adjacent one. Therefore it's a common misconception that the selector `.foo + .bar {}` has a higher **specificity** than `.foo ~ .bar {}`, and thus the former will override the latter (regardless of the order in which they are defined). After all, wouldn't you think that a `.foo + .bar {}` is a special case of `.foo ~ .bar {}`? Actually, these two selectors actually have equivalent **specificity**, so whichever one is written last in the stylesheet will take precedence. The `div.bar` in the exercise above is blue.

The bottom line is that authors must define `.foo ~ .bar {}` *before* `.foo + .bar {}` in the stylesheet in order to get the results they expect. The same method applies to `.baz .qux {}` and `.baz > .qux {}`: the former must be defined before the latter because the latter is a special case of the former, even though they have the same specificity.

# Stylesheet Order

Stylesheets should be imported in order from most generic to least generic. It is recommended to split stylesheets into the following categories. Notice the categories go from general to specific, like an *inverted pyramid*.

1. global settings (site-wide, math functions, number and color constants)
-  reset (element selectors only)
-  layout and containers (grids, etc.)
-  tools and mixins (css helpers)
-  components (parts that build Objects)
-  typographical Objects (body copy, headings, paragraphs, text-level Elements, forms, etc.)
-  modules (non-text-based Objects)
-  style trumps (states, anomalies, special cases, `!important`, etc.)

![An inverted pyramid illustrates how CSS stylesheets should be implemented.](https://chharvey.github.io/chhlib/css-pyramid-sheets.svg)

Each of these categories are described in further detail below.

## Settings

The Settings stylesheet contains all the variables, functions, and constants that you want accessible throughout the entire site. This file doesn't actually produce any CSS. Since it's imported first, every other CSS (or Less) file has access to it. Settings include&mdash;

- global variables that are used throught the site and give it its look and feel. Global variables such as the base font size, line height, font families, and base colors, provide the look-and-feel of the site and may be changed.
- math functions that encapsulate repetitive mathematical operations. These are *not* Mixins or Interfaces used for CSS; they are just helper functions.
- global constants such as numerical values, color values, etc.

## Reset

The Reset stylesheet removes the browser-default styles (e.g. margins, font styles, etc.) from all HTML Elements. Essentially, it strips the elements down to nothing. This is the first stylesheet with actual CSS. With the Reset put into place (and nothing else), every single Element would look exactly the same. The reset stylesheet is very broad and general, because it comes early in the Cascade and is likely to be overridden later.

The use of a CSS reset is controversial. Authors against the use of a reset would say there's no point in removing a margin if you're going to add it back in later; this is just more work for the browser. Proponents might say that there's no predicting how a browser might one day change the default presentation of an element (all of a sudden it might decide to just go ahead and italicize all paragraphs), so you might as well reset everything just in case.

## Layout

Layout stylesheets determine how and where Objects are placed on the page. These stylesheets will define only classes that are meant for *containers, not content*. Thus it is acceptable that these classes have presentational names (e.g., `left`).

However, it should be the responsibility of the CSS/HTML author to *not* use presentational names in the HTML source. It is recommended to use semantic classnames, e.g. `main`, and then either implement or include the layout (grid) classes. This way, if the design of the page were to change, all that would need to be changed is the CSS code.

## Tools

Tools are Mixins and Interfaces that, like functions, encapsulate repetitive tasks. These Interfaces are *not* meant to be added to Elements in the HTML source (that is, *Elements cannot instantiate Interfaces*). Rather, Interfaces are simply helper classes that repeat sets of CSS rules to achieve a function. These are likely to be implemented in higher-level Components and Objects.

The difference between functions (in the [settings](#settings) sheet) and tools is that functions simply return values, whereas tools return styles. For example, [the Less `lighten(@color)` function](http://lesscss.org/functions/#color-operations-lighten) takes a color as an input and returns another color as the output. On the other hand, a tool such as `.fontsize(@ratio)` is a Mixin that will take a ratio as an input and returns a set of CSS rules (e.g. `font-size: (@ratio * 16px); line-height: (1.5 / @ratio);`) as the output. Not all tools are Mixins. Some are regular classes, though they should still not be added to HTML Elements. These are called Interfaces. Think of them as Mixins with zero inputs. There is a reason they are not zero-parameter Mixins, which you can read about in [Object-Oriented CSS](Object-Oriented-CSS.md).

## Components

Components are pieces of Objects that are used repetitively throughout the site. They utilize reusable and abstract design patterns, but do not describe whole Objects. An example would be a type of border used as a particular theme.

Like [tools](#tools), components should not be instantiated by HTML Elements. If an Element needs to "have" a certain component, it should instantiate an Object that implements that component's Interface. Read more about [Object-Oriented CSS](Object-Oriented-CSS.md) for details. Tools and components are very similar in that they group a particular set of styles to create design patterns. Technically, there is no real difference, but you can think of tools as **helpers for doing something** and components as **"Legos" for building Objects**. Tools typically have only one function (but may need more than one CSS rule to achieve it), while components typically add many features to an Object.

## Typography

Here we reach our first stylesheet that allows classes to be added to HTML Elements. In OOP-speak, Objects are classes that Elements can instantiate. Read more about this in [Object-Oriented CSS](Object-Oriented-CSS.md).

Typographical Objects are mostly text-based and are used mainly in document prose. These include body copy, articles, headings, paragraphs, block quotes, lists, figures, tables, and text-level semantics (highlighting, etc.). Some authors choose to split even these categories into separate sub-stylesheets.

This stylesheet does not use Element selectors as you would expect, but rather Objects that correspond to features of a document. For example, the Heading Object in this stylesheet will not have the selector `h1 {}`, but rather a class selector such as `.H {}`. *HTML elements on a page must instantiate the CSS Objects* for proper styling. Elements that do not instantiate an Object will be styled via [reset](#reset) or browser-default.

There are three layers of typographical Objects: document-level, block-level, and text-level. Document-level Objects include styles that apply to the entire body copy or an entire article and subcomponents thereof, such as breadcrumbs and tables of content. It may be noted that some of these subcomponents actually contain other Objects that are to be defined later down in our inverted pyramid. For example, a breadcrumb link may contain a type of module defined in the [Modules](#modules) stylesheet.

The second layer is block-level, which includes styles for elements in a document or article that group text together. For example, headings, paragraphs, lists, tables, etc. Again, although eachg of these things corresponds to an HTML Element, it is best to make an class (such as `.Fig` for figure-looking Objects) and then *instantiate* that class with the Element. This way the Objects remain Element-agnostic, meaning any Element can instantiate it. This makes it possible to do something like `<p class="Fig">`, in which you want a paragraph to *look* like a figure, but not actually have the semantics of the HTML `figure` Element (namely, that it may be taken out of context).

Lastly the third layer is text-level, which styles only phrasing content. These Elements are used so frequently that it would actually be more inefficient to assign a class for each of them. For instance it would be impractical to make an `.Emph` Object and have to write `<em class="Emph">` in your code. Thus for this last layer, the "Objects" will be defined with their normal Element selectors.

There is one more category of Objects that belong to the "Typographical" group: Form Objects. Though slightly less text-based, Form Objects are only used in `form` Elements. Examples include buttons, text boxes, drop-down lists, and check boxes.

## Modules

Modules are self-containing Objects that may be placed anywhere. They are not necessarily typographical or semantic (they might be instantiated by `div`s and `span`s), but their semantics are derived from their presentation. That is, the meaning of the Object can, for the most part, only be determined by how it looks. Examples include breadcrumb lists, warning labels, and word tags. More importantly, though, a module may not be semantic per se: it may have semantic sub-components (such as an image, heading, and paragraph) but the module as a whole is simply a grouping. A good example of this would be *the media object*.

## Trumps

...
