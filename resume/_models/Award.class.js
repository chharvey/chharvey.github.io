var Element = require('helpers-js').Element

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
   * Render an award in HTML.
   * @param {Award.Display=} display one of the output display
   * @param {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} HTML string
   */
  view(display = Award.Display.DEFAULT, ...rest) {
    let returned = {
      /**
       * Default display.
       * @return {string} HTML string
       */
      [Award.Display.DEFAULT]: function () {
        // REVIEW indentation
    return Element.concat(
      new Element('dt').class('o-ListAchv__Award h-Inline').attr('data-class','Award.Text').attr('itemprop','award').addContent(this._text),
      new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix').attr('data-class','Award.Level').addContent(`(${this._dates})`)
    )
      },
      default: function () { return this.view() },
    }
    return (returned[display] || returned.default).call(this, ...rest)
  }


  /**
   * Enum for display formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** Default display. */ DEFAULT: 'view_default',
    }
  }
}
