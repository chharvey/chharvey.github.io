const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element

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
   * @summary Render this ProDev object in HTML.
   * @description Displays:
   * - `ProDev#view()` - default display
   * @returns {ProDev.View} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * @extends Function
     */
    ProDev.View = class extends Function {
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> text, <dd> dates.
       * @summary Call `ProDev#view()` to render this display.
       * @returns {string} HTML output
       */
      constructor() {
        function returned() {
          // REVIEW INDENTATION
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline')
            .attr('data-instanceof','ProDev.Text')
            .attr({ itemprop:'award', itemscope:'', itemtype:this._itemtype })
            .addElements([
              new Element('span').attr('itemprop','name').addContent(this._name),
            ])
            .addContent(`, ${this._location.view()}`)
            .addElements([
              new Element('time').attr('datetime',`PT${this._pdh}H`).attr('itemprop','duration').addContent(` (${this._pdh} hr)`),
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
        }
        super(`return '${returned.call(self)}'`)
      }
    }
    return new ProDev.View()
  }
}

module.exports = ProDev
