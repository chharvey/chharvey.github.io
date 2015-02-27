Read my take on [Object-Oriented CSS](https://github.com/chharvey/chharvey.github.io/wiki/object-oriented-css#apply-it-to-css).

Use `CamelCase` on Objects and `single-hyphen-separated` on Interfaces, so that in terms of readability one can determine whether a class is an Object or Interface. Major words appear in order from general to specific. E.g., do `.ParaIntro`, not `.IntroPara`. Minor words should be combined, like `.Dropcap`.

# Namespaces

Classnames used only on one page or in a group of pages (e.g., a sub-site) must begin with a namespace prefix. This will help keep styles separated and prevent overuse of classnames. The namespace must contain only lowercase letters and should be 3&ndash;6 characters. The namespace must be followed by an underscore.

Chances are, you will need to add classes to your HTML elements so JavaScript can grab them and do things to them. We call these classes **JS hooks**. **Never use CSS styling classes for JS hooks.** Use the `.js_` namespace prefix, and don't apply any styles to these classes.

- `.res_Skillgroup`
- `.scheme_Colortable`
- `.grid_Phidemo`
- `.js_Table`

# Subclasses

Some classes will need modifiers for sizing, etc. When an Object extends another Object, use a modifier separated by two hyphens. For example, if `.H` is an Object, then `.H--Alpha` extends (is a subclass of, a special case of) `.H`. Objects may have nested subclasses, i.e., subclasses of subclasses.

- `.box--inline`
- `.H--Alpha`
- `.List--Bare`
- `.Map--Table--Sml`

# Descendants

[With some exceptions](#descendant-exceptions), descendant selectors are usually avoided, so indicating that one class of HTML element belongs as a descendent of another class of element is not specified via selector: it is usually specified in the naming convention as indicated above. However it is advantageous to additionally **indicate so in the classname** for extra unambiguity, without sacrificing specificity or efficiency. This way, the developer knows that the element belongs inside the other by inspection.

When an Object belongs as a child of another Object, use a modifier separated by two underscores. For example, if `.List` is an object, then `.List__Item` is a child Object. Here, "child" is used not as "subclass" but in the sense of the DOM tree. In other words, an Element that instantiates `.List__Item` is contained within an Element that instantiates `.List`.

- `.Bc__Anc`
- `.fnotes__fn`
- `.lang--html__tag`
- `.res_skilldetail__job`

## Descendant Exceptions

There are some cases in which using the child selector `.parent > .child` is okay. These cases involve intrinsic ownership: elements that belong to other elements by HTML standards, or by subcomponents. If an Object `.Wheel` belongs to (is a child of) the Object `.Car`, it would be okay to have the selector `.Car > .Wheel {}`.

### Lists

The following CSS is *very* efficient and not very specific at all. This is normally very good coding:

  <style>
  .nav {...}
  .nav__link {...}
  </style>
  <ol class="nav">
    <li class="nav__link"><a>link 1</a></li>
    <li class="nav__link"><a>link 2</a></li>
  </ol>

While this is usually best practice, the issue here is that each list item requires the class `.nav__link`, and that every time an item gets added to the list, the class has to be added again. While this may be efficient CSS, this is very *inefficient* HTML and it's not very DRY. For instance, if the list item classname were to change, we would have to go back and change all the classes on each list item in the HTML.

In this case it is better to view the list as one component, with the list items as subcomponents of that component. Here we are using a class selector to target the `ol`, but we are permitted to use an element selector to target the `li`s inside. Yes, the selector `.nav &gt; li` is more specific than `.nav__link`, but that is a small price to pay for [more efficient HTML].

  <style>
  .nav {...}
  nav > li {...}
  </style>
  <ol class="nav">
    <li><a>link 1</a></li>
    <li><a>link 2</a></li>
  </ol>

### Tables

I'm not going to give any examples here, but selectors describing any `thead`, `tbody`, `tfoot`, `tr`, `th`, or `td` Elements, etc. inside any `table` Elements are acceptable exceptions to the &ldquo;no descendant selectors&rdquo; rule.

### Miscellaneous Groupings

- `.H > .H__Sub` a subheading Object within a Heading Object
- `.Fn a` a link inside a footnote superscript
- `blockquote cite` a citation inside a block quote
