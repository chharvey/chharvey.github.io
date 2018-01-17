const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
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
      return Element.concat([
        new HTMLElement('dt').class('o-ListAchv__Award h-Inline')
          .attr('data-instanceof','ProDev.Text')
          .attr({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
          .addContent([
            new HTMLElement('span').attr('itemprop','name').addContent(this._name),
            `, ${this._location.view()} (`,
            new HTMLElement('time').attr('datetime',`PT${this._pdh}H`).attr('itemprop','duration').addContent(`${this._pdh} hr`),
            `)`,
          ]),
        new HTMLElement('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
          .attr('data-instanceof','ProDev.Dates')
          .addContent((function () {
            if (xjs.Date.sameDate(this._date_start, this._date_end)) {
              return [
              `(`,
              new HTMLElement('time').attr({ datetime:this._date_end.toISOString(), itemprop:'startDate endDate' })
                .addContent(xjs.Date.format(this._date_end, 'j M Y')),
              `)`,
              ]
            }
            let same_UTC_date  = this._date_start.getUTCDate()  === this._date_end.getUTCDate()
            let same_UTC_month = this._date_start.getUTCMonth() === this._date_end.getUTCMonth()
            let same_UTC_year  = this._date_start.getFullYear() === this._date_end.getFullYear()
            return [
              `(`,
              new HTMLElement('time').attr({ datetime:this._date_start.toISOString(), itemprop:'startDate' }).addContent([
                this._date_start.getUTCDate(),
                (same_UTC_month && same_UTC_year) ? '' : ` ${xjs.Date.format(this._date_start, 'M')}`,
                (same_UTC_year) ? '' : ` ${this._date_start.getFullYear()}`,
              ]),
              '&ndash;',
              new HTMLElement('time').attr({ datetime:this._date_end.toISOString(), itemprop:'endDate' })
                .addContent(xjs.Date.format(this._date_end, 'j M Y')),
              `)`,
            ]
          }).call(this)),
      ])
    }, this)
      .addDisplay(function xProDev() {
        return new HTMLElement('x-prodev').attr({
          type : this._itemtype,
          start: this._date_start.toISOString(),
          end  : this._date_end.toISOString(),
          pdh  : this._pdh
        }).addContent([
          new HTMLElement('name').addContent(this._name),
          this._location.view(),
        ]).html()
      })
  }
}

module.exports = ProDev
