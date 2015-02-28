<dl>
  <dt>relevant order</dt>
  <dd>changing the order of the objects would change the outcome or semantics of the containing object</dd>
 <dt>irrelevant order</dt>
 <dd>changing the order of the objects would <em>not</em> change the outcome or semantics of the containing object</dd>
</dl>

# Ordered and Unordered Lists

If the order matters (i.e., changing the order changes the meaning of the list or changes the result), then it should be an ordered list. If not, it should be unordered.

A grocery list should be unordered, *unless* it is written in order of priority. A recipe is my favorite example of an ordered list because changing the order of steps could result in one effed up cake.

## Named list items ##

The order of the list may be irrelevant, yet one may want to refer to a particular list item.

For example, on a grocery list, "see the third bullet" sounds less elegant than "see number 3" (Eggs). Ideally, the items' names should *not* be connected to the order in which they appear, because changing the order of the items changes the name of the third item, for example. So "Eggs" is not necessarily always number 3.

Clearly, in an ordered list, we already have a solution. The order of the items is relevant, and we still have a robust naming system. Yes, changing the order changes the name of number 3, but now we have a "different" list so it's okay. Step 3 is now different, but its' okay since the steps are rearranged.

**But with unordered lists whose items need to be named, we need to come up with a new naming convention...**

Note: Any list *can* be made into an ordered list, as long as a (maybe arbitrary) specification is given. Whether it *should*, is a different story. (Read [the lexicographical ordering of the complex numbers](http://www.cut-the-knot.org/do_you_know/complex_compare.shtml).)

# Association Lists

An association list (`dl`) contains at least 0 term-description groups. A single **term-description group** consists of at least 1 term (`dt`) followed by at least 1 description (`dd`).

The order of the term-description groups is *irrelevant* by default. There is no standardized way to make them ordered, but authors may specify that **the order of *term-description groups* is *relevant*** by using the `dl[data-*]` attribute. This does not, however, change the order of terms or descriptions within a particular term-description group. Those are *order-irrelevant* by default.

## Terms

If there are multiple `dt` Elements in a particular term-description group, the order of terms is *irrelevant*, and these terms are *alternative* such that either term or multiple terms, *but possibly not all* terms, are related to the description(s) in the same group.

If authors want *all* terms to apply to a value in one term-description group, they must use a single `dt` Element containing only and exactly 1 `ul` or `ol` Element, whose `li` children correspond to the terms. A `dt > ul:only-child` indicates that the terms in the term-description group are *unordered* (the default behavior, except that *all* terms are applicable). A `dt > ol:only-child` indicates that the terms are *ordered*.

There are two term-description groups in the association list below. In the first, there are two alternative terms and one description. It is not necessary to use both terms. In the second group, there is one `dt` with two terms listed, and one description. Both of these terms apply to the description.

    <dl>
        <dt>color</dt>
        <dt>colour</dt>
        <dd>the property of producing a sensation on the eye as a result of reflecting or emitting light</dd>
        <dt>
            <ul>
                <li>elephant</li>
                <li>hippopotamus</li>
            </ul>
        </dt>
        <dd>grey animals</dd>
    </dl>

## Descriptions

If there are multiple `dd` Elements in a particular group, the order of descriptions is also *irrelevant*, and the descriptions are *alternative* such that either or multiple, but *possibly not all*, descriptions are related to the terms(s) in the same group.

If authors want *all* values to apply to a name in one term-description group, they must use a single `dd` Element containing only and exactly 1 `ul` or `ol` Element, whose `li` children correspond to the descriptions.

    <dl>
        <dt>lead</dt>
        <dd>the chemical element with atomic number 82</dd>
        <dd>a blank space between lines of print</dd>
        <dt>elephants</dt>
        <dd>
            <ul>
                <li>are grey</li>
                <li>have long trunks</li>
                <li>never forget</li>
            </ul>
        </dd>
    </dl>
