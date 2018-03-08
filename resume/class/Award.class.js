const xjs = {
  ...require('extrajs-dom'),
}
const View = require('extrajs-view')

/**
 *
 * @class
 */
class Award {
  /**
   * @summary Construct a new Award object.
   * @param {!Object} jsondata
   */
  constructor(jsondata) {
    this._DATA = jsondata
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
      const {xAward} = require('./Resume.class.js').TEMPLATES
      return new xjs.DocumentFragment(xAward.render(this._DATA)).innerHTML()
    }, this)
  }
}

module.exports = Award
