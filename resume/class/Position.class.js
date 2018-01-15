const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs     = require('extrajs')
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
    this._date_end   = (jsondata.$end) ? new Date(jsondata.$end) : null

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
      const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-position.tpl.html'), 'utf8'))
      const document = dom.window.document
      const template = document.querySelector('template')
      let frag = template.content.cloneNode(true)
      frag.querySelector('.c-Position').setAttribute('itemtype', this._org_type)
      frag.querySelector('[itemprop="jobTitle"]').innerHTML = this._name
      frag.querySelector('[itemprop="url"]').href           = this._org_url
      frag.querySelector('[itemprop="url"]').innerHTML      = this._org_name
      frag.querySelectorAll('.c-Position__Dates > time')[0].dateTime    = this._date_start.toISOString()
      frag.querySelectorAll('.c-Position__Dates > time')[0].textContent = xjs.Date.format(this._date_start, 'M Y')
      frag.querySelector('.c-Position__Place').replaceChild((function () {
        // this._location.view.xCity()
        // TEMP
        let xCity = document.createElement('x-city')
        xCity.setAttribute('locality' , this._location._geo.locality)
        xCity.setAttribute('region'   , this._location._geo.regionAbbr())
        xCity.setAttribute('latitude' , this._location._geo.latitude)
        xCity.setAttribute('longitude', this._location._geo.longitude)
        return xCity
      }).call(this), frag.querySelector('x-city'))
      frag.querySelector('.c-Position__Body').append(...(function () {
        let item = frag.querySelector('.c-Position__Body > template').content
        return this._descriptions.map(function (desc) {
          let li = item.cloneNode(true).querySelector('li')
          li.innerHTML = desc
          return li
        })
      }).call(this))
      frag.querySelector('.c-Position__Body > template').remove()

      if (!this._date_end) {
        frag.querySelector('.c-Position').setAttribute('itemprop', 'worksFor')
        frag.querySelectorAll('.c-Position__Dates > time')[2].dateTime    = new Date().toISOString()
        frag.querySelectorAll('.c-Position__Dates > time')[1].remove()
      } else {
        frag.querySelector('.c-Position').removeAttribute('itemprop')
        frag.querySelectorAll('.c-Position__Dates > time')[1].dateTime    = this._date_end.toISOString()
        frag.querySelectorAll('.c-Position__Dates > time')[1].textContent = xjs.Date.format(this._date_end, 'M Y')
        frag.querySelectorAll('.c-Position__Dates > time')[2].remove()
      }
      return frag.querySelector('section').outerHTML
    }, this)
  }
}

module.exports = Position
