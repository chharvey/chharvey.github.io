const Element = require('extrajs-dom').Element

/**
 * Piece of contact information in resume.
 * @class
 */
class ContactPoint {
  /**
   * @summary Construct a new ContactPoint object.
   * @param  {string} url url of the link
   * @param  {string} octicon octicon CSS class of the icon
   * @param  {string} content text content of the link
   * @param  {string=} itemprop itemprop Microdata of the contact point
   */
  constructor(url, octicon, content, itemprop = '') {
    this._url      = url
    this._octicon  = octicon
    this._content  = content
    this._itemprop = itemprop
  }

  /**
   * @summary Render this contact point in HTML.
   * @description Displays:
   * - `ContactPoint#view()` - default display
   * @returns {ContactPoint.View} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * @extends Function
     */
    ContactPoint.View = class extends Function {
      /**
       * Default display. Takes no arguments.
       * Return a <a.c-Contact__Link> subcomponent displaying a contact item.
       * @summary Call `ContactPoint#view()` to render this display.
       * @returns {string} HTML output
       */
      constructor() {
        function returned() {
          // REVIEW INDENTATION
        return new Element('a').class('c-Contact__Link h-Block')
          .attr('href', this._url)
          .attr('itemprop', this._itemprop || null)
          .addElements([
            new Element('div').class('c-Contact__Icon octicon').addClass(this._octicon).attr('role','none'),
            new Element('div').addContent(this._content),
          ]).html()
        }
        super(`return '${returned.call(self)}'`)
      }
    }
    return new ContactPoint.View()
  }
}

module.exports = ContactPoint
