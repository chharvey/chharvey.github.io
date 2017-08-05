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
  _attrs() {
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
    return this.addContent(elems.map((elem) => elem.render()).join(''))
  }

  /**
   * Render this element as a string.
   * @return {string} an HTML string representing this element
   */
  render() {
    if (this.isVoid) return `<${this.name}${this._attrs()}/>`
    return `<${this.name}${this._attrs()}>${this.contents}</${this.name}>`
  }
}
