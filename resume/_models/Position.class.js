var Util = require('helpers-js').Util
var Element = require('helpers-js').Element

/**
 * A working position I’ve held at an organization tht I’ve worked for.
 * @module
 */
module.exports = class Position {
  /**
   * Construct a new Position object.
   * @param {string} id the id of this job position
   * @param {Object} $info all the data
   * @param {string} $info.title the official position name
   * @param {{name:string, url:string, itemtype:string}} $info.org details of the organization
   * @param {string} $info.org.name the name of the organization; may be HTML
   * @param {string} $info.org.url the url of the organization’s homepage
   * @param {string} $info.org.itemtype the value used for the organization’s `itemtype` attribute
   * @param {{start:Date, end:Date}} $info.dates the dates the the position was held
   * @param {Date} $info.dates.start the start date
   * @param {Date} $info.dates.end the end date; use `new Date()` for present date
   * @param {City} $info.location location of the organization
   * @param {Array<string>} $info.descriptions the list of descriptions for the job position
   */
  constructor(id, $info) {
    this._id = id
    this._name = $info.title

    this._date_start = $info.dates.start
    this._date_end   = $info.dates.end

    this._location = $info.location

    this._org_name = $info.org.name
    this._org_type = $info.org.itemtype
    this._org_url  = $info.org.url

    this._descriptions = $info.descriptions
  }

  /**
   * Render this position in HTML.
   * Displays:
   * - `Position#view()` - default display
   * @return {string} HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <section> element representing this position.
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        /**
         * Return whether two dates occur on the same day.
         * @param  {Date} date1 the first date
         * @param  {Date} date2 the second date
         * @return {boolean} `true` iff both dates have the same year, same month, *and* same day (date of the month)
         */
        function sameDay(date1, date2) {
          return (date1.getFullYear() === date2.getFullYear())
            &&   (date1.getUTCMonth() === date2.getUTCMonth())
            &&   (date1.getUTCDate()  === date2.getUTCDate())
        }
        return new Element('section').id(this._id).class('o-Grid__Item o-Grid__Item--maincol c-Position')
          .attr({
            'data-instanceof': 'Position',
            itemscope: '',
            itemtype : this._org_type,
          })
          .attr('itemprop', (sameDay(this._date_end, new Date())) ? 'worksFor' : null)
          .addElements([
            new Element('header').class('c-Position__Head').addElements([
                new Element('h3').class('c-Position__Name h-Inline-sG -pr-1-sG').attr('itemprop','jobTitle').addContent(this._name),
                new Element('p').class('c-Position__Org h-Inline-sG h-Clearfix-sG').addElements([
                  new Element('a').class('c-Camo').attr({ rel:'external', href:this._org_url, itemprop:'url' }).addElements([
                    new Element('span').attr('itemprop','name').addContent(this._org_name),
                  ]),
                ]),
                new Element('p').class('c-Position__Dates h-Inline')
                  .addElements([
                    new Element('time')
                      .attr('datetime', this._date_start.toISOString())
                      .addContent(Util.Date.format(this._date_start, 'M Y')),
                  ])
                  .addContent(`&ndash;`)
                  .addElements([
                    new Element('time')
                      .attr('datetime', this._date_end.toISOString())
                      .addContent((sameDay(this._date_end, new Date())) ? 'present' : Util.Date.format(this._date_end, 'M Y')),
                  ]),
                new Element('p').class('c-Position__Place h-Inline')
                  .addContent(`(${this._location.view()})`),
            ]),
          ])
          .addContent(Element.data(this._descriptions, { attributes: { list: { class: 'c-Position__Body' } } }))
          .html()
      }).call(self)
    }
    return returned
  }
}
