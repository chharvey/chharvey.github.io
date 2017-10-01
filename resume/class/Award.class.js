const Element = require('extrajs-dom').Element

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
   * @returns {Award.View} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * @extends Function
     */
    Award.View = class extends Function {
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> award text, <dd> award dates.
       * Call `Award#view()` to render this display.
       * @returns {string} HTML output
       */
      constructor() {
        function returned() {
          // REVIEW INDENTATION
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline').attr('data-instanceof','Award.Text').attr('itemprop','award').addContent(this._text),
          new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix').attr('data-instanceof','Award.Dates').addContent(`(${this._dates})`)
        )
        }
        super(`return '${returned.call(self)}'`)
      }
    }
    return new Award.View()
  }
}
