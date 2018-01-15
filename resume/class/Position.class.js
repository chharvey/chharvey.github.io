const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
const HTMLUListElement = require('extrajs-dom').HTMLUListElement
const HTMLLIElement = require('extrajs-dom').HTMLLIElement
const View = require('extrajs-view')

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])


const City           = require('./City.class.js')
const GeoCoordinates = require('./GeoCoordinates.class.js')
/**
 * A working position I’ve held at an organization tht I’ve worked for.
 * @class
 */
class Position {
  /**
   * @summary Construct a new Position object.
   * @param  {!Object=} jsondata JSON object of type {@link http://schema.org/JobPosting}
   */
  constructor(jsondata) {
    this._id = jsondata.identifier
    this._name = jsondata.title

    this._org_name = jsondata.hiringOrganization.name
    this._org_type = `http://schema.org/${jsondata.hiringOrganization['@type']}`
    this._org_url  = jsondata.hiringOrganization.url || ''

    this._date_start = new Date(jsondata.$start)
    this._date_end   = (jsondata.$end) ? new Date(jsondata.$end) : new Date()

    this._location = new City(
      { locality: jsondata.jobLocation.address.addressLocality, region: (STATE_DATA.find((obj) => obj.code===jsondata.jobLocation.address.addressRegion).name), }, // TODO make region the full name
      new GeoCoordinates(jsondata.jobLocation.geo)
    )

    this._descriptions = (typeof jsondata.responsibilities === 'string') ? [jsondata.responsibilities] : jsondata.responsibilities || []
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
        return new HTMLElement('section').id(this._id).class('o-Grid__Item o-Grid__Item--maincol c-Position')
          .attr({
            'data-instanceof': 'Position',
            itemscope: '',
            itemtype : this._org_type,
          })
          .attr('itemprop', (xjs.Date.sameDate(this._date_end, new Date())) ? 'worksFor' : null)
          .addContent([
            new HTMLElement('header').class('c-Position__Head').addContent([
                new HTMLElement('h3').class('c-Position__Name h-Inline-sG -pr-1-sG').attr('itemprop','jobTitle').addContent(this._name),
                new HTMLElement('p').class('c-Position__Org h-Inline-sG h-Clearfix-sG').attr('itemprop','name').addContent([
                  new HTMLElement('a').class('c-Camo').attr({ rel:'external', href:this._org_url, itemprop:'url' }).addContent(this._org_name),
                ]),
                new HTMLElement('p').class('c-Position__Dates h-Inline')
                  .addContent([
                    new HTMLElement('time')
                      .attr('datetime', this._date_start.toISOString())
                      .addContent(xjs.Date.format(this._date_start, 'M Y')),
                    `&ndash;`,
                    new HTMLElement('time')
                      .attr('datetime', this._date_end.toISOString())
                      .addContent((xjs.Date.sameDate(this._date_end, new Date())) ? 'present' : xjs.Date.format(this._date_end, 'M Y')),
                  ]),
                new HTMLElement('p').class('c-Position__Place h-Inline')
                  .addContent(`(${this._location.view()})`),
            ]),
            new HTMLUListElement().class('c-Position__Body').addContent(
              this._descriptions.map((item) => new HTMLLIElement().addContent(item))
            ),
          ])
          .html()
    }, this)
      .addDisplay(function xPosition() {
        return new HTMLElement('x-position').attr({
          id      : this._id,
          url     : this._org_url,
          type    : this._org_type,
          start   : this._date_start.toISOString(),
          end     : this._date_end.toISOString(),
        }).addContent([
          new HTMLElement('name').addContent(this._name),
          new HTMLElement('org').addContent(this._org_name),
          this._location.view.xCity(),
          new HTMLUListElement().addContent(
            this._descriptions.map((item) => new HTMLLIElement().addContent(item))
          ),
        ]).html()
      })
  }
}

module.exports = Position
