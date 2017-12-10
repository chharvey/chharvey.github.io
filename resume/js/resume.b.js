(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML DL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmldlistelement-htmldlistelement
 * @extends HTMLElement
 */
class HTMLDListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLDListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('dl')
  }
}

module.exports = HTMLDListElement

},{"./HTMLElement.class.js":2}],2:[function(require,module,exports){
const Element = require('../src/Element.class.js')

/**
 * Represents an HTML element.
 * @see https://www.w3.org/TR/html/dom.html#htmlelement-htmlelement
 * @extends Element
 */
class HTMLElement extends Element {
  /**
   * @summary Construct a new HTMLElement object.
   * @description The voidness of this element is automatically determined for “Void Elements” as in
   * {@link https://www.w3.org/TR/html/syntax.html#void-elements|the HTML specification}.
   * @version EXPERIMENTAL
   * @param {string} name the immutable name of the tag
   */
  constructor(name) {
    super(name, [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ].includes(name))
  }
}

module.exports = HTMLElement

},{"../src/Element.class.js":7}],3:[function(require,module,exports){
const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML LI element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmllielement-htmllielement
 * @extends HTMLElement
 */
class HTMLLIElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLLIElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('li')
  }
}

module.exports = HTMLLIElement

},{"./HTMLElement.class.js":2}],4:[function(require,module,exports){
const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML OL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends HTMLElement
 */
class HTMLOListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLOListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ol')
  }
}

module.exports = HTMLOListElement

},{"./HTMLElement.class.js":2}],5:[function(require,module,exports){
const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML UL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends HTMLElement
 */
class HTMLUListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLUListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ul')
  }
}

module.exports = HTMLUListElement

},{"./HTMLElement.class.js":2}],6:[function(require,module,exports){
module.exports = {
  Element         : require('./src/Element.class.js'),
  HTMLElement     : require('./class/HTMLElement.class.js'),
  HTMLOListElement: require('./class/HTMLOListElement.class.js'),
  HTMLUListElement: require('./class/HTMLUListElement.class.js'),
  HTMLDListElement: require('./class/HTMLDListElement.class.js'),
  HTMLLIElement   : require('./class/HTMLLIElement.class.js'),
}

},{"./class/HTMLDListElement.class.js":1,"./class/HTMLElement.class.js":2,"./class/HTMLLIElement.class.js":3,"./class/HTMLOListElement.class.js":4,"./class/HTMLUListElement.class.js":5,"./src/Element.class.js":7}],7:[function(require,module,exports){
const xjs          = require('extrajs')
const ObjectString = require('./ObjectString.class.js')
const View         = require('extrajs-view')

/**
 * Represents a DOM element.
 * @see https://www.w3.org/TR/dom/#element
 */
class Element {
  /**
   * @summary Construct a new Element object.
   * @version STABLE
   * @see https://www.w3.org/TR/html/syntax.html#void-elements
   * @param {string} name the immutable name of the tag
   * @param {boolean} is_void `true` if this element is void (has no closing tag)
   */
  constructor(name, is_void = false) {
    if (arguments.length === 1) {
      console.warn(`WARNING: Parameter \`is_void\` SHOULD be considered \`false\` by default,
        even for “void” HTML elements.
        Use \`new HTMLElement()\` for the automated “void” behavior.`)
    }
    /** @private @final */ this._NAME = name
    /** @private @final */ this._VOID = is_void || [
      // CHANGED DEPRECATED: do not rely on this functionality!
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ].includes(name)

    /**
     * All the HTML attributes of this element.
     * @private
     * @type {ObjectString}
     */
    this._attributes = new ObjectString()

    /**
     * The contents of this element.
     * If this is a void element, it must have no contents, and its tag must be self-closing.
     * @private
     * @type {?string}
     */
    this._contents = (this._VOID) ? null : ''
  }



  /**
   * Return this element’s name.
   * @version LOCKED
   * @returns {string} the name of this Element
   */
  get name() { return this._NAME }

  /**
   * @summary Return whether this element is a void element.
   * @description Void elements have no end tag, and have the
   * **nothing content model** (they must not have any contents).
   * @version LOCKED
   * @returns {boolean} `true` if this element is void; `false` otherwise
   */
  get isVoid() { return this._VOID }

  /**
   * @summary Return this element’s attributes object.
   * @description The key-value pairs of the object returned correspond to
   * the attribute-value pairs of this element.
   * @version LOCKED
   * @returns {Object<string>} an object containing the attribute-value pairs of this element
   */
  get attributes() { return this._attributes.data }

  /**
   * @summary Return the contents of this element.
   * @version LOCKED
   * @returns {?string} this element’s contents, or `null` if this is a void element
   */
  get contents() { return this._contents }

  /**
   * @summary Return this element’s styles object.
   * @description The key-value pairs of the object returned correspond to
   * the property-value pairs of this element’s css.
   * @version LOCKED
   * @returns {Object<string>} an object containing the property-value pairs of this element’s css
   */
  get styles() {
    try {
      return ObjectString.fromCssString(this.style()).data // throws an error if there is no `[style]` attribute
    } catch (e) {
      return {}
    }
  }

  /**
   * @summary Return an object containing all the `[data-*]` attribute-value pairs of this element.
   * @description Note that the keys of this object do not contain the string `'data-'`.
   * Example:
   * ```js
   * this.view.html() // returns '<span data-foo="bar" data-baz="qux" fizz="buzz"></span>'
   * this.attributes  // returns { 'data-foo':'bar', 'data-baz':'qux', fizz:'buzz' }
   * this.dataset     // returns { foo:'bar', baz:'qux' }
   * ```
   * @version LOCKED
   * @returns {Object<string>} an object containing keys and values corresponing to this element’s `[data-*]` custom attributes
   */
  get dataset() {
    let returned = new ObjectString()
    for (let i in this._attributes.data) {
      if (i.slice(0,5) === 'data-') returned.set(i.slice(5), this._attributes.data[i])
    }
    return returned.data
  }



  /**
   * NOTE: TYPE DEFINITION
   * @summary A type to provide as a value argument for setting/removing an attribute.
   * @description
   * ```json
   * {
   *   "$schema"    : "http://json-schema.org/schema#",
   *   "title"      : "Element.ValueArg",
   *   "description": "A type to provide as a value argument for setting/removing an attribute.",
   *   "type"       : ["{@link ObjectString.ValueType}", "function():{@link ObjectString.ValueType}", "null"],
   *   "oneOf"      : [
   *     { "type": "{@link ObjectString.ValueType}"           , "description": "set the attribute to an ObjectString.ValueType value" },
   *     { "type": "function():{@link ObjectString.ValueType}", "description": "call the function on `this` and then set the attribute to the result" },
   *     { "type": "null"                                     , "description": "remove the attribute altogether" }
   *   ]
   * }
   * ```
   * @typedef {?(ObjectString.ValueType|function():ObjectString.ValueType)} Element.ValueArg
   */
  /**
   * @summary Set or get attributes of this element.
   * @description
   * If the key given is a string, and the value is a non-null {@link Element.ValueArg} type,
   * then the attribute will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,`
   * then the attribute identified by the key is removed from this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the value of the attribute identified by the key.
   * If no such attribute exists, `undefined` is returned.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link Element.ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If no arguments are provided, or if the key is `''`, this method does nothing and returns `this`.
   *
   * Examples:
   * ```js
   * this.attr('itemtype', 'HTMLElement')                   // set the `[itemtype]` attribute
   * this.attr('itemscope', '')                             // set the boolean `[itemscope]` attribute
   * this.attr('itemtype')                                  // get the value of the `[itemtype]` attribute (or `undefined` if it had not been set)
   * this.attr('itemprop', null)                            // remove the `[itemprop]` attribute
   * this.attr('data-id', function () { return this.id() }) // set the `[data-id]` attribute to this element’s ID
   * this.attr({                                            // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null, // remove the `[data-id]` attribute
   * })
   * this.attr()                                            // do nothing; return `this`
   * this.attr(null)                                        // do nothing; return `this`
   * ```
   *
   * Notes:
   * - If the attribute is a **boolean attribute** and is present (such as [`checked=""`]), provide the empty string `''` as the value.
   * - Since this method returns `this`, it can be chained, e.g.,
   *   `my_elem.attr('itemscope', '').attr('itemtype','Thing').attr('itemprop', null)`.
   *   However, it may be simpler to use an object argument:
   *   `my_elem.attr({ itemscope:'', itemtype:'Thing', itemprop:null })`.
   *   Note you can also use the method {@link Element#attrStr}
   *   if you have strings and are not removing any attributes:
   *   `my_elem.attrStr('itemscope=""', 'itemtype="Thing"')`.
   *
   * @version STABLE
   * @param   {(string|?Object<Element.ValueArg>)=} attr the name of the attribute to set or get (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(Element|string)} `this` if setting an attribute, else the value of the attribute specified
   * @throws  {TypeError} if the given attribute is not a string or object
   * @throws  {TypeError} if the given attribute has been removed or not set
   */
  attr(attr = '', value, this_arg = this) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(attr)) {
      case 'null': break;
      case 'string':
        if (attr.trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.attr(attr, value.call(this_arg));
          case 'null'     : this._attributes.delete(attr); break;
          case 'undefined':
            if (xjs.Object.typeOf(this._attributes.get(attr)) === 'undefined') throw new TypeError(`Attribute '${attr}' is undefined.`);
            return this._attributes.get(attr);
          default         : this._attributes.set(attr, value); break; // string, boolean, number, infinite, NaN
        }
        break;
      case 'object': for (let i in attr) this.attr(i, attr[i]); break;
      default      : throw new TypeError('Provided attribute must be a string or object.')
    }
    return this
  }

  /**
   * @summary Add (or modify) one or more attributes, given strings.
   * @description Strings must take the form `'attribute="attr value"'`.
   * Multiple arguments may be provided.
   * This method does not remove attributes.
   *
   * Examples:
   * ```js
   * this.attr('itemprop','name').attr('itemscope','').attr('itemtype':'Person') // old
   * this.attrStr('itemprop="name"', 'itemscope=""', 'itemtype="Person"')        // new
   * this.attrStr() // do nothing; return `this`
   * ```
   * @version EXPERIMENTAL
   * @param   {...string} attr_str a string of the format `'attribute="attr value"'`
   * @returns {Element} `this`
   */
  attrStr(...attr_str) {
    attr_str.forEach((str) => this.attr(str.split('=')[0], str.split('=')[1].slice(1,-1)))
    return this
  }

  /**
   * @summary Shortcut method for setting/getting the `id` attribute of this element.
   * @description Examples:
   * ```js
   * this.id('section1') // set the [id] attribute
   * this.id(function () { return this.name }) // set the [id] attribute using a function
   * this.id(null)       // remove the [id] attribute
   * this.id('')         // remove the [id] attribute
   * this.id()           // return the value of [id]
   * ```
   * @version LOCKED
   * @param   {Element.ValueArg=} id the value to set for the `id` attribute; nonempty string
   * @returns {(Element|string)} `this` if setting the ID, else the value of the ID
   */
  id(id) {
    if (xjs.Object.typeOf(id)==='string' && id.trim()==='') return this.id(null)
    return this.attr('id', id)
  }

  /**
   * @summary Shortcut method for setting/getting the `class` attribute of this element.
   * @description Examples:
   * ```
   * this.class('o-Object c-Component') // set the [class] attribute
   * this.class(function () { return this.name }) // set the [class] attribute using a function
   * this.class(null)                   // remove the [class] attribute
   * this.class('')                     // remove the [class] attribute
   * this.class()                       // return the value of [class]
   * ```
   * @version LOCKED
   * @param   {Element.ValueArg=} class_ the value to set for the `class` attribute; nonempty string
   * @returns {(Element|string)} `this` if setting the class, else the value of the class
   */
  class(class_) {
    if (xjs.Object.typeOf(class_)==='string' && class_.trim()==='') return this.class(null)
    return this.attr('class', class_)
  }

  /**
   * @summary Append to this element’s `[class]` attribute.
   * @description When adding classes, use this method instead of {@link Element#class},
   * as the latter will overwrite the `[class]` attribute.
   * Examples:
   * ```js
   * this.addClass('o-Object c-Component') // add to the [class] attribute
   * this.addClass()                       // do nothing; return `this`
   * ```
   * @version LOCKED
   * @param   {string=} class_str the classname(s) to add, space-separated; nonempty string
   * @returns {Element} `this`
   */
  addClass(class_str = '') {
    if (class_str.trim() === '') return this
    try {
      return this.class(`${this.class()} ${class_str}`) // throws an error if there is no `[class]` attribute
    } catch (e) {
      return this.class(class_str)
    }
  }

  /**
   * @summary Remove one or more tokens from this element’s `class` attribute.
   * @description Examples:
   * ```js
   * this.removeClass('o-Object') // remove one class
   * this.removeClass('o-Object', 'c-Component') // remove multiple classes
   * this.removeClass()           // do nothing; return `this`
   * ```
   * @version LOCKED
   * @param   {...string} classname classname to remove; must not contain spaces
   * @returns {Element} `this`
   */
  removeClass(...classname) {
    try {
      return this.class((this.class())
        .split(' ')
        .filter((str) => !classname.includes(str))
        .join(' ')
      )
    } catch (e) {
      return this
    }
  }

  /**
   * @summary Shortcut method for setting/getting the `style` attribute of this element.
   * @description Examples:
   * ```js
   * this.style('background:none; font-weight:bold;')      // set the [style] attribute, with a string
   * this.style({background:'none', 'font-weight':'bold'}) // set the [style] attribute, with an object
   * this.style(function () { return 'background:none; font-weight:bold;' }) // set the [style] attribute, with a function: the function must return a string
   * this.style(null)                                      // remove the [style] attribute
   * this.style()                                          // return the value of [style], as a string
   * ```
   * @version STABLE
   * @param   {(Element.ValueArg|Object<string>)=} arg the value to set for the `style` attribute; not a number or boolean though
   * @returns {(Element|Object<string>|string=)} `this` if setting the style, else the value of the style (or `undefined` if not set)
   * @throws  {TypeError} if the given argument is a number or boolean
   */
  style(arg) {
    if (['number','infinite','boolean'].includes(xjs.Object.typeOf(arg))) throw new TypeError('Provided argument cannot be a number or boolean.')
    let returned = {
      object: function () {
        return this.attr('style', new ObjectString(arg).toCssString() || null)
      },
      string: function () {
        return this.style(ObjectString.fromCssString(arg).data)
      },
      default: function () { // function, null, undefined
        return this.attr('style', arg)
      },
    }
    return (returned[xjs.Object.typeOf(arg)] || returned.default).call(this)
  }

  /**
   * @summary Set or get css properties of this element’s inline styles (`[style]` attribute).
   *
   * @description If the key given is a string, and the value is a non-null {@link Element.ValueArg} type,
   * then the property will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,` or if the value is `''` (CHANGED!),
   * then the property identified by the key is removed from this element’s css.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the value of the property identified by the key.
   * If no such property exists, `undefined` is returned.
   * (NOTE that css properties default to the `unset` value---either `inherit` or `initial`,
   * depending on whether the property is inherited or not.)
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link Element.ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * css properties. You may use this method with a single object argument to set and/or remove
   * multiple properties (using `null` to remove).
   *
   * If no arguments are provided, or if the key is `''`, this method does nothing and returns `this`.
   *
   * Examples:
   * ```js
   * this.css('background', 'red')                       // set the `background` property
   * this.css('font-weight', '')                         // remove the `font-weight` property
   * this.css('text-align')                              // get the value of the `text-align` property (or `undefined` if it had not been set)
   * this.css('font-weight', null)                       // remove the `font-weight` property
   * this.css('color', function () { return this.id() }) // set the `color` property to this element’s ID
   * this.css({                                          // set/remove multiple attributes all at once
   *   background  : 'red',
   *   margin      : '1rem',
   *   opacity     : 0.5,
   *   visibility  : null, // remove the `visibility` property
   *   'text-align': '',   // remove the `text-align` property
   * })
   * this.css()                                          // do nothing; return `this`
   * ```
   *
   * @version STABLE
   * @param   {(string|Object<Element.ValueArg>)=} prop the name of the css property to set or get, or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @returns {(Element|string)} `this` if setting a property, else the value of the property specified
   * @throws  {TypeError} if the given property is not a string or object
   * @throws  {TypeError} if the given property has been removed or not set
   */
  css(prop = '', value) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(prop)) {
      case 'string':
        if (prop.trim() === '') break;
        /**
         * A new ObjectString representing this element’s styles.
         * @type {ObjectString}
         */
        let $styles = new ObjectString(this.styles)
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.css(prop, value.call(this));
          case 'null'     : $styles.delete(prop); break;
          case 'undefined':
            if (xjs.Object.typeOf($styles.get(prop)) === 'undefined') throw new TypeError(`Property '${prop}' is undefined.`);
            return $styles.get(prop);
          case 'string'   : if (value.trim() === '') return this.css(prop, null);
          default         : $styles.set(prop, value); break; // boolean, number, infinite, NaN
        }
        return this.style($styles.data)
      case 'object': for (let i in prop) this.css(i, prop[i]); break;
      default      : throw new TypeError('Provided property must be a string or object.')
    }
    return this
  }

  /**
   * @summary Set/get/remove a `[data-*]` custom attribute with a name and a value.
   * @description Shorthand method for <code>this.attr(`data-${name}`, value)</code>.
   * Providing no arguments does nothing and returns `this`.
   * @version LOCKED
   * @param   {(string|Object<Element.ValueArg>)=} name the suffix of the `[data-*]` attribute (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @returns {(Element|string)} `this` if setting an attribute, else the value of the attribute specified
   */
  data(name = '', value) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(name)) {
      case 'string':
        if (name.trim()==='') break;
        return this.attr(`data-${name.trim()}`, value)
      case 'object': for (let i in name) this.data(i, key[i]); break;
      default      : throw new TypeError('Provided name must be a string or object.')
    }
    return this
  }

  /**
   * NOTE: TYPE DEFINITION
   * @summary Any argument passed to {@link Element#addContent}.
   * @description
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "Element.ContentArg",
   *   "type": "object",
   *   "description": "Any argument passed to {@link Element#addContent}.",
   *   "type": ["{@link Element}", "null", "string", "array"]
   *   "items": {
   *     "type": ["{@link Element}", "null", "string"]
   *   }
   * }
   * ```
   * @typedef {(?Element|string|Array<(?Element|string)>)} Element.ContentArg
   */
  /**
   * @summary Add content to this element.
   * @description Multiple arguments may be passed, and each argument may be a (nullable) Element or a string.
   * Or, a single array of such entries may be passed as an argument.
   * @version STABLE
   * @param   {...Element.ContentArg} contents the contents to add
   * @returns {Element} `this`
   * @throws  {TypeError} if this element is void
   */
  addContent(...contents) {
    if (this.isVoid) throw new TypeError('Cannot add contents to a void element.')
    if (xjs.Object.typeOf(contents[0]) === 'array') return this.addContent(...contents[0])
    this._contents += contents.map((c) =>
      (c instanceof Element) ? c.view.html() : c
    ).join('')
    return this
  }

  /**
   * @summary Add (nullable) elements as children of this element.
   * @version DEPRECATED
   * @deprecated
   * @param   {Array<?Element>} elems array of Element objects (or `null`) to add
   * @returns {Element} `this`
   */
  addElements(elems) {
    console.warn('`Element#addElements` is DEPRECATED: use `Element#addContent` instead.')
    return this.addContent(elems)
  }

  /**
   * Render this object as a string.
   * Override {@link Object#toString}.
   * @override
   * @version EXPERIMENTAL
   * @returns {string} a string representation of this object
   */
  toString() {
    return JSON.stringify({
      name: this.name,
      void: this.isVoid,
      attributes: xjs.Object.cloneDeep(this.attributes),
      contents: this.contents,
    })
  }

  /**
   * @summary Render this element as an HTML string.
   * @description Shortcut for `this.view.html()`.
   * @version STABLE
   * @returns {string} an HTML string representing this element
   */
  html() {
    return this.view.html()
  }


  /**
   * @summary Render this DOM Element in XHTML syntax.
   * @see Element.VIEW
   * @version EXPERIMENTAL
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning XHTML output.
     * @description Available displays:
     * - `Element#view.default()` - default display
     * @namespace Element.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * @summary Call `Element#view()` to render this display.
     * @function Element.VIEW.default
     * @version STABLE
     * @returns {string} HTML output
     */
    return new View(function () { return this.toString() }, this) // TODO use `null` on extrajs-view@1.1.0
      /**
       * Return the default XHTML syntax representing this Element.
       * @summary Call `Element#view.html()` to render this display.
       * @function Element.VIEW.html
       * @version STABLE
       * @returns {string} HTML output
       */
      .addDisplay(function html() {
        if (this.isVoid) return `<${this.name}${this._attributes.toAttrString()}/>`
        return `<${this.name}${this._attributes.toAttrString()}>${this.contents}</${this.name}>`
      })
  }



  /**
   * @summary Simple shortcut function to concatenate elements.
   * @description This method calls `.view.html()` on each argument and concatenates the strings,
   * or, if a single array is given, does the same to each entry in the array.
   * `null` is allowed as an argument (or as an entry in the array).
   * If an array is given, only one array is allowed.
   * @version LOCKED
   * @param   {...?Element|Array<?Element>} elements one or more elements to output, or an array of elements
   * @returns {string} the combined HTML output of all the arguments/array entries
   */
  static concat(...elements) {
    if (xjs.Object.typeOf(elements[0]) === 'array') return Element.concat(...elements[0])
    return elements
      .filter((el) => el !== null)
      .map((el) => el.view.html()).join('')
  }

  /**
   * NOTE: TYPE DEFINITION
   * @summary A JSON object to be converted into an Element.
   * @description
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "Element.ElementJSON",
   *   "type": "object",
   *   "description": "A JSON object to be converted into an Element.",
   *   "required": ["name"],
   *   "additionalProperties": false,
   *   "properties": {
   *     "name"   : { "type": "string" , "description": "the name of the Element" },
   *     "is_void": { "type": "boolean", "defuault": false, "description": "whether the Element is void" },
   *     "attr"   : {
   *       "type": "object",
   *       "description": "the attributes of the Element",
   *       "additionalProperties": { "type": "{@link ObjectString.ValueType}" }
   *     },
   *     "content": {
   *       "type": "array",
   *       "description": "the contents of the Element",
   *       "items": {
   *         "oneOf": [{ "type": "string" }, { "$ref": "#" }]
   *       }
   *     }
   *   }
   * }
   * ```
   * @typedef  {Object} Element.ElementJSON
   * @property {string} name the name of the Element
   * @property {boolean=} is_void whether the Element is void
   * @property {Object<ObjectString.ValueType>=} attr the attributes of the Element
   * @property {Array<(Element.ElementJSON|string)>=} content the contents of the Element
   */
  /**
   * @summary Return a new Element object, given JSON data.
   * @version EXPERIMENTAL
   * @param   {Element.ElementJSON} $elem data for the Element object to construct
   * @returns {Element} a new Element object representing the given data
   */
  static fromJSON($elem) {
    return new Element($elem.name, $elem.is_void)
      .attr($elem.attr)
      .addContent(($elem.content || []).map((c) =>
        (xjs.Object.typeOf(c) === 'object') ? Element.fromJSON(c) : c
      ))
  }

  /**
   * @summary Mark up data using an HTML element.
   * @description This method returns different representations of data, depending on the argument given.
   *
   * 1. If the argument is a primitive type, then it is converted to a string and returned.
   * 2. If the argument is an array, then a `<ul>` or `<ol>` element is returned, with `<li>` items,
   *    where each item is then evaluated by this same function.
   * 3. If the argument is an object, then there are a few cases:
   *   A. If the argument is an `Element` object, then this function returns
   *      that object’s `.view.html()` value (with any added attributes specified by the options below).
   *   B. If the argument is an object and has a `.view` getter function that returns a [View](https://github.com/chharvey/extrajs-view/) object,
   *      then the view is called, optionally with any specified display and arguments.
   *   C. If the argument is a non-array, non-function, non-Element object and does not have a View,
   *      then a `<dl>` element is returned, with `<dt>` keys and `<dd>` values,
   *      where each `<dt>` displays the object’s own properties as strings, and each `<dd>` displays
   *      the property value evaluated by this same function.
   *   D. If the argument is a function, then it is converted to a string and returned.
   *
   * Optionally, an `options` argument may be supplied to enhance the data.
   * The following is an example:
   * ```js
   * let options = {
   *   ordered: true,
   *   attributes: {
   *     list:  { class: 'o-List', itemscope: '', itemtype: 'Event'},
   *     value: { class: 'o-List__Item o-List__Value', itemprop: ((true) ? 'startTime' : 'endTime') },
   *     key:   { class: `o-List__Key ${(true) ? 'truthy' : 'falsy' }`, itemprop: `${(true) ? 'name' : 'headline'}` },
   *   },
   *   options: {
   *     ordered: false,
   *     display: { name: 'speaker', args: ['keynote', 3, true] },
   *   },
   * }
   * ```
   *
   * If an Element object is given, that element’s specific attributes take precedence,
   * overwriting those given by the options, with the exception of `[class]` and `[style]`:
   * these attributes are added to those in the options.
   * ```js
   * Element.data(new Element('a').class('c-Link--mod').style({
   *   color: 'blue',
   *   'text-decoration': 'none',
   * }).attr('rel','external'), {
   *   attributes: { list: {
   *     class: 'c-Link',
   *     style: 'background: pink; text-decoration: underline;',
   *     href : '//eg.com',
   *     rel  : 'nofollow',
   *   } }
   * })
   * // returns `<a
   * //   class="c-Link c-Link--mod"
   * //   style="background:pink;text-decoration:none;color:blue"
   * //   rel="external" href="//eg.com"></a>`
   * ```
   *
   * If the object argument has a `.view` getter method, then that view is called.
   * You may provide a specific display and arguments as necessary.
   * ```js
   * let jane = new Person('Jane Doe', new Date('1975-06-13')) // assuming jane.view returns a View object
   * Element.data(jane) // returns jane.view()
   * Element.data(jane, { display: { name:'speaker' } }) // returns jane.view.speaker()
   * Element.data(jane, { display: { name:'speaker', args:['keynote',3,true] } }) // returns jane.view.speaker('keynote', 3, true)
   * ```
   *
   * This is the formal schema for the `options` parameter:
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "@param options",
   *   "type": "object",
   *   "description": "configurations for the output",
   *   "additionalProperties": false,
   *   "properties": {
   *     "ordered": {
   *       "type": "boolean",
   *       "description": "if the argument is an array, specify `true` to output an `<ol>` instead of a `<ul>`"
   *     },
   *     "display": {
   *       "type": ["object","null"],
   *       "description": "provide a display function for the argument’s view, if it exists, to render",
   *       "required": ["name"],
   *       "properties": {
   *         "name": { "type": "string", "description": "the name of the display" },
   *         "args": { "type": "array",  "description": "any arguments to pass to the display" }
   *       }
   *     },
   *     "attributes": {
   *       "type": ["object","null"],
   *       "description": "describes how to render the output elements’ attributes",
   *       "additionalProperties": false,
   *       "properties": {
   *         "list" : { "type": ["object","null"], "additionalProperties": { "type": "string" }, "description": "attributes of the list (`<ul>`, `<ol>`, or `<dl>`)" },
   *         "value": { "type": ["object","null"], "additionalProperties": { "type": "string" }, "description": "attributes of the item or value (`<li>` or `<dd>`)" },
   *         "key"  : { "type": ["object","null"], "additionalProperties": { "type": "string" }, "description": "attributes of the key (`<dt>`)" }
   *       }
   *     },
   *     "options": {
   *       "allOf": [{ "$ref": "#" }],
   *       "description": "configurations for nested items/keys/values"
   *     }
   *   }
   * }
   * ```
   *
   * @version EXPERIMENTAL
   * @param   {*} thing the data to mark up
   * @param   {!Object=} options configurations for the output
   * @param   {boolean=} options.ordered if the argument is an array, specify `true` to output an `<ol>` instead of a `<ul>`
   * @param   {?Object=} options.display if the argument has a View, specify a display to render; undefined or null: render the default display
   * @param   {string}   options.display.name the name of the display (required if options.display is given)
   * @param   {Array=}   options.display.args any arguments passed to the named display function
   * @param   {?Object<Object<string>>=} options.attributes describes how to render the output elements’ attributes
   * @param   {?Object<string>=} options.attributes.list  attributes of the list (`<ul>`, `<ol>`, or `<dl>`)
   * @param   {?Object<string>=} options.attributes.value attributes of the item or value (`<li>` or `<dd>`)
   * @param   {?Object<string>=} options.attributes.key   attributes of the key (`<dt>`)
   * @param   {!Object=} options.options configurations for nested items/keys/values
   * @returns {string} the argument rendered as an HTML element
   */
  static data(thing, options = {}) {
    let attr = {
      list: (options.attributes && options.attributes.list ) || null,
      val : (options.attributes && options.attributes.value) || null,
      key : (options.attributes && options.attributes.key  ) || null,
    }
    let returned = {
      object: function () {
        if (thing instanceof Element) {
          for (let i in attr.list) {
            try {
              thing.attr(i)
            } catch (e) {
              if (i !== 'class' && i !== 'style') thing.attr(i, attr.list[i])
            }
          }
          let classes = (attr.list && attr.list.class) || ''
          let styles  = (attr.list && attr.list.style) || ''
          try { classes = `${classes} ${thing.class()}` } catch (e) { ; }
          try { styles  = `${styles}; ${thing.style()}` } catch (e) { ; }
          return thing.class(classes).style(styles).view.html()
        }
        if (thing.view instanceof Function) { // `instanceof` will not recognize `require('extrajs-view')` as the same `View` class
          if (options.display && options.display.name) {
            return thing.view[options.display.name](...(options.display.args || []))
          } else {
            try {
              return thing.view()
            } catch (err) { // if there is no default display
              console.error(`NOTE: ${err.message}`)
              return Element.data(Object.assign({}, thing), options)
            }
          }
        } else {
          const HTMLDListElement = require('../class/HTMLDListElement.class.js')
          let returned = new HTMLDListElement().attr(attr.list)
          // REVIEW INDENTATION
        for (let i in thing) {
          returned.addContent([
            new HTMLElement('dt').attr(attr.key).addContent(i),
            new HTMLElement('dd').attr(attr.val).addContent(Element.data(thing[i], options.options)),
          ])
        }
        return returned.view.html()
        }
      },
      array: function () {
        const HTMLLIElement   = require('../class/HTMLLIElement.class.js')
        const HTMLListElement = (options.ordered) ? require('../class/HTMLOListElement.class.js')
                                                  : require('../class/HTMLUListElement.class.js')
        return new HTMLListElement().attr(attr.list).addContent(thing.map((item) =>
          new HTMLLIElement().attr(attr.val).addContent(Element.data(item, options.options))
        )).view.html()
      },
      default: function () {
        return (thing===null) ? 'null' : (thing===undefined) ? 'undefined' : thing.toString()
      },
    }
    return (returned[xjs.Object.typeOf(thing)] || returned.default).call(null)
  }
}

module.exports = Element

},{"../class/HTMLDListElement.class.js":1,"../class/HTMLLIElement.class.js":3,"../class/HTMLOListElement.class.js":4,"../class/HTMLUListElement.class.js":5,"./ObjectString.class.js":8,"extrajs":10,"extrajs-view":9}],8:[function(require,module,exports){
const xjs = require('extrajs')

/**
 * An Object that contains string values only.
 * Equivalent to @type {Object<string>}, with some added restrictions and methods.
 * @private
 */
class ObjectString {
  /**
   * NOTE: TYPE DEFINITION
   * @summary This object’s values can be any one of the following types.
   * @description
   * ```json
   * {
   *   "$schema"    : "http://json-schema.org/schema#",
   *   "title"      : "ObjectString.ValueType",
   *   "description": "This object’s values can be any one of the following types.",
   *   "type"       : ["string", "number", "boolean"],
   *   "oneOf"      : [
   *     { "type": "string" , "description": "the value is a string" },
   *     { "type": "number" , "description": "the value is a number converted to a string; may not be `NaN`" },
   *     { "type": "boolean", "description": "the value is a boolean converted to a string" }
   *   ]
   * }
   * ```
   * @typedef {(string|number|boolean)} ObjectString.ValueType
   */
  /**
   * @summary Construct a new ObjectString object.
   * @param {Object<ObjectString.ValueType>=} data the data with which to initialize this objectstring
   */
  constructor(data = {}) {
    /** @private */ this._data = (function (d) {
      let returned = {}
      for (let i in d) {
        if (i.trim() !== '') returned[i.trim()] = `${d[i]}`.trim()
      }
      return returned
    })(data)
  }



  /**
   * @summary Return a shallow clone of this object’s data.
   * @description The returned value may be modified without affecting this object.
   *
   * Example:
   * ```js
   * let a = new ObjectString({ key1: 'val1' })
   * let temp = a.data
   * temp.key2 = 'val2'
   * let b = new ObjectString(temp)
   * a.toAttrString() // ' key1="val1"'
   * b.toAttrString() // ' key1="val1" key2="val2"'
   * a.toCssString()  // 'key1:val1;'
   * b.toCssString()  // 'key1:val1;key2:val2;'
   * let c = new ObjectString(a.data)
   * c.set('key3','val3')
   * a.toAttrString() // ' key1="val1"'
   * c.toAttrString() // ' key1="val1" key3="val3"'
   * a.toCssString()  // 'key1:val1;'
   * c.toCssString()  // 'key1:val1;key3:val3;'
   * ```
   * @return {Object<string>} a shallow clone of `this._obj`
   */
  get data() {
    return xjs.Object.cloneDeep(this._data)
  }



  /**
   * @summary Set a key, or override one if it exists.
   * @description Both key and value strings will be trimmed.
   * Examples:
   * ```js
   * objstr.set('key', 'value') // set the `key` key to `'value'`
   * objstr.set('key', '')      // set the `key` key to the empty string
   * ```
   * @param {string} key the property to set; nonempty string
   * @param {ObjectString.ValueType} value the value to set
   * @return {ObjectString} `this`
   */
  set(key, value) {
    if (key.trim() === '') return this
    if (xjs.Object.typeOf(value) === 'NaN') throw new TypeError('Provided value cannot be NaN.')
    this._data[key.trim()] = `${value}`.trim()
    return this
  }

  /**
   * @summary Set a key using a function called on an object.
   * @description The function should take 0 arguments and return a string.
   * If no object is provided, the function is called on `this`.
   *
   * Examples:
   * ```js
   * obj.action('key', function () { return this.name }, someOtherObject) // set the `key` key to the name of `someOtherObject`
   * obj.action('key', function () { return this.name })                  // set the `key` key to the name of `this`
   * ```
   * @param {string} key the key to set
   * @param {function():ObjectString.ValueType} valueFn a function to call
   * @param {*=} thisarg an object on which `valueFn` is called (if not provided, `this` is used)
   * @return {ObjectString} `this`
   */
  setFn(key, valueFn, thisarg = null) {
    this.set(key, valueFn.call(thisarg || this))
  }

  /**
   * @summary Get the value of the given key, or `undefined` if it does not exist.
   * @description Examples:
   * ```js
   * objstr.get('key') // get the actual value of the `key` key (or `undefined` if it had not been set)
   * ```
   * @param  {string} key the key to get
   * @return {string=} the value of the specified key
   */
  get(key) {
    return this._data[key]
  }

  /**
   * @summary Remove the provided key.
   * @description Examples:
   * ```js
   * obj.action('key') // delete the `key` key
   * ```
   * @param  {string} key the key to delete
   * @return {ObjectString} `this`
   */
  delete(key) {
    delete this._data[key]
    return this
  }

  /**
   * @summary Convert this object into an string of html attributes.
   * @description The string is returned in the following format:
   * ` key1="val1" key2="val2" key3="val3"`.
   * @return {string} a string containing attribute-value pairs
   */
  toAttrString() {
    let returned = ''
    for (let i in this._data) {
      returned += ` ${i}="${this._data[i]}"`
    }
    return returned
  }

  /**
   * @summary Convert this object into a css-valid string.
   * @description The string is returned in the following format:
   * `key1:val1;key2:val2;key3:val3;`.
   * @return {string} a valid css string containing property-value pairs
   */
  toCssString() {
    let returned = ''
    for (let i in this._data) {
      returned += `${i}:${this._data[i]};`
    }
    return returned
  }



  /**
   * @summary Return a new ObjectString object generated from an html string.
   * @description The returned object’s keys and values correspond to
   * the attributes and values given in the provided html string.
   * @param  {string} attr_string a snippet of html containing only attributes and values
   * @return {ObjectString} a new ObjectString object with the given html attribute-value pairs
   */
  static fromAttrString(attr_string) {
    throw new Error('feature not supported yet')
  }

  /**
   * @summary Return a new ObjectString object generated from a css string.
   * @description The returned object’s keys and values correspond to
   * the properties and values given in the provided css string.
   * @param  {string} css_string a css-valid string
   * @return {ObjectString} a new ObjectString object with the given css property-value pairs
   */
  static fromCssString(css_string) {
    let returned = new ObjectString()
    css_string.split(';').map((rule) => rule.split(':')).forEach(function (rule_arr) {
      rule_arr[0] = rule_arr[0] && rule_arr[0].trim() // css property
      rule_arr[1] = rule_arr[1] && rule_arr[1].trim() // css value
      if (rule_arr[0] && rule_arr[1]) returned.set(rule_arr[0], rule_arr[1])
    })
    return returned
  }
}

module.exports = ObjectString

},{"extrajs":10}],9:[function(require,module,exports){
/**
 * @classdesc A View contains methods of displaying a data type.
 * A View object is a function that can be called, but also has custom properties
 * like an object literal does.
 *
 * Construct a new View object, taking a function acting on `data`.
 * The `this` inside the function definition refers to the data given.
 * Provide the default display by passing a function with zero parameters.
 * ```js
 * let data = { text: 'some data', id: 'my-id', value: 42 }
 * let spanview = new View(function () { return `<span>${this.text}</span>` }, data)
 * ```
 *
 * Get the default display by calling the view as a function.
 * ```js
 * spanview() // '<span>some data</span>'
 * ```
 *
 * Alternatively, you can pass `null` instead of a function to the constructor, so that
 * calling the view will call `.toString()` by default. This feature is useful
 * for static views, which do not have default displays, or if you already overrode
 * {@link Object#toString} and want to use that.
 * ```js
 * let stringview = new View(null, data)
 * stringview() // the result of `data.toString()`
 * ```
 *
 * Add more displays to a view. Displays are functions that render the data. You gave the
 * default display during construction, and you can give more optional displays,
 * with any number and type of parameters. *Each display you add must be a named function.*
 * Again, `this` refers to the data passed to the view during construction.
 * ```js
 * spanview.addDisplay(function custom1(content) { // the function name is required
 *   return `<span id="${this.id}">${content}</span>`
 * })
 * ```
 *
 * Get the display by calling the named function as an “own property” of the view.
 * ```js
 * spanview.custom1('my content is great') // '<span id="my-id">my content is great</span>'
 * ```
 *
 * You may optionally pass a `this_arg` argument, to override the behavior of `this`
 * inside the function, if you have other data you want to use.
 * ```js
 * let other_data = { text: 'other data', id: 'your-id', value: false }
 * spanview.addDisplay(function custom2(content) {
 *   return `<span id="${this.id}">${content}</span>`
 * }, other_data)
 * ```
 * (However, this should be rare, because each view should correspond to one data type.
 * If you have another data type, you should really construct a new view.)
 *
 * ```js
 * spanview.custom2('your content sucks') // '<span id="your-id">your content sucks</span>'
 * ```
 *
 * @extends Function
 */
class View extends Function {
  /**
   * @summary Construct a new View object.
   * @description Give a function serving as this view’s default display. Any `this` in the function
   * will refer to the data given.
   * Instead, you can pass `null`, which causes calling `this()` to throw a ReferenceError.
   * @version STABLE
   * @param {?function():string} fn the default display, where `this` refers to the given data;
   *                                or `null` if you do not want a default display
   * @param {*} data the data that this view displays
   */
  constructor(fn, data) {
    let returned = (fn || function () { return this.toString() }).call(data)
      .replace(/\\/g, '\\\\') // double-escape any escaped backslashes in the original string
      .replace(/`/g, '\\`')   // escape any backtick literals in the original string
    super("return `" + returned + "`")
    /** @private @final */ this._DATA = data
  }

  /**
   * @summary Adds a new method for displaying HTML output.
   * @version STABLE
   * @param   {function(?):string} fn a **named** function returning the display’s HTML output
   * @param   {*=} this_arg optionally pass in other data to use for the display
   * @returns {View} `this`
   */
  addDisplay(fn, this_arg = this._DATA) {
    this[fn.name] = function (...args) {
      return fn.call(this_arg, ...args)
    }
    return this
  }
}


module.exports = View

},{}],10:[function(require,module,exports){
/**
 * Extra JS utilites and helpers.
 * @namespace xjs
 */
module.exports = {
  Object: require('./src/Object.class.js'),
  Number: require('./src/Number.class.js'),
  Array: require('./src/Array.class.js'),
  Date: require('./src/Date.class.js'),
}

},{"./src/Array.class.js":11,"./src/Date.class.js":12,"./src/Number.class.js":13,"./src/Object.class.js":14}],11:[function(require,module,exports){
const xjs = {}
xjs.Object = require('./Object.class.js')

/**
 * @summary Additional static members for the native Array class.
 * @description Does not extend the native Array class.
 * @namespace
 */
xjs.Array = class {
  /** @private */ constructor() {}

  /**
   * @summary Test whether two arrays are “the same”.
   * @description This function uses {@link xjs.Object.is} equality on corresponding entries,
   * testing replaceability.
   *
   * “The same” means “replaceable”, that is,
   * for any deterministic function: `fn(arr1)` would return the same result as `fn(arr2)`
   * if and only if `xjs.Array.is(arr1, arr2)`.
   *
   * This method returns the same result as {@link xjs.Object.is}, but is simply faster for arrays.
   *
   * @version STABLE
   * @param   {Array} arr1 the first array
   * @param   {Array} arr2 the second array
   * @returns {boolean} `true` if corresponding elements are the same (via `xjs.Object.is()`)
   */
  static is(arr1, arr2) {
    if (Object.is(arr1, arr2)) return true
    if (arr1.length !== arr2.length) return false
    let returned = true
    for (let i = 0; i < arr1.length && returned === true; i++) {
      returned = xjs.Object.is(arr1[i], arr2[i])
    }
    // slower:
    // for (let i = 0; (i < arr1.length); i++) {
    //   returned = returned && xjs.Object.is(arr1[i], arr2[i])
    // }
    return returned
  }

  /**
   * @summary Test whether an array is a subarray of another array.
   * @description This method acts like {@link String#includes}, testing whether
   * the elements in the smaller array appear consecutively and in the same order as in the larger array.
   * In other words, if `{@link xjs.Array.is}(larger.slice(a,b), smaller)` (for some integers a and b),
   * then this method returns `true`.
   *
   * Examples:
   * ```js
   * 'twofoursix'.includes('wofo')===true
   * xjs.Array.contains([2,'w','o',4,'o','u','r',6,'i','x'], ['w','o',4,'o'])===true
   * xjs.Array.contains([2,'w','o',4,'o','u','r',6,'i','x'], ['o','u'])===true
   * xjs.Array.contains([2,'w','o',4,'o','u','r',6,'i','x'], [6,'o','u','r'])===false // not in the same order
   * xjs.Array.contains([2,'w','o',4,'o','u','r',6,'i','x'], [2,4,6])===false // not consecutive
   * ```
   *
   * @version EXPERIMENTAL
   * @param   {Array}  larger  the larger array, to test against
   * @param   {Array}  smaller the smaller array, to test
   * @returns {boolean} `true` if `smaller` is a subarray of `larger`
   * @throws  {RangeError} if the second array is larger than the first
   */
  static contains(larger, smaller) {
    if (smaller.length > larger.length) throw new RangeError('Smaller array cannot have a greater length than larger array.')
    if (xjs.Array.is(smaller, [])) return true
    let returned = false
    for (let i = 0; i < larger.length; i++) {
      if (xjs.Object.is(smaller[0], larger[i])) {
        returned = returned || xjs.Array.is(larger.slice(i, i+smaller.length), smaller)
      }
    }
    return returned
  }

  /**
   * @summary “Convert” an array, number, or string into an array. (Doesn’t really convert.)
   * @description
   * - If the argument is an array, it is returned unchanged.
   * - If the argument is a number `n`, an array of length `n`, filled with increasing integers,
   *   starting with 1, is returned. (E.g. if `n===5` then `[1,2,3,4,5]` is returned.)
   * - If the argument is a string, that string is checked as an **own property** of the given database.
   *   If the value of that property *is* a string, then *that* string is checked, and so on,
   *   until an array or number is found. If no entry is found, an empty array is returned.
   *   The default database is an empty object `{}`.
   * @version EXPERIMENTAL
   * @param   {*} arg the argument to convert
   * @param   {!Object=} database a database to check against
   * @returns {Array} an array
   */
  static toArray(arg, database = {}) {
    let returned = {
      array: function () {
        return arg
      },
      number: function () {
        let array = []
        for (let n = 1; n <= arg; n++) { array.push(n) }
        return array
      },
      string: function () {
        return xjs.Array.toArray(database[arg], database)
      },
      default: function () {
        return []
      },
    }
    return (returned[xjs.Object.typeOf(arg)] || returned.default).call(null)
  }

  /**
   * @summary Make a copy of an array, and then remove duplicate entries.
   * @description "Duplicate entries" are entries that considered "the same" by
   * the provided comparator function, or if none is given, `Object.is()`.
   * Only duplicate entries are removed; the order of non-duplicates is preserved.
   * @version STABLE
   * @param   {Array} arr an array to use
   * @param   {(function(*,*):boolean)=} comparator a function comparing elements in the array
   * @returns {Array} a new array, with duplicates removed
   */
  static removeDuplicates(arr, comparator = Object.is) {
    let returned = arr.slice()
    for (let i = 0; i < returned.length; i++) {
      for (let j = i+1; j < returned.length; j++) {
        if (comparator.call(null, returned[i], returned[j])) returned.splice(j, 1)
      }
    }
    return returned
  }
}

module.exports = xjs.Array

},{"./Object.class.js":14}],12:[function(require,module,exports){
const xjs = {}

/**
 * @summary Additional static members for the native Date class.
 * @description Does not extend the native Date class.
 * @namespace
 */
xjs.Date = class {
  /** @private */ constructor() {}

  /**
   * @summary List of full month names in English.
   * @version LOCKED
   * @type {Array<string>}
   */
  static get MONTH_NAMES() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
  }

  /**
   * @summary List of full day names in English.
   * @version LOCKED
   * @type {Array<string>}
   */
  static get DAY_NAMES() {
    return [
      'Sundary',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
  }

  /**
   * @summary Return whether two dates occur on the same day.
   * @description That is, if 'YYYY-MM-DD' of date1 equals 'YYYY-MM-DD' of date2.
   * @version STABLE
   * @param   {Date} date1 the first date
   * @param   {Date} date2 the second date
   * @returns {boolean} `true` iff both dates have the same year, same month, *and* same day (date of the month)
   */
  static sameDate(date1, date2) {
    return date1.toISOString().slice(0,10) === date2.toISOString().slice(0,10)
  }

  /**
   * @summary Format a date, using PHP-based formatting options.
   * @description The following options are supported (with examples):
   * - 'Y-m-d'     : '2017-08-05'
   * - 'j M Y'     : '5 Aug 2017'
   * - 'd F Y'     : '05 August 2017'
   * - 'l, j F, Y' : 'Friday, 5 August, 2017'
   * - 'j M'       : '5 Aug'
   * - 'M Y'       : 'Aug 2017'
   * - 'M j'       : 'Aug 5'
   * - 'M j, Y'    : 'Aug 5, 2017'
   * - 'M'         : 'Aug'
   * - 'H:i'       : '21:33'
   * - 'g:ia'      : '9:33pm'
   * - 'default'   : '2017-08-06T01:33:00.000Z' ({@link Date#toISOString})
   * @version STABLE
   * @see http://php.net/manual/en/function.date.php
   * @param   {Date} date the date to format
   * @param   {string} format one of the enumerated options listed in the description
   * @returns {string} a string representing the given date in the given format
   */
  static format(date, format) {
    const MONTHS = xjs.Date.MONTH_NAMES
    /**
     * Convert a positive number to a string, adding a leading zero if and only if it is less than 10.
     * @param  {number} n any positive number
     * @return {string} that number as a string, possibly prepended with '0'
     */
    function leadingZero(n) { return `${(n < 10) ? '0' : ''}${n}` }
    let returned = {
      'Y-m-d'    : (date) => `${date.getFullYear()}-${leadingZero(date.getUTCMonth()+1)}-${leadingZero(date.getUTCDate())}`,
      'j M Y'    : (date) => `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()].slice(0,3)} ${date.getFullYear()}`,
      'd F Y'    : (date) => `${leadingZero(date.getUTCDate())} ${MONTHS[date.getUTCMonth()]} ${date.getFullYear()}`,
      'l, j F, Y': (date) => `${xjs.Date.DAY_NAMES[date.getUTCDay()]}, ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}, ${date.getFullYear()}`,
      'j M'      : (date) => `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()].slice(0,3)}`,
      'M Y'      : (date) => `${MONTHS[date.getUTCMonth()].slice(0,3)} ${date.getFullYear()}`,
      'M j'      : (date) => `${MONTHS[date.getUTCMonth()].slice(0,3)} ${date.getUTCDate()}`,
      'M j, Y'   : (date) => `${MONTHS[date.getUTCMonth()].slice(0,3)} ${date.getUTCDate()}, ${date.getFullYear()}`,
      'M'        : (date) => `${MONTHS[date.getUTCMonth()].slice(0,3)}`,
      'H:i'      : (date) => `${(date.getHours() < 10) ? '0' : ''}${date.getHours()}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}`,
      'g:ia'     : (date) => `${(date.getHours() - 1)%12 + 1}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}${(date.getHours() < 12) ? 'am' : 'pm'}`,
      default    : (date) => date.toISOString(),
    }
    return (returned[format] || returned.default).call(null, date)
  }
}

module.exports = xjs.Date

},{}],13:[function(require,module,exports){
const xjs = {}
xjs.Object = require('./Object.class.js')

/**
 * @summary Additional static members for the native Number class.
 * @description Does not extend the native Number class.
 * @namespace
 */
xjs.Number = class {
  /** @private */ constructor() {}

  /**
   * @summary Specify the type of number given.
   * @description If the number is finite, return one of the following strings:
   * - `'integer'` : the number is an integer, that is, `num % 1 === 0`
   * - `'float'`   : the number is not an integer
   * Else, throw a `RangeError` (the argument is of the correct type but does not qualify).
   * @version STABLE
   * @param   {number} num the given number
   * @returns {string} one of the strings described above
   * @throws  {RangeError} if the given arguemnt was not a finite number
   */
  static typeOf(num) {
    if (xjs.Object.typeOf(num) === 'number') {
      return (Number.isInteger(num)) ? 'integer' : 'float'
    } else throw new RangeError('Argument must be a finite number.')
  }
}

module.exports = xjs.Number

},{"./Object.class.js":14}],14:[function(require,module,exports){
const xjs = {}

/**
 * @summary Additional static members for the native Object class.
 * @description Does not extend the native Object class.
 * @namespace
 */
xjs.Object = class {
  /** @private */ constructor() {}

  /**
   * @summary Return the type of a thing.
   * @description Similar to the `typeof` primitive operator, but more refined.
   *
   * NOTE! passing undeclared variables will throw a `ReferenceError`!
   * ```js
   * var x;          // declare `x`
   * typeof x;       // 'undefined'
   * typeof y;       // 'undefined'
   * xjs.typeOf(x);  // 'undefined'
   * xjs.typeOf(y);  // Uncaught ReferenceError: y is not defined
   * ```
   * Credit to @zaggino.
   *
   * @version STABLE
   * @see https://github.com/zaggino/z-schema/blob/bddb0b25daa0c96119e84b121d7306b1a7871594/src/Utils.js#L12
   * @param   {*} thing anything
   * @returns {string} the type of the thing
   */
  static typeOf(thing) {
    let type = typeof thing
    let returned = {
      object: function () {
        if (thing === null)       return 'null'
        if (Array.isArray(thing)) return 'array'
        return type // 'object'
      },
      number: function () {
        if (Number.isNaN(thing))     return 'NaN'
        if (!Number.isFinite(thing)) return 'infinite'
        return type // 'number'
      },
      default: function () {
        return type // 'undefined', 'boolean', 'string', 'function'
      },
    }
    return (returned[type] || returned.default).call(null)
  }

  /**
   * @summary Return the name of an object’s constructing class or function.
   * @description This method reveals the most specific class that the native `instanceof` operator would reveal.
   * This method can be passed either complex values (objects, arrays, functions) or primitive values.
   * Technically, primitives do not have constructing functions, but they can be wrapped with object constructors.
   * For example, calling `instanceOf(3)` will return `Number`, even though `3` was not constructed via the `Number` class.
   * @version EXPERIMENTAL
   * @param   {*} thing anything except `null` or `undefined`
   * @returns {string} the name of the constructing function
   * @throws  {TypeError} if `null` or `undefined` is passed
   */
  static instanceOf(thing) {
    if (thing === null || thing === undefined) throw new TypeError(`\`${thing}\` does not have a construtor.`)
    return thing.__proto__.constructor.name
  }

  /**
   * @summary Test whether two things are “the same”.
   * @description This function acts **recursively** on corresponding object values,
   * where the base case (for non-object values) is `Object.is()`.
   *
   * “The same” means “replaceable”, that is,
   * for any deterministic function: `fn(a)` would return the same result as `fn(b)` if and only if
   * `xjs.Object.is(a, b)`.
   *
   * This function is less strict than {@link Object.is}.
   * If both arguments are arrays, it is faster to use {@link xjs.Array.is}.
   *
   * @version STABLE
   * @param   {*} a the first  thing
   * @param   {*} b the second thing
   * @returns {boolean} `true` if corresponding elements are the same, or replaceable
   */
  static is(a, b) {
    xjs.Array = require('./Array.class.js')
    if (Object.is(a, b)) return true
    if (xjs.Object.typeOf(a) === 'array' && xjs.Object.typeOf(b) === 'array') return xjs.Array.is(a, b)
    return (
      xjs.Object.typeOf(a) === 'object' && xjs.Object.typeOf(b) === 'object' // both must be objects
      && Object.getOwnPropertyNames(a).length === Object.getOwnPropertyNames(b).length // both must have the same number of own properties
      && Object.getOwnPropertyNames(a).every((key) => Object.getOwnPropertyNames(b).includes(key)) // `b` must own every property in `a`
      // && Object.getOwnPropertyNames(b).every((key) => Object.getOwnPropertyNames(a).includes(key)) // `a` must own every property in `b` // unnecessary if they have the same length
      // finally, compare all the values
      && (function () {
        let r = true
        for (let i in a) {
          // r &&= xjs.Object.is(a[i], b[i]) // IDEA
          r = r && xjs.Object.is(a[i], b[i])
        }
        return r
      })()
    )
  }

  /**
   * @summary Deep freeze an object, and return the result.
   * @description If an array or object is passed,
   * **Recursively** call {@link Object.freeze} on every property and sub-property of the given parameter.
   * Else, return the given argument.
   * @version EXPERIMENTAL
   * @param   {*} thing any value to freeze
   * @returns {*} the returned value, with everything frozen
   */
  static freezeDeep(thing) {
    Object.freeze(thing)
    let action = {
      array: function () {
        thing.forEach(function (val) {
          if (!Object.isFrozen(val)) xjs.Object.freezeDeep(val)
        })
      },
      object: function () {
        for (let key in thing) {
          if (!Object.isFrozen(thing[key])) xjs.Object.freezeDeep(thing[key])
        }
      },
      default: function () {},
    }
    ;(action[xjs.Object.typeOf(thing)] || action.default).call(null)
    return thing
  }

  /**
   * @summary Deep clone an object, and return the result.
   * @description If an array or object is passed,
   * This method is **recursively** called, cloning properties and sub-properties of the given parameter.
   * The returned result is an object, that when passed with the original as arguments of {@link xjs.Object.is},
   * `true` would be returned. The new object would be “replaceable” with its cloner.
   * If a primitive value is passed, the original argument is returned.
   *
   * This method provides a deeper clone than `Object.assign()`: whereas `Object.assign()` only
   * copies the top-level properties, this method recursively clones into all sub-levels.
   *
   * ```js
   * var x = { first: 1, second: { value: 2 }, third: [1, '2', { v:3 }] }
   *
   * // Object.assign x into y:
   * var y = Object.assign({}, x) // returns { first: x.first, second: x.second, third: x.third }
   *
   * // you can reassign properties of `y` without affecting `x`:
   * y.first  = 'one'
   * y.second = 2
   * console.log(y) // returns { first: 'one', second: 2, third: x.third }
   * console.log(x) // returns { first: 1, second: { value: 2 }, third: [1, '2', { v:3 }] }
   *
   * // however you cannot mutate properties of `y` without affecting `x`:
   * y.third[0]    = 'one'
   * y.third[1]    = 2
   * y.third[2].v  = [3]
   * console.log(y) // returns { first: 'one', second: 2, third: ['one', 2, { v:[3] }] }
   * console.log(x) // returns { first: 1, second: { value: 2 }, third: ['one', 2, { v:[3] }] }
   *
   * // xjs.cloneDeep x into y:
   * var z = xjs.cloneDeep(x) // returns { first: 1, second: { value: 2 }, third: [1, '2', {v:3}] }
   *
   * // as with Object.assign, you can reassign properties of `z` without affecting `x`:
   * z.first  = 'one'
   * z.second = 2
   * console.log(z) // returns { first: 'one', second: 2, third: [1, '2', {v:3}] }
   * console.log(x) // returns { first: 1, second: { value: 2 }, third: [1, '2', { v:3 }] }
   *
   * // but unlike Object.assign, you can mutate properties of `z` without affecting `x`:
   * z.third[0]    = 'one'
   * z.third[1]    = 2
   * z.third[2].v  = [3]
   * console.log(z) // returns { first: 'one', second: 2, third: ['one', 2, { v:[3] }] }
   * console.log(x) // returns { first: 1, second: { value: 2 }, third: [1, '2', { v:3 }] }
   * ```
   *
   * @version EXPERIMENTAL
   * @param   {*} thing any value to clone
   * @returns {*} an exact copy of the given value, but with nothing equal via `==` (unless the value given is primitive)
   */
  static cloneDeep(thing) {
    let returned = {
      array: function () {
        let returned = []
        thing.forEach(function (val) {
          returned.push(xjs.Object.cloneDeep(val))
        })
        return returned
      },
      object: function () {
        let returned = {}
        for (let key in thing) {
          returned[key] = xjs.Object.cloneDeep(thing[key])
        }
        return returned
      },
      default: function () {
        return thing
      },
    }
    return (returned[xjs.Object.typeOf(thing)] || returned.default).call(null)
  }
}

module.exports = xjs.Object

},{"./Array.class.js":11}],15:[function(require,module,exports){
const Element = require('extrajs-dom').Element
const View = require('extrajs-view')

/**
 * An award I’ve earned.
 * @class
 */
class Award {
  /**
   * @summary Construct a new Award object.
   * @param {string} dates date(s) relevant to the award
   * @param {string} text  custom HTML string defining this award
   */
  constructor(dates, text) {
    this._dates = dates
    this._text  = text
  }

  /**
   * @summary Render this award in HTML.
   * @see Award.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Award#view()` - default display
     * @namespace Award.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <dt>–<dd> pair of elements:
     * <dt> award text, <dd> award dates.
     * @summary Call `Award#view()` to render this display.
     * @function Award.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      // REVIEW INDENTATION
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline').attr('data-instanceof','Award.Text').attr('itemprop','award').addContent(this._text),
          new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix').attr('data-instanceof','Award.Dates').addContent(`(${this._dates})`)
        )
    }, this)
  }
}

module.exports = Award

},{"extrajs-dom":6,"extrajs-view":9}],16:[function(require,module,exports){
const xjs   = require('extrajs')
const Award = require('../class/Award.class.js')

let vctm_summary = {
  "dates"  : "<time>2011</time>&ndash;<time>2014</time>",
  "content": [
    "<span itemscope=\"\" itemtype=\"http://schema.org/EducationalOrganization\">",
      "<abbr class=\"c-Acro\" title=\"Virginia Council of Teachers of Mathematics\" itemprop=\"name\"><span class=\"c-Acro__First\">V</span>CTM</abbr>",
      " Conferences, annually statewide (<time datetime=\"PT40H\">10 hr each</time>)",
    "</span>"
  ]
}

// copied from `Resume.class.js`:
function _content(x) { return (xjs.Object.typeOf(x) === 'array') ? x.join('') : x }
function newAward(d) { return new Award(d.dates, _content(d.content)) }
$('#prof-dev > dl > dd:nth-of-type(1)').after(newAward(vctm_summary).view())

},{"../class/Award.class.js":15,"extrajs":10}]},{},[16]);
