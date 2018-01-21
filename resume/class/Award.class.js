const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs = {
  Node: require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}
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
      let frag = Award.TEMPLATE.cloneNode(true)
      frag.querySelector('slot[name="text"]' ).innerHTML = this._text
      frag.querySelector('slot[name="dates"]').innerHTML = this._dates
      ;(function (subs) {
        if (this._subs) {
          xjs.Node.empty(subs)
          subs.append(...this._subs.map((s) => s.view()))
        } else subs.remove()
      }).call(this, frag.querySelector('.o-ListAchv__Award > .o-ListAchv'))
      return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
    }, this)
  }
}

/**
 * @summary The template marking up this data type.
 * @const {DocumentFragment}
 */
Award.TEMPLATE = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-award.tpl.html'), 'utf8'))
  .window.document.querySelector('template').content

module.exports = Award
