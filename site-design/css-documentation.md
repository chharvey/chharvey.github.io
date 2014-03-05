# Writing CSS #
**CSS is not "documentation" for HTML.** It is not the job of CSS to enforce or validate proper semantics. The job of CSS is to style elements, and just because authors have the power to use selectors to "prohibit" broken elements from being styled does not mean that the HTML will become any less broken as a result. It only means that CSS will not style the broken HTML.

Here's an example: let's say in your CSS you have a selector `ol.nav > li > a`, which creates a yellow background color. In your HTML, you might have:

	<ul class="nav">
		<a>link 1</a>
		<a>link 2</a>
	</ul>

by accident (notice this is an *un*ordered list and also there are no list items). When writing the CSS, it was probably your intent that the links inside an ordered navigation bar should be given the background color, but this selector is way too specific (the specifity is 31) and not very efficient (check out [how browsers read CSS]()). It is probably a better choice to use the selector `.nav a`, which only has a specificity of 11 and is much faster.

Now, with the first selector, you're likely to catch the invalid HTML. You'll be looking at the page and wonder why the links don't have background colors, at which point you'll compare the CSS with the HTML and notice it is the wrong type of list and there are no list items. This is an advantage to the first selector. Another advantage is that the `.nav` is qualified by `ol`. In a way, it might seem as if the CSS "forces" (but not really) the `.nav` class to only work on the `ol` element, but this is simply not true. In reality, you can apply the `.nav` class to whatever the hell element you want; the only thing is that only `ol.nav`s will be styled. The same is true with the invalid `ul > a`. While it is not okay to have an `a` child of `ul`, and while it is true that these `a`s won't be styled, the HTML is not going to fix itself. It is not the job of CSS or the CSS author to enforce HTML validation.

Keep in mind that with the second selector, `.nav a`, the HTML is still just as invalid, the only difference is you might not be able to catch the error as quickly because the links will still be styled the way you wanted. However this can be seen as an advantage to the second selector—it is more forgiving. Your HTML is still invalid, yet the links are still styled correctly. The CSS has done its job. Then let the HTML validator do its job.

In summary: Don't use CSS as a validator for HTML. If you have rules to follow (other than those in the HTML specs), use your company's documentation, or make your own. If you want the class `.nav` to be applied only to an `ol` element, don't use the selector `ol.nav` in your CSS. Write it in your documentation somewhere, e.g. "The `.nav` class is used for `ol`s only..." and keep using the unqualified element in the CSS. This practice will reduce file size and increase browser speed.

Another option is to use a CSS preprocessor such as Less to **extend** a class or element. For example,

	.nav {
		&:extend(ol);
	}

This way, if the `.nav` class ever gets applied to any other element, it will get styled as an `ol`, so you will be able to catch the mistake in the HTML. All this is done with a very non-specific and efficient selector.

*There are a few exceptions...*

## Quasi-Elements ##

**Quasi-Elements** are CSS classes applied to HTML elements. Wait—that doesn't sound very special. Well, rather than most CSS classes, which are used for styling an element only, quasi-elements have a semantic meaning and represent elements that should, in this author's opinion, be actual elements in HTML. Quasi-Elements in a CSS file are notated as qualified selectors, e.g. `elem.class`. Notice the use of a qualified selector here. Yes, this increases specificity and reduces efficiency, however this is a small price to pay for the benefit of adding new semantic elements.

For example, a quasi-element might be a postal address. While the `address` element by the HTML5 standard is meant to represent contact information about the author of the nearest ancestor `article` (or, if there is none, `body`), there is currently no HTML element designated to mark up an arbitrary postal address, which may or may not be related to the author's contact information.

Thus, in my CSS file, I have a selector called `div.postal`. This selector by itself, from an outside point of view, seems like a normal qualified selector. Nothing special, right? However by my notation I am saying this represents a semantic element, namely, a postal or mailing address. The `.postal` class can and should only be applied to a `div` element, hence it is qualified in the CSS file. Regarding the discussion above, is this qualified selector going to prevent the `.postal` class from being applied to other elements? No, but here we need a distinction between a class used for style and a class used for semantics. Currently, there is no application of quasi-elements, but work is being done to make them more useful. For instance, a geotag in some metadata format could be added to the `div.postal` for a location service.

All quasi-elements should be represented by qualified selectors, and conversely, the only qualified selectors must represent quasi-elements. If there are qualified selectors that aren't quasi-elements, make the selector unqualified.

List of Quasi-Elements:
- `div.informative`: draft... may be deleting soon...
- `div.postal`: a postal address
- `div.precode`: a pre-formatted block of computer code, equivalent to `pre > code`
- `span.hsub`: a subheading or "tagline" (contained within a heading element)
- `i.thought`: a span representing a silent thought, like a quote but for thinking
- `b.keyword`: keyword or technical term
- `b.proper`: a proper noun traditionally italicized, e.g. periodical name or ship name
- `b.ref`: reference to a title, section heading, figure, table, or creative work. use only when the `a` element or the `cite` element would not be appropriate

## Child and Descendent Selectors ##
It is common practice to avoid child selectors, e.g. `parent > child` or descendent selectors, `ancestor > descendent` in CSS files as they increase specificity and decrease efficiency. However, there are some cases in which this is okay. By the HTML standards and by my own documentation, certain elements are grouped together intrinsicaly.

### Lists ###
The following CSS is *very* efficient and not very specific at all. This is normally very good CSS.

	.nav {border: 1px solid black;}
	.navlink {background-color: yellow;}

However there is an exception. Look at the HTML below.

	<ol class="nav">
		<li><a class="navlink">link 1</a></li>
		<li><a class="navlink">link 2</a></li>
	</ol>

The issue is that every time a link gets added to the navigation list, the class `.navlink` must be added. While this may be efficient CSS, this is very inefficient HTML and it is not very **DRY** (don't repeat yourself). For example, if the classname were to change, every single link would have to be changed. It would be much simpler to view the list as one entity and the list items inside as part of that entity.

	.nav {border: 1px solid black;}
	.nav a {background-color: yellow;}
	<ol class="nav">
		<li><a>link 1</a></li>
		<li><a>link 2</a></li>
	</ol>

Below is a comprehensive list of intrinsically grouped elements on this site:
- `.h-alpha > .hsub`, `.h-alpha > .hsub`, etc. subheadings within a heading element
- any `ol`, `ul`, `li`, `dl`, `dt`, or `dd` inside any list element `ol`, `ul`, or `dl`
- any `thead`, `tbody`, `tfoot`, `tr`, `th`, or `td` inside any `table` element

- `.fn a`: a link inside the superscript a footnote superscript
- `blockquote:not(.prose) > cite` citations inside a non-prose blockquote ... is there a better way than this?