var Util = require('helpers-js').Util
var Element = require('helpers-js').Element

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
   * Render a ProDev object in HTML.
   * @return {string} HTML string
   */
  html() {
    return Element.concat(
      new Element('dt').class('o-ListAchv__Award h-Inline')
        .attr('data-class','ProDev.Text')
        .attr({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
        .addElements([
          new Element('span').attr('itemprop','name').addContent(this._name),
        ])
        .addContent(`, ${this._location.html()}`)
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
          time_start.addContent(` ${Util.Date.format(this._date_start, 'M')}`)
        }
        if (this._date_start.getFullYear() !== this._date_end.getFullYear()) {
          time_start.addContent(`, ${this._date_start.getFullYear()}`)
        }
        let time_end = new Element('time').attr('datetime',this._date_end.toISOString()).attr('itemprop','endDate')
          .addContent(`${this._date_end.getUTCDate()} ${Util.Date.format(this._date_end, 'M Y')}`)
        return new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
          .attr('data-class','ProDev.Level')
          .addContent(`(${time_start.html()}&ndash;${time_end.html()})`)
      }).call(this)
    )
  }

}
