const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const xjs = {
  Node: require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}

const View       = require('extrajs-view')
const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

/**
 * A class encoding information about a city or town’s location.
 */
class City {
  /**
   * @summary Construct a new City object.
   * @param  {!Object} jsondata JSON object of type {@link http://schema.org/Place}
   * @param  {!Object=} jsondata.address JSON object of type {@link http://schema.org/PostalAddress}
   * @param  {!Object=} jsondata.geo JSON object of type {@link http://schema.org/GeoCoordinates}
   */
  constructor(jsondata) {
    this._geo = jsondata.geo || {}
    this._address = jsondata.address || {}
  }

  /**
   * Return the full name of a State given its code.
   * @param   {string} region the region code
   * @param   {!Object=} options options for specifying the abbreviation
   * @returns {string} the full name of the region, specified by the options
   */
  static regionName(region, options = {}) {
    try {
      return STATE_DATA.find((obj) => obj.code===region).name
    } catch (e) {
      e.message = `No data found for ${region}.`
      throw e
    }
  }


  /**
   * @summary Render this city in HTML.
   * @see City.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `City#view()` - default display
     * @namespace City.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <span> marking up this city with microdata.
     * @summary Call `City#view()` to render this display.
     * @function City.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      let frag = City.TEMPLATE.cloneNode(true)
      frag.querySelector('[itemprop="addressLocality"]'  ).textContent = this._address.addressLocality
      frag.querySelector('[itemprop="latitude"]'         ).content     = this._geo.latitude
      frag.querySelector('[itemprop="longitude"]'        ).content     = this._geo.longitude
      frag.querySelector('data[itemprop="addressRegion"]').value       = this._address.addressRegion
      frag.querySelector('slot[name="region-code"]'      ).textContent = this._address.addressRegion
      frag.querySelector('slot[name="region-full"]'      ).textContent = ''
      return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
    }, this)
      /**
       * Return a <span> marking up this city with microdata, using an unabbreviated state name.
       * @summary Call `City#view.full()` to render this display.
       * @function City.VIEW.full
       * @returns {string} HTML output
       */
      .addDisplay(function full() {
        const document = new jsdom.JSDOM(this.view()).window.document
        let region_name;
        try {
          region_name = City.regionName(this._address.addressRegion)
        } catch (e) {
          console.error(e)
          region_name = ''
        }
        document.querySelector('slot[name="region-full"]').textContent = region_name
        document.querySelector('slot[name="region-code"]').remove()
        return document.body.firstElementChild.outerHTML
      })
  }
}

/**
 * @summary The template marking up this data type.
 * @const {DocumentFragment}
 */
City.TEMPLATE = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-city.tpl.html'), 'utf8'))
  .window.document.querySelector('template').content

module.exports = City
