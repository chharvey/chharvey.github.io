const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const View = require('extrajs-view')

/**
 * Professional development hours.
 * @class
 */
class ProDev {
  /**
   * @summary Construct a new ProDev object.
   * @param {{start:Date, end:Date}} $dates the dates the the position was held
   * @param {Date} $dates.start the start date
   * @param {Date} $dates.end the end date
   * @param {City}  $location location of the course
   * @param {number} pdh the number of professional development hours
   * @param {string} name  title of the course
   * @param {string=} itemtype the value used for the event’s `itemtype` attribute
   */
  constructor($dates, $location, pdh, name, itemtype = 'http://schema.org/Event') {
    this._date_start = $dates.start
    this._date_end   = $dates.end

    this._location = $location
    this._itemtype = itemtype
    this._pdh = pdh
    this._name = name
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
        new Element('dt').class('o-ListAchv__Award h-Inline')
          .attr('data-instanceof','ProDev.Text')
          .attr({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
          .addContent([
            new Element('span').attr('itemprop','name').addContent(this._name),
            `, ${this._location.view()} (`,
            new Element('time').attr('datetime',`PT${this._pdh}H`).attr('itemprop','duration').addContent(`${this._pdh} hr`),
            `)`
          ]),
        new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
          .attr('data-instanceof','ProDev.Dates')
          .addContent((function () {
            if (xjs.Date.sameDate(this._date_start, this._date_end)) {
              return `(${new Element('time').attr({ datetime:this._date_end.toISOString(), itemprop:'startDate endDate' })
                .addContent(xjs.Date.format(this._date_end, 'j M Y')).html()})`
            }
            let same_UTC_date  = this._date_start.getUTCDate()  === this._date_end.getUTCDate()
            let same_UTC_month = this._date_start.getUTCMonth() === this._date_end.getUTCMonth()
            let same_UTC_year  = this._date_start.getFullYear() === this._date_end.getFullYear()
            return [
              `(`,
              new Element('time').attr({ datetime:this._date_start.toISOString(), itemprop:'startDate' }).addContent([
                this._date_start.getUTCDate(),
                (same_UTC_month && same_UTC_year) ? '' : ` ${xjs.Date.format(this._date_start, 'M')}`,
                (same_UTC_year) ? '' : ` ${this._date_start.getFullYear()}`
              ]),
              '&ndash;',
              new Element('time').attr({ datetime:this._date_end.toISOString(), itemprop:'endDate' })
                .addContent(xjs.Date.format(this._date_end, 'j M Y')),
              `)`,
            ]
          }).call(this)),
      ])
    }, this)
  }
}

module.exports = ProDev
