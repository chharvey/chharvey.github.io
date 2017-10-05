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
