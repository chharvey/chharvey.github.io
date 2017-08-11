var Util = require('./Util.class.js')
var Element = require('./Element.class.js')

/**
 * A working position I’ve held at an organization tht I’ve worked for.
 * @module
 */
module.exports = class Position {
  /**
   * Construct a new Position object.
   * @param {string} id the id of this job position
   * @param {string} name the official position name
   * @param {{start:Date, end:Date}} $dates the dates the the position was held
   * @param {Date} $dates.start the start date
   * @param {Date} $dates.end the end date; use `new Date()` for present date
   * @param {City} $location location of the organization
   * @param {{name:string, url:string, itemtype:string}} $org details of the organization
   * @param {string} $org.name the name of the organization; may be HTML
   * @param {string} $org.url the url of the organization’s homepage
   * @param {string} $org.itemtype the value used for the organization’s `itemtype` attribute
   * @param {boolean} is_current `true` if I currently work here
   */
  constructor(id, name, $dates, $location, $org, is_current) {
    this._id = id
    this._name = name

    this._date_start = $dates.start
    this._date_end   = $dates.end

    this._location = $location

    this._org_name = $org.name
    this._org_type = $org.itemtype
    this._org_url  = $org.url

    this._is_current = is_current

    this._descriptions = []
  }

  /**
   * Add a description to this position.
   * @param  {string} desc the description to add
   * @param  {boolean} is_hidden `true` if hidden
   * @return {Position} `this`
   */
  addDescription(desc, is_hidden = false) {
    this._descriptions.push({ html: desc, 'is_hidden': is_hidden })
    return this
  }


  /**
   * Render an organization in HTML.
   * @return {string} HTML string
   */
  html() {
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
    let result = new Element('section').id(this._id).class('o-Grid__Item o-Grid__Item--maincol c-Position')
      .attr('itemscope','').attr('itemtype',this._org_type)
      .addElements([
        new Element('header').class('c-Position__Head').addElements([
            new Element('h3').class('c-Position__Name h-Inline-sG -pr-1-sG').attr('itemprop','jobTitle').addContent(this._name),
            new Element('p').class('c-Position__Org h-Inline-sG h-Clearfix-sG').addElements([
              new Element('a').class('c-Camo').attr('rel','external').attr('href',this._org_url).attr('itemprop','url').addElements([
                new Element('span').attr('itemprop','name').addContent(this._org_name),
              ]),
            ]),
            new Element('p').class('c-Position__Dates h-Inline')
              .addElements([
                new Element('time')
                  .attr('datetime', this._date_start.toISOString())
                  .addContent(Util.Date.FORMATS['F Y'](this._date_start)),
              ])
              .addContent(`&ndash;`)
              .addElements([
                new Element('time')
                  .attr('datetime', this._date_end.toISOString())
                  .addContent((sameDay(this._date_end, new Date())) ? 'present' : Util.Date.FORMATS['F Y'](this._date_end)),
              ]),
            new Element('p').class('c-Position__Place h-Inline')
              .attr('itemprop',"location").attr('itemscope',"").attr('itemtype',"http://schema.org/Place")
              .addContent(`(${this._location.html()})`),
        ]),
        new Element('ul').class('c-Position__Body').addElements(
          this._descriptions.map((obj) => new Element('li')
            .addClass((obj.is_hidden) ? '-d-n' : '')
            .addContent(obj.html)
          )
        ),
      ])
    if (this._is_current) result.attr('itemprop','worksFor')
    return result.render()
  }
}
