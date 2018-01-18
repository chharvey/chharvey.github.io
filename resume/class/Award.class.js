const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
const HTMLDListElement = require('extrajs-dom').HTMLDListElement
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
   * @param {?Array<Award>} [subs=null] any sub-awards associated with this award
   */
  constructor(dates, text, subs=null) {
    this._dates = dates
    this._text  = text
    this._subs  = subs
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
      return Element.concat(
        new HTMLElement('dt').class('o-ListAchv__Award h-Inline').attr('data-instanceof','Award.Text').attr('itemprop','award').addContent([
          this._text,
          (this._subs) ? new HTMLDListElement().class('o-ListAchv').addContent(this._subs.map((s) => s.view())) : null,
        ]),
        new HTMLElement('dd').class('o-ListAchv__Date h-Inline h-Clearfix').attr('data-instanceof','Award.Dates').addContent(`(${this._dates})`)
      )
    }, this)
      .addDisplay(function xAward() {
        return new HTMLElement('x-award').addContent([
          new HTMLElement('dates').addContent(this._dates),
          new HTMLElement('text' ).addContent(this._text),
          (this._subs) ? new HTMLDListElement().addContent(this._subs.map((s) => s.view.xAward())) : null,
        ]).html()
      })
  }
}

module.exports = Award
