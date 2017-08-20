/**
 * Represents an HTML element and its tag in a document.
 * @module
 */
module.exports = class Element {
  /**
   * Construct a new Element object.
   * @param {string} name the immutable name of the tag
   * @param {boolean=} is_void `true` if this element is void (has no contents or closing tag)
   */
  constructor(name, is_void = false) {
    this._NAME = name
    this._VOID = is_void
    /**
     * All the HTML attributes of this element.
     * @type {Object<string>}
     */
    this._attributes = {}
    /**
     * The contents of this element.
     * If it is a
     * @type {String}
     */
    this._contents = (this._VOID) ? null : ''
  }

  /**
   * Return this element’s name.
   * @return {string} the name of this Element
   */
  get name() { return this._NAME }

  /**
   * Return whether this element is a void element.
   * Void elements have no content model (and thus no contents),
   * and also have no closing tag.
   * @return {boolean} `true` if this element is void; `false` otherwise
   */
  get isVoid() { return this._VOID }

  /**
   * Return the contents of this element.
   * @return {?string} this element’s contents, or `null` if this is a void element
   */
  get contents() { return this._contents }

  /**
   * Render this element’s attributes as a string.
   * The string is returned in the following format:
   * ` attr1="val1" attr2="val2" attr3="val3"`
   * @private
   * @return {string} string containing key-value pairs
   */
  _attributeString() {
    let out = ''
    for (let i in this._attributes) {
      if (this._attributes[i]!==undefined) out += ` ${i}="${this._attributes[i]}"`
    }
    return out
  }

  /**
   * Set or get an attribute of this element.
   *
   * If a key *and* value are provided, then the attribute name (the key)
   * will be created (or modified if it already exists), and it will be assigned the value given.
   *
   * There is one exception: If a key *and* value are provided, and the value is the primitive `null`,
   * then the attribute is removed from this element.
   * (Thus it is impossible to assign the primitive value `null` to an attribute.
   * To approximate this, provide the string `'null'`.)
   *
   * If the attribute is a **boolean attribute** and is present, provide the empty string `''` as the value.
   *
   * If only a key is provided and the value is not provided, then this method will return
   * the value of this element’s attribute named by the given key.
   * If no such attribute exists, `undefined` is returned.
   *
   * Examples:
   * To set the boolean `itemscope` attribute, call `my_elem.attr('itemscope', '')`.
   * To get the value of the `itemtype` attriute, call `my_elem.attr('itemtype')`.
   * To remove the `itemprop` attribute, call `my_elem.attr('itemprop', null)`.
   *
   * @param {string}  key the name of the attribute to set or get
   * @param {?*=} value the name of the value to set, or `null` to remove the attribute
   * @return {(Element|string)=} `this` if setting an attribute, else the value of the attribute specified
   */
  attr(key, value) {
    if (value===undefined) return this._attributes[key]
    this._attributes[key] = (value===null) ? undefined : `${value}` // convert to string without Object#toString()
    return this
  }

  /**
   * Set/remove multiple attributes at once, providing an attributes object.
   *
   * The argument must be an object who has string or null values. No values may be `undefined`.
   * The values of the argument act just like the `value` parameter in {@link Element#attr()}.
   * For example:
   *
   * `my_element.attrObj({ itemprop:'name' })` sets the attribute `[itemprop="name"]` on this element.
   * If the `[itemprop]` attribute already exists, it will be overriden to the value `"name"`.
   *
   * `my_element.attrObj({ itemprop:null })` removes the `[itemprop]` attribute altogether.
   *
   * Example:
   * ```
   * my_elem.attr('itemprop','name').attr('itemscope','').attr('itemtype':'Person') // old
   * my_elem.attrObj({ itemprop:'name', itemscope:'', itemtype:'Person' })          // new
   * ```
   *
   * @param  {Object<?string>} attr_obj the attributes object given
   * @return {Element} `this`
   */
  attrObj(attr_obj) {
    for (let i in attr_obj) { this.attr(i, attr_obj[i]) }
    return this
  }

  /**
   * Add (or modify) one or more attributes, given strings.
   * Strings must take the form `'attribute="attr value"'`.
   * Multiple arguments may be provided.
   * This method does not remove attributes.
   *
   * Example:
   * ```
   * my_elem.attr('itemprop','name').attr('itemscope','').attr('itemtype':'Person') // old
   * my_elem.attrStr('itemprop="name"', 'itemscope=""', 'itemtype="Person"')        // new
   * ```
   * @param  {string} attr_str a string of the format `'attribute="attr value"'`
   * @return {Element} `this`
   */
  attrStr(...attr_str) {
    attr_str.forEach((str) => this.attr(str.split('=')[0], str.split('=')[1].slice(1,-1)))
    return this
  }

  /**
   * Shortcut method for setting/getting the `id` attribute of this element.
   * @param  {?string=} id_str the value to set for the `id` attribute, or `null` to remove it
   * @return {(Element|string)} `this` if setting the id, else the value of the id
   */
  id(id_str) {
    return this.attr('id', id_str)
  }

  /**
   * Shortcut method for setting/getting the `class` attribute of this element.
   * @param  {?string=} class_str the value to set for the `class` attriubte, or `null` to remove it
   * @return {(Element|string)} `this` if setting the class, else the value of the class
   */
  class(class_str) {
    return this.attr('class', class_str)
  }

  /**
   * Append to this element’s `class` attribute.
   * When adding classes, use this method instead of {@link Element#class()|Element#class(...)}
   * @param  {string} class_str the classname(s) to add, space-separated
   * @return {Element} `this`
   */
  addClass(class_str) {
    return this.class(`${this.class() || ''} ${class_str}`)
  }

  /**
   * Remove a single token from this element’s `class` attribute.
   * @param  {string} classname classname to remove; must not contain spaces
   * @return {Element} `this`
   */
  removeClass(classname) {
    let classes = (this.class() || '').split(' ')
    let index = classes.indexOf(classname)
    if (index >= 0) classes.splice(index, 1)
    return this.class(classes.join(' '))
  }

  /**
   * Shortcut method for setting/getting the `style` attribute of this element.
   * @param  {?string=} style_str the value to set for the `style` attriubte (as valid CSS), or `null` to remove it
   * @return {(Element|string)} `this` if setting the style, else the value of the style
   */
  style(style_str) {
    return this.attr('style', style_str)
  }

  /**
   * Shortcut method for setting/getting the `style` attribute of this element,
   * where the I/O of this method is an *Object* instead of a string.
   * @param  {?Object<string>=} style_obj the properties to set for the `style` attribute, or `null` to remove it
   * @return {(Element|Object<string>)} `this` if setting the style, else the value of the style as an object
   */
  styleObj(style_obj) {
    if (style_obj !== undefined) {
      if (style_obj !== null) {
        let css_string = ''
        for (let i in style_obj) {
          css_string += `${i}:${style_obj[i]};`
        }
        return this.attr('style', css_string)
      } else return this.attr('style', null)
    } else {
      let css_object = {}
      ;(this.attr('style') || '').split(';').map((rule) => rule.split(':')).forEach(function (rule_arr) {
        // rule_arr[0] == css property
        // rule_arr[1] == css value
        if (rule_arr[0] && rule_arr[1]) css_object[rule_arr[0]] = rule_arr[1]
      })
      return css_object
    }
  }

  /**
   * Append to this element’s `style` attribute.
   * @param {string} style_str the style(s) to add, as valid CSS
   * @return {Element} `this`
   */
  addStyle(style_str) {
    return this.style(`${this.style() || ''}; ${style_str}`)
  }

  /**
   * Append to this element’s `style` attribute, using an object as an argument.
   * @param {Object<string>} style_obj the style(s) to add, as an object
   * @return {Element} `this`
   */
  addStyleObj(style_obj) {
    return this.addStyle(new Element('html').styleObj(style_obj).style())
    // alternate implementation:
    Object.assign(this.styleObj(), style_obj)
    return this
    // even another implementation, if you prefer a "pure" (nondestructive) function:
    return this.styleObj(Object.assign({}, this.styleObj(), style_obj))
  }

  /**
   * Remove a single CSS rule from this element’s `style` attribute.
   * @param  {string} cssprop single CSS property name
   * @return {Element} `this`
   */
  removeStyleProp(cssprop) {
    delete this.styleObj()[cssprop]
    return this
  }

  /**
   * Add content to this element.
   * **May not be called on elements that are void!**
   * @param {string} contents the contents to add
   * @return {Element} `this`
   */
  addContent(contents) {
    if (this.isVoid) throw new Error('Cannot add contents to a void element.')
    this._contents += contents
    return this
  }

  /**
   * Add elements as children of this element.
   * @param {Array<Element>} elems array of Element objects to add
   */
  addElements(elems) {
    return this.addContent(elems.map((el) => el.html()).join(''))
  }

  /**
   * Render this element as an HTML string.
   * @return {string} an HTML string representing this element
   */
  html() {
    if (this.isVoid) return `<${this.name}${this._attributeString()}/>`
    return `<${this.name}${this._attributeString()}>${this.contents}</${this.name}>`
  }
}
