var Util = require('./Util.class.js')
var Element = require('./Element.class.js')

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
    return [
      new Element('dt').class('o-ListAchv__Award h-Inline')
        .attr('data-class','ProDev.Text')
        .attrObj({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
        .addElements([
          new Element('span').attr('itemprop','name').addContent(this._name),
        ])
        .addContent(`, `)
        .addElements([
          new Element('span')
            .attrObj({ itemprop:'location', itemscope:'', itemtype:'http://schema.org/Place' })
            .addContent(this._location.html()),
          new Element('time').attr('datetime',`PT${this._hours}H`).attr('itemprop','duration').addContent(` (${this._hours} hr)`),
        ]),
      (function (self) {
        let time_start = new Element('time').attr('datetime',self._date_start.toISOString()).attr('itemprop','startDate')
          .addContent(self._date_start.getUTCDate())
        if (
           self._date_start.getUTCMonth() !== self._date_end.getUTCMonth()
        || self._date_start.getFullYear() !== self._date_end.getFullYear()
        ) {
          time_start.addContent(` ${Util.Date.FORMATS['F'](self._date_start)}`)
        }
        if (self._date_start.getFullYear() !== self._date_end.getFullYear()) {
          time_start.addContent(`, ${self._date_start.getFullYear()}`)
        }
        let time_end = new Element('time').attr('datetime',self._date_end.toISOString()).attr('itemprop','endDate')
          .addContent(`${self._date_end.getUTCDate()} ${Util.Date.FORMATS['F Y'](self._date_end)}`)
        return new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
          .attr('data-class','ProDev.Level')
          .addContent(`(${time_start.html()}&ndash;${time_end.html()})`)
      })(this)
    ].map((el) => el.html()).join('')
  }

}
