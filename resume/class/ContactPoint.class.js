const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
const View = require('extrajs-view')

/**
 * Piece of contact information in resume.
 * @class
 */
class ContactPoint {
  /**
   * @summary Construct a new ContactPoint object.
   * @param  {!Object} jsondata JSON object of type {@link http://schema.org/ContactPoint}
   * @param  {string} jsondata.$octicon octicon CSS class of the icon
   * @param  {string=} jsondata.name display text of the link
   * @param  {string=} jsondata.contactType type of contact point
   * @param  {string=} jsondata.url url of the link
   * @param  {string=} jsondata.telephone telephone number
   * @param  {string=} jsondata.email email address
   */
  constructor(jsondata) {
    /**
     * All the data for this object.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
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
        return new HTMLElement('a').class('c-Contact__Link h-Block')
          .attr('href', this._url)
          .attr('itemprop', this._itemprop || null)
          .addContent([
            new HTMLElement('div').class('c-Contact__Icon octicon').addClass(`octicon-${this._octicon}`).attr('role','none'),
            new HTMLElement('div').addContent(this._content),
          ]).html()
    }, this)
      .addDisplay(function xContactLink() {
        return new HTMLElement('x-contactlink').attr({
          url : this._url,
          icon: this._octicon,
          prop: this._itemprop,
        }).addContent(this._content).html()
      })
  }
}

module.exports = ContactPoint
