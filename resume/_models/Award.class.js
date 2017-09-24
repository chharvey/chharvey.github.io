const Element = require('extrajs-element')

/**
 * An award I’ve earned.
 * @module
 */
module.exports = class Award {
  /**
   * Construct a new Award object.
   * @param {string} dates date(s) relevant to the award
   * @param {string} text  custom HTML string defining this award
   */
  constructor(dates, text) {
    this._dates = dates
    this._text  = text
  }

  /**
   * Render this award in HTML.
   * Displays:
   * - `Award#view()` - default display
   * @return {string} HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> award text, <dd> award dates.
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline').attr('data-instanceof','Award.Text').attr('itemprop','award').addContent(this._text),
          new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix').attr('data-instanceof','Award.Dates').addContent(`(${this._dates})`)
        )
      }).call(self)
    }
    return returned
  }
}
