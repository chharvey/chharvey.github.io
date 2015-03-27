**Define properties, selectors, and stylesheets in order of increasing specificity. Based off of Harry Roberts&rsquo;s Theory of ITCSS.**

# Property Order

Properties within a CSS block should be written in order of decreasing structure definition. The inverted pyramid below illustrates how CSS properties are related.

![An inverted pyramid illustrates how CSS properties are related. The top contains structural properties, the middle contains content/textual properties, and the bottom contains cosmetic properties.](images/css-pyramid-props.svg)

Authors are encouraged to define properties in order shown from top to bottom in the pyramid. The top base of the pyramid contains properties that set up foundation and structure, such as display and position. The middle contains content, font, and text properties. Notice how container is defined before content. Then we finish with low-level cosmetic properties, such as color, at the vertex on the bottom.

Authors may take this a step further and **split CSS classes into designated responsibilities,** that is, use separate classes for structural vs. textual vs. cosmetic properties.

Use this outline as a guide to ordering CSS properties.

1. structural properties:
  1. display
  -  width, height
  -  box-sizing
  -  padding
  -  border-width
  -  margin
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
  -  white-space
  -  list-style
- cosmetic properties:
  1. border-style
  -  border-color
  -  border-radius
  -  outline
  -  box-shadow
  -  text-transform
  -  text-decoration
  -  text-shadow
  -  color
  -  background
  -  opacity
  -  visibility
  -  overflow
  -  cursor
  -  transition

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

Stylesheets should be imported in order from most generic to least generic. It is recommended to split stylesheets into the following categories. Notice the categories go from general to specific, like an [inverted pyramid].

1. global project settings (`@import`s, frameworks, site-wide number and color constants)
-  helper tools (math functions, mixins for vendor-specific css, fallbacks)
-  unclassed base elements
-  objects (structural patterns, layout, containers, etc.)
-  components (specific pieces of UI with look-and-feel)
-  utilities (trumps, hacks, states, anomalies, special cases, `!important`, etc.)

![An inverted pyramid illustrates how CSS stylesheets should be implemented.](images/css-pyramid-sheets.svg)

## Settings

The Settings stylesheet contains all the variables, functions, and constants that you want accessible throughout the entire project. Since it&rsquo;s imported first, every subsequent stylesheet has access to it.

This stylesheet is where you `@import` any other frameworks (normalize, resets, etc.). Imports should be at the top.

After imports, include global site-wide constants such as main font size, line-height, font families, colors, and spacing constants that give the site its look and feel. They may be changed here.

## Tools

Tools are used only for encapsulating repetitive tasks. They should not be accessible to HTML elements (thus they should be mixins, not classes), but they may be used in subsequent stylesheets. There are 3 types of tools.

### Math Functions

Math functions make doing mathematical operations easier. For example you may want to define a function that averages two numbers evenly, or that adds a transparent factor (alpha) to an rgb color. These functions are content-ambiguous by nature, and do not produce actual CSS properties. They only take input values and produce output values.

### Fallback Tools

Fallback tools are exactly that. They are mixins that you want to use to encapsulate fallback rules or vendor-specific rules. These mixins *do* produce actual CSS, but only if they&rsquo;re included in a CSS selector. Displaying a flexbox, for example, needs to support multiple browsers and/or a fallback for browsers not supporting it. Rather than repeating the same handful of rules over and over again, use a tool that will automate this task.

### Modules

Modules are small tools that make your life easier. Like fallback tools, modules combine multiple properties to achieve an effect, except that these properties aren&rsquo;t all variations of the same thing. They are actually different properties that when combined take care of one task. One example is the `.font-size-block()` tool.

    .font-size-block(@ratio) {
      font-size: (@ratio * 1rem);
      line-height: (@project_line_height / @ratio);
      // @project_line_height is a global variable defined in the Settings sheet
    }

This mixin sets the font size of a block and adjusts its line height such that the total height of the block will be an integer multiple of the project line height. This is a common tool used to maintain vertical rhythm.

Other similar examples include a module that adds a bottom border to an Element but removes an equivalent amount of bottom margin, or a brand font module that requires `font-weight: bold;` every time a certain font family is set.

Modules can also be thought of as pieces of [Objects](#objects) and [Components](#components), or <i>Legos</i> that are used repetitively throughout the project. They utilize reusable and abstract design patterns, but do not describe whole Objects or Components. More examples include a type of border used as a particular theme, or a particular amount of padding on a box.

Again, modules should not be accessible to HTML Elements. They should be mixins that you include in your Less selectors. If a certain Object needs to use a Module, include the Module in that Object&rsquo;s class definition.

## Base

The Base stylesheet is the first stylesheet with real selectors. This is what shows up first in the compiled output CSS. All its selectors are unclassed HTML Elements. Think of it as a tailored normalize stylesheet for your project typography. If your project Settings sheet imports other frameworks, this stylesheet will build on top of those frameworks. This stylesheet is very broad and general, because it comes early in the Cascade and is likely to be overridden later.

## Objects

Objects are generic classes that provide cosmetic-free layout and structure for a page and its Elements. Any layout or grid system classes should go here, as well as other classes that are used to define an Element&rsquo;s structure without relying on context. Examples include the Media Object, the Nav Abstraction, and the Island Object. All of these objects determine layout and/or structure, but do not affect look-and-feel.

Objects, and Components discussed below, are actual CSS classes that can be applied to HTML Elements. In OOP-speak, Objects and Components are classes that Elements can <i>instantiate</i>. Tools, on the other hand, should not be accessible to HTML Elements, only to CSS classes. Tools are more analogous to interfaces instead of classes. Elements cannot instantiate interfaces but classes can implement them.

## Components

Components are recognizable pieces of UI that have a particular look-and-feel. Buttons, breadcrumb lists, labels, and tags are all good examples. These classes are built on top of Objects, but they also provide cosmetics for the Element.

In a way, the semantics of a component is derived from its presentation (cosmetics). That is, the look-and-feel of an Element may determine its meaning in terms of usability. For example, a `span.label` might not look like anything with styles turned off, but with them on it might clearly represent a label attached to a link or something.

Furthermore, a Component itself may not be one semantic Element; it may be a grouping of semantic Elements. For example a profile Component may contain an image, heading, and paragraph. The Component as a whole though is simply a `div`.

## Utilities

Overrides, helper classes, hacks, and things that use `!important`.
