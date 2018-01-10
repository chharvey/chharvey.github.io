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
          .attr('href', ({
            url      : this._DATA.url,
            email    : `mailto:${this._DATA.email}`,
            telephone: `tel:${this._DATA.telephone}`,
            default  : null,
          })[this._DATA.contactType || 'default'])
          .attr('itemprop', this._DATA.contactType || null)
          .addContent([
            new HTMLElement('div').class('c-Contact__Icon octicon').addClass(`octicon-${this._DATA.$octicon}`).attr('aria-hidden',true),
            new HTMLElement('div').addContent(this._DATA.name || this._DATA.url || this._DATA.email || this._DATA.telephone || null),
          ]).html()
    }, this)
      .addDisplay(function xContactLink() {
        return new HTMLElement('x-contactlink').attr({
          url : this._DATA.url || null,
          icon: this._DATA.octicon || null,
          prop: this._DATA.itemprop || null,
        }).addContent(this._content).html()
      })
  }
}

module.exports = ContactPoint
