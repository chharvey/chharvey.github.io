**This document describes guidelines for writing good CSS with a true object-oriented programming (OOP) point of view. For more information, read up on [Less CSS](http://lesscss.org), Sass, and [Nicole Sullivan's OOCSS open-source project](https://github.com/stubbornella/oocss).**

# The Original Intent of HTML Classes

Classes were [originally] meant to group **semantically similar** elements together. For example, all elements that represent warnings on a page could be instances of the `.warning` class. A side effect of similar elements belonging to one class is that they can all be styled the same way with CSS.

**Content before presentation.** When it comes down to efficient HTML versus efficient CSS, HTML wins. The reason? Semantics always trumps style. You've got a problem when you find yourself having to adjust a huge amount of HTML just to conform to CSS best practices (such as adding 8 different classes to an element to get it to look exactly how you want). It should be the other way around. CSS should conform to how HTML is (or should be) written, even if it means sacrificing a little bit of efficiency.

Now with the development of Object-Oriented CSS, we have learned to take advantage of classes and use them for many different reasons. Such a diverse use of one specific feature of HTML has grown so large it has become an epidemic.

# Classes of Classes

There is a clear case of &ldquo;classitis&rdquo; in front-end web development. Before you object, hear me out! My definition of classitis refers not to the overuse of classes&mdash;I believe there can never be too many classes present in an HTML document&mdash;but to the fact that we are using classes for *everything*. We need to seriously look at how and why we are using classes, what kinds of &ldquo;classifications&rdquo; into which we can organize them, and maybe provide some alternative methods and/or conventions for implementing semantics and style. I even go insofar as to suggest ammendments to the CSS specification. After all, [we are using a very old technology to achieve very new things].

All the types of classes below are technically indistinguishable&mdash;like any CSS class, they have a given set of properties and thus aren't differentiated by browsers&mdash;however, they are actually used for different purposes. We must make the distinction clear to provide a starting point for the cure of classitis.

## Presentational Classnames

### Type 1

**Classnames that describe their definitions.**

These classnames describe the properties that define the class. Examples include `.big` and `.margin-top-24`. Read about *Atomic CSS* [here](https://www.lucidchart.com/techblog/2014/01/31/atomic-css-tool-set/) and  [here](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/) for more examples. It shouldn't be very hard to guess how these classes are defined.

### Type 2

**Classnames that describe their general appearance.**

While truly presentational classes describe the properties in their definitions, there is a bit of a step up in types of presentational classes. Classes that describe their *general* appearance are still presentational, but are not so specifically named that their properties are locked.

Take `.grid-50-left` for example. The name of the class indicates the look of the component, namely, that it should be 50% wide and moved to the left, but it does not explicitly say *how* it achieves this look. It may use floats, a table-like layout, flex boxes, or grid layouts. The implementation of its appearance may be changed, so long as its appearance stays the same. Another example would be `.list-inline`.

### Discussion: Type 1 and Type 2

There are some cases in which having presentational classes available in CSS is helpful. In short, they provide abstraction. Type 1 and Type 2 classes can be used as a mechanism for site-wide consistency, and can save developers the hassle of having to repeat the same lines of code over and over again. For example, redefining the same top margin on multiple elements is not only tedious but also error prone. The developer has to remember the number of pixels, code is repeated, and upkeep is expensive. These classes provide an easy and scalable solution. Another case of this is using a grid system. A class such as `.grid-50-left` is *very* presentational but necessary for DRY code.

Though presentational classes are useful to CSS developers, Type 1 and Type 2 should *not* be accessible to the HTML. There are a number of reasons why:

- HTML describes content, not presentation. Technically, classes are in the HTML. It is an HTML attribute, and thus adding a value to the `class` attribute of an Element should have *some* semantic meaning (even if only for humans). The classname `.boldred` for example does not add any semantic value to the HTML. An ideal alternative would be to use `.warning` (or something similar) and then have the `.warning` class use the properties defined in `.boldred` in some way. More on that later. `.warning` would go in the [Type 3 category](#type-3).
- **The Theoretical Redesign Future.** If you wanted to change the properties of the `.boldred` class, say, make it italic instead of bold, now you have to deal with an awkward classname, or you have to change the classname from `class="boldred"` to `class="italicred"` everywhere in the HTML. Sure, a search-and-replace tool would be useful, but you shouldn't have to put yourself through all that trouble. On the other hand, you are free to change `font-weight: bold;` to `font-style: italic;` in the definition of `.warning` easily without dealing with a classname that doesn't match its definition.

The point is not to say that `.boldred` *shouldn't* be a classname. It very well can be! In fact, if a lot of elements use the properties of this class, you *should* make `.boldred` a class, so you can use it as a tool to abstract a repeating pattern. The point *is*, however, to say that this class should *not* be available to HTML Elements. [Continue reading for a discussion on how to do this.]

Type 2 classes are *a bit* of a step up from Type 1 because their definitions are a little more maleable, but still, they shouldn't be available in the HTML because they are presentational. In HTML, you should use semantic classnames.

## Semantic Classnames

### Type 3

**Classnames that describe their function.**

&ldquo;Semantic&rdquo; classnames aren't really semantic (they don't actually *convey* meaning to the HTML or UAs (user agents)). Rather, they are *named* semantically because they describe the meaning of the component and/or its contents. Examples include `.pacingtable`, `.answer`, `.optional`, and `.success`.

These are good classes to use in HTML because they mark up Elements with data describing what they mean. For example, take the Element `p.success`. There are two semantic things going on here: first, the `<p>` tag describes what the Element *is*, but second, the `class="success"` attribute describes what the Element *means*: it's some sort of indication of success, such as the completion of an upload. Of course, only the first of these is actually meaningful to a UA, but that is not to say that the classname doesn't add any semantic value for the benefit of human developers. The bottom line, semantic classnames *should* be accessible to the HTML.

### Type 4

There is one more type worth mentioning, a fourth type of class: **classes used to add semantic value to the HTML**. We will talk about them in this section but we won't use them in the rest of the document.

A common use of classes to extend HTML would be to create elements that aren't present in the HTML standard. Based on an author's field, the HTML specification may or may not have an adequate sampling of types of elements for the author's work. For example, why is there not an `<abstract>` element? I suppose the solution would be to use `<p class="abstract">`. This is an example of using a classname to "extend" the `p` Element: it is a type of paragraph, namely an article abstract.

The biggest use of Type 4 classes I can think of would be [Microformats](http://microformats.org/). However this is basically an industry standard, albeit easily extendable, and individual developers can't use their own custom classes for this. As stated at the top of this page, classes are really meant to add styles and that's about it. They should not indicate semantics to user agents in my opinion. To add semantic value, I would recommend using another method such as the custom `data-*` HTML attribute, [Microdata](http://schema.org/) (`itemscope` and `itemprop`), and/or [ARIA roles].

# Object-Orienting Your CSS

## A Brief Introduction

This is a *very* short introduction on object-oriented concepts. In the computer programming world, most data takes the form of an **object**. This object and others like it are made from a template, called a **class**. When you have a class, you can **instantiate** it, in other words, create an object from the template. Classes may have different properties that describe it, such as states and behaviors.

The biggest advantage to object-oriented programming is a feature called **inheritance**. Given a class, you can **extend** it by create another class, called a **subclass**, which takes all the properties of its **parent class**. The subclass will usually have more properties as well; it is a special case of the parent class. In most cases, inheritance is single: a subclass can only extend one parent class.

In addition to classes, there are also things called **interfaces**. Interfaces are like classes in that they also have properties, and classes can take the properties of interfaces, as they can with other classes. However instead of saying the class *extends* the interface, we say the class **implements** the interface. Interfaces are different from classes in that they cannot be instantiated. You can't make an object out of an interface. You can, however, make an object from a class that implements the interface.

Because interfaces cannot be instantiated, they provide many benefits. First, interfaces can have **multiple inheritance**: one interface can extend more than one parent. More so, classes themselves can implement more than one interface as well.

## Apply it to CSS

We can apply these ideals to CSS, if we make the correct analogies.

The following definitions are used throughout documentation and have no particular object-oriented (OO) significance. An **Element** refers to just that: an element in HTML that takes the form of a tag, or, in CSS, any selector that corresponds to an HTML Element. An **HTML class** refers to any value of the `[class]` attribute of an Element in HTML source. Also, a **CSS class** in general is any identifier in CSS that begins with `.` and can be used in the HTML `[class]` attribute.

Here we begin to use terms in the object-oriented sense. An **Object** (capitalized) refers to a CSS class that *should* be applied to an Element, that is, *should be* allowed to be a value of the `[class]` attribute. You might be wondering if that refers to all CSS classes. While any CSS class can be applied to an Element, as stated above, certain CSS classes *should* and *should not* be available to HTML. Here, the term **Object** refers only to Type 3 CSS classes, those that are semantically named. An **Object** may also refer to an Element that instantiates a Class. (In the OOP world, Objects are different from Classes but in CSS we can use them interchangeably.)

Other CSS classes exist but are not deemed as "Objects" because they shouldn't be instantiated (as mentioned above, Type 1 and Type 2 classes shouldn't be available to HTML). These classes can, however, be used to make up Type 3 classes. In the OO sense, we call these classes **Interfaces**, and Objects can **implement** them. Interfaces are permitted to be named "unsemantically", i.e., their names may describe their definitions or general appearance. This is because Interface names are visible in CSS, so Objects can implement them, but they're not visible in HTML, so Elements cannot.

So, in CSS, how do we distinguish between Objects and Interfaces? How do we make Objects available to HTML while keeping Interfaces visible only to the CSS?

## A Suggested Solution

Before we get into architecting CSS to make it object-oriented, please read about [naming classes](https://github.com/chharvey/chharvey.github.io/wiki/Naming-Convention).

### Showing and Hiding Classes

Other than change the naming convention, we don't need to do anything to Objects. Our goal is to make them available to HTML, which is already built into CSS.

For Interfaces, the issue gets complicated.

#### Mixins (Includes)

The first solution is to use a mixin. A mixin in its general definition allows the developer to reuse lines of code without having to write them over and over again. It's basically a glorified copy-and-paste. Mixins are available in CSS pre-processors such as Less and Sass, and using a mixin instead of a class will hide the mixin block from the CSS output. That means the name can't be used in HTML, which is good.

Although mixins make life easier for the developer, the problem is that the compiled CSS is still not DRY. The properties are still being written over and over again (this time by the compiler instead of the developer), which creates bloat in the CSS properties. This means a lot of work for the browser, a lot of bytes to download, etc. Imagine having a mixin with 10 properties. If hundreds of other classes are using this mixin, you've got those 10 lines of code repeated hundreds of times.

Aside from reducing repeated code, another benefit of mixins is that they can be used with parameters to abstract a ruleset. Mixins are good with parameters, but if you have a mixin with zero parameters, there might be a better solution.

#### Extends

Another solution is to use a regular class, but `extend`ing it (not in the OO sense, but using the `extend` mechanism). A preprocessor handles the `extend` mechanism by defining the extending class immediately after every definition of the extended class. In CSS, comma-separated selectors all share the rules in the block. So you're not repeating the CSS properties, but now you're repeating CSS selectors. The bloat is still there, just in a different place. This isn't much of a step up from mixins. And not to mention, now that you're using a normal class, it will be available to the HTML.

**UPDATE: I have decided to no longer use the `extend` mechanism in Less/Sass because of the problems with specificity. Though using `include` (mixin) is less DRY, the benefit of keeping specificity in line outweighs the cost of duplicated code.**

#### Hack

A better solution is somewhat of a hack: still use a class, but &ldquo;hide&rsquo; it from the HTML by nesting it into a nonsensical ID selector.

  #_  .boldred { ... }

Define the Interface and `extend` or mixin/inlcude it with the classes you need such as `.warning`. Yes, the class `.boldred` is still available to the HTML, but the styles will only apply if it's in an Element with `id="_"`, which I hope you'd never use, albeit valid. By the way, this is the one time you can use an ID selector in CSS (and it's really not even an ID selector; it's a hack). Other than this, *never* use ID selectors!

#### One Can Dream

It is my hope that future versions of CSS will support some sort of Interface/private selector functionality, and not to mention, an accompanying `GOTO`-like feature.

  <style>
  @boldred {
    font-weight: bold;
    color: red;
  }
  .warning {
    goto: @boldered; // browser reads @boldred{} and returns when done
    text-align: center;
  }
  </style>
  <div class="boldred"> nothing happened </div>
  <div class="warning"> bold and red, and also centere</div>

# Caveats

Objects must only extend Objects that have been previously defined in a stylesheet. The reason is to honor the cascade. If an Object were to extend an Object that were defined *afterward*, then some of the properties in the subclass may get overridden by properties in the superclass. The same applies to Objects/Interfaces that implement Interfaces. Not observing this practice will result in semantic errors, not syntactical errors. **Developers beware.**

Objects must only include mixins that have been previously defined in a stylesheet. The reason is to prevent infinite loops (or in set theory terms, irregular sets, ha). The following Less will not compile:

  .bar {.foo;}
  .foo {.bar;}
  // syntax error

Thus if `.foo` is written before `.bar`, then `.bar` may include/extend `.foo` but `.foo` may *not* include/extend `.bar`. Not observing this practice *will* result in syntactical errors. *Don't do it!*
