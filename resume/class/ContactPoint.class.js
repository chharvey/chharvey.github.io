const Element = require('extrajs-dom').Element
const View = require('extrajs-view')

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
   * @summary Render this award in HTML.
   * @see ContactPoint.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `ContactPoint#view()` - default display
     * @namespace ContactPoint.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <a.c-Contact__Link> subcomponent displaying a contact item.
     * @summary Call `ContactPoint#view()` to render this display.
     * @function ContactPoint.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      // REVIEW INDENTATION
        return new Element('a').class('c-Contact__Link h-Block')
          .attr('href', this._url)
          .attr('itemprop', this._itemprop || null)
          .addContent([
            new Element('div').class('c-Contact__Icon octicon').addClass(this._octicon).attr('role','none'),
            new Element('div').addContent(this._content),
          ]).html()
    }, this)
  }
}

module.exports = ContactPoint
