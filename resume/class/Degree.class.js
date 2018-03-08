const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs = {
  Node: require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}
const View = require('extrajs-view')

/**
 * @class
 */
class Degree {
  /**
   * @summary Construct a new Degree object.
   * @param {!Object} jsondata
   */
  constructor(jsondata) {
    this._DATA = jsondata
  }

  /**
   * @summary Render this award in HTML.
   * @see Degree.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Degree#view()` - default display
     * @namespace Degree.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <dt>–<dd> pair of elements:
     * <dt> degree text, <dd> degree year.
     * @summary Call `Degree#view()` to render this display.
     * @function Degree.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      const {xDegree} = require('./Resume.class.js').TEMPLATES
      return new xjs.DocumentFragment(xDegree.render(this._DATA)).innerHTML()
    }, this)
  }
}

module.exports = Degree
