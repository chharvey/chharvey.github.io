const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const View = require('extrajs-view')

/**
 * A working position I’ve held at an organization tht I’ve worked for.
 * @class
 */
class Position {
  /**
   * @summary Construct a new Position object.
   * @param {string} id the id of this job position
   * @param {Object} $info all the data
   * @param {string} $info.title the official position name
   * @param {{name:string, url:string, itemtype:string}} $info.org details of the organization
   * @param {string} $info.org.name the name of the organization; may be HTML
   * @param {string} $info.org.url the url of the organization’s homepage
   * @param {string} $info.org.itemtype the value of the organization’s `itemtype` attribute
   * @param {{start:Date, end:Date}} $info.dates the dates the the position was held
   * @param {Date} $info.dates.start the start date
   * @param {Date} $info.dates.end the end date; use `new Date()` for present date
   * @param {City} $info.location location of the organization
   * @param {Array<string>} $info.descriptions the list of descriptions for the job position
   */
  constructor(id, $info) {
    this._id = id
    this._name = $info.title

    this._org_name = $info.org.name
    this._org_type = $info.org.itemtype
    this._org_url  = $info.org.url

    this._date_start = $info.dates.start
    this._date_end   = $info.dates.end

    this._location = $info.location

    this._descriptions = $info.descriptions
  }

  /**
   * @summary Render this award in HTML.
   * @see Position.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Position#view()` - default display
     * @namespace Position.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <section> element representing this position.
     * @summary Call `Position#view()` to render this display.
     * @function Position.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      // REVIEW INDENTATION
        return new Element('section').id(this._id).class('o-Grid__Item o-Grid__Item--maincol c-Position')
          .attr({
            'data-instanceof': 'Position',
            itemscope: '',
            itemtype : this._org_type,
          })
          .attr('itemprop', (xjs.Date.sameDate(this._date_end, new Date())) ? 'worksFor' : null)
          .addContent([
            new Element('header').class('c-Position__Head').addContent([
                new Element('h3').class('c-Position__Name h-Inline-sG -pr-1-sG').attr('itemprop','jobTitle').addContent(this._name),
                new Element('p').class('c-Position__Org h-Inline-sG h-Clearfix-sG').addContent([
                  new Element('a').class('c-Camo').attr({ rel:'external', href:this._org_url, itemprop:'url' }).addContent([
                    new Element('span').attr('itemprop','name').addContent(this._org_name),
                  ]),
                ]),
                new Element('p').class('c-Position__Dates h-Inline')
                  .addContent([
                    new Element('time')
                      .attr('datetime', this._date_start.toISOString())
                      .addContent(xjs.Date.format(this._date_start, 'M Y')),
                    `&ndash;`,
                    new Element('time')
                      .attr('datetime', this._date_end.toISOString())
                      .addContent((xjs.Date.sameDate(this._date_end, new Date())) ? 'present' : xjs.Date.format(this._date_end, 'M Y')),
                  ]),
                new Element('p').class('c-Position__Place h-Inline')
                  .addContent(`(${this._location.view()})`),
            ]),
            Element.data(this._descriptions, { attributes: { list: { class: 'c-Position__Body' } } }),
          ])
          .html()
    }, this)
  }
}

module.exports = Position
