const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs = {
  Date: require('extrajs').Date,
  Node: require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}
const View = require('extrajs-view')

const City           = require('./City.class.js')

/**
 * Professional development hours.
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
    this._name = jsondata.name
    this._itemtype = `http://schema.org/${jsondata['@type']}`
    this._date_start = jsondata.startDate ? new Date(jsondata.startDate) : new Date(null)
    this._date_end   = jsondata.endDate   ? new Date(jsondata.endDate  ) : new Date(null)
    this._location = new City(jsondata.location || {})
    this._pdh = jsondata.$pdh || 0
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
      let frag = ProDev.TEMPLATE.cloneNode(true)
      frag.querySelector('.o-ListAchv__Award').setAttribute('itemtype', this._itemtype)
      frag.querySelector('[itemprop="name"]').innerHTML = this._name
      frag.querySelector('slot[name="city"]').innerHTML = this._location.view()
      frag.querySelector('.o-ListAchv__Award > time').dateTime    = `PT${this._pdh}H`
      frag.querySelector('.o-ListAchv__Award > time').textContent = `${this._pdh} hr`
      frag.querySelector('[itemprop="startDate endDate"]').dateTime    = this._date_end.toISOString()
      frag.querySelector('[itemprop="startDate endDate"]').textContent = xjs.Date.format(this._date_end, 'j M Y')
      ;(function (dates) {
        let same_UTC_date  = this._date_start.getUTCDate () === this._date_end.getUTCDate ()
        let same_UTC_month = this._date_start.getUTCMonth() === this._date_end.getUTCMonth()
        let same_UTC_year  = this._date_start.getFullYear() === this._date_end.getFullYear()
        dates.querySelector('[itemprop="startDate"]').dateTime    = this._date_start.toISOString()
        dates.querySelector('[itemprop="startDate"]').textContent = [
          this._date_start.getUTCDate(),
          (same_UTC_month && same_UTC_year) ? '' : ` ${xjs.Date.format(this._date_start, 'M')}`,
          (same_UTC_year) ? '' : ` ${this._date_start.getFullYear()}`,
        ].join('')
        dates.querySelector('[itemprop="endDate"]').dateTime    = this._date_end.toISOString()
        dates.querySelector('[itemprop="endDate"]').textContent = xjs.Date.format(this._date_end, 'j M Y')
      }).call(this, frag.querySelectorAll('.o-ListAchv__Date')[1])
      if (xjs.Date.sameDate(this._date_start, this._date_end)) {
        frag.querySelectorAll('.o-ListAchv__Date')[1].remove()
      } else {
        frag.querySelectorAll('.o-ListAchv__Date')[0].remove()
      }
      return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
    }, this)
  }
}

/**
 * @summary The template marking up this data type.
 * @const {DocumentFragment}
 */
ProDev.TEMPLATE = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-prodev.tpl.html'), 'utf8'))
  .window.document.querySelector('template').content

module.exports = ProDev
