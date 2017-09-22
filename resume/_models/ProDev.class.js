const xjs = require('extrajs').Util
const Element  = require('extrajs-element')

/**
 * Professional development hours.
 * @module
 */
module.exports = class ProDev {
  /**
   * Construct a new ProDev object.
   * @param {{start:Date, end:Date}} $dates the dates the the position was held
   * @param {Date} $dates.start the start date
   * @param {Date} $dates.end the end date
   * @param {City}  $location location of the course
   * @param {number} hours number of hours
   * @param {string} name  title of the course
   * @param {string=} itemtype the value used for the event’s `itemtype` attribute
   */
  constructor($dates, $location, hours, name, itemtype = 'http://schema.org/Event') {
    this._date_start = $dates.start
    this._date_end   = $dates.end

    this._location = $location
    this._itemtype = itemtype
    this._hours = hours
    this._name = name
  }

  /**
   * Render this ProDev object in HTML.
   * Displays:
   * - `ProDev#view()` - default display
   * @return {string} HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> text, <dd> dates.
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline')
            .attr('data-instanceof','ProDev.Text')
            .attr({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
            .addElements([
              new Element('span').attr('itemprop','name').addContent(this._name),
            ])
            .addContent(`, ${this._location.view()}`)
            .addElements([
              new Element('time').attr('datetime',`PT${this._hours}H`).attr('itemprop','duration').addContent(` (${this._hours} hr)`),
            ]),
          (function () {
            let time_start = new Element('time').attr('datetime',this._date_start.toISOString()).attr('itemprop','startDate')
              .addContent(this._date_start.getUTCDate())
            if (
               this._date_start.getUTCMonth() !== this._date_end.getUTCMonth()
            || this._date_start.getFullYear() !== this._date_end.getFullYear()
            ) {
              time_start.addContent(` ${xjs.Date.format(this._date_start, 'M')}`)
            }
            if (this._date_start.getFullYear() !== this._date_end.getFullYear()) {
              time_start.addContent(`, ${this._date_start.getFullYear()}`)
            }
            let time_end = new Element('time').attr('datetime',this._date_end.toISOString()).attr('itemprop','endDate')
              .addContent(`${this._date_end.getUTCDate()} ${xjs.Date.format(this._date_end, 'M Y')}`)
            return new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
              .attr('data-instanceof','ProDev.Dates')
              .addContent(`(${time_start.html()}&ndash;${time_end.html()})`)
          }).call(this)
        )
      }).call(self)
    }
    return returned
  }
}
