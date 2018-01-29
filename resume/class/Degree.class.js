const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs = {
  Node: require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}
const View = require('extrajs-view')

/**
 * An degree I’ve earned from a university.
 * @class
 */
class Degree {
  /**
   * @summary Construct a new Degree object.
   * @param {number} year year the degree was earned
   * @param {number} gpa grade-point-average
   * @param {string} field type and field of the degree
   */
  constructor(year, gpa, field) {
    this._year  = year
    this._gpa   = gpa
    this._field = field
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
      let frag = Degree.TEMPLATE.cloneNode(true)
      frag.querySelector('[itemprop="name"]'       ).innerHTML   = this._field
      frag.querySelector('[itemprop="ratingValue"]').textContent = this._gpa
      frag.querySelector('[itemprop="timeEarned"]' ).textContent = this._year
      if (this._year > 0) {
        frag.querySelector('.o-ListAchv__Date > small').remove()
      } else {
        frag.querySelector('[itemprop="timeEarned"]').remove()
      }
      return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
    }, this)
  }
}

/**
 * @summary The template marking up this data type.
 * @const {DocumentFragment}
 */
Degree.TEMPLATE = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-degree.tpl.html'), 'utf8'))
  .window.document.querySelector('template').content

module.exports = Degree
