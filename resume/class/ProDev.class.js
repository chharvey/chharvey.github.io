const xjs = {
  ...require('extrajs-dom'),
}
const View = require('extrajs-view')


/**
 * @class
 */
class ProDev {
  /**
   * @summary Construct a new ProDev object.
   * @param {!Object} jsondata JSON object of type {@link http://schema.org/Event}
   * @param {string=} jsondata.startDate The start date and time of the item (in ISO 8601 date format).
   * @param {string=} jsondata.endDate The end date and time of the item (in ISO 8601 date format).
   * @param {!Object=} jsondata.location The location of for example where the event is happening, an organization is located, or where an action takes place.
   * @param {number} jsondata.$pdh the number of professional development hours
   */
  constructor(jsondata) {
    this._DATA = jsondata
  }

  /**
   * @summary Render this award in HTML.
   * @see ProDev.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `ProDev#view()` - default display
     * @namespace ProDev.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <dt>–<dd> pair of elements:
     * <dt> text, <dd> dates.
     * @summary Call `ProDev#view()` to render this display.
     * @function ProDev.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      const {xProdev} = require('./Resume.class.js').TEMPLATES
      return new xjs.DocumentFragment(xProdev.render(this._DATA)).innerHTML()
    }, this)
  }
}

module.exports = ProDev
