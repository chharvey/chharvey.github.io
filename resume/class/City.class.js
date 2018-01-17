const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

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
      var options = {} // TODO make this a parameter
      const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-city.tpl.html'), 'utf8'))
      const document = dom.window.document
      const template = document.querySelector('template')
      let frag = template.content.cloneNode(true)
      frag.querySelector('[itemprop="addressLocality"]'  ).textContent = this._address.addressLocality
      frag.querySelector('[itemprop="latitude"]'         ).content     = this._geo.latitude
      frag.querySelector('[itemprop="longitude"]'        ).content     = this._geo.longitude
      frag.querySelector('data[itemprop="addressRegion"]').value       = this._address.addressRegion
      frag.querySelector('slot[name="region-code"]'      ).textContent = this._address.addressRegion

      if (options.expandRegion) {
        let region_name;
        try {
          region_name = City.regionName(this._address.addressRegion)
        } catch (e) {
          console.error(e)
          region_name = ''
        }
        return region_name
        frag.querySelector('slot[name="region-full"]').textContent = region_name
        frag.querySelector('slot[name="region-code"]').remove()
      } else {
        frag.querySelector('slot[name="region-full"]').remove()
      }

      return frag.firstElementChild.outerHTML
    }, this)
      // .addDisplay(function xCity() {
      //   return new HTMLElement('x-city').attr({
      //     locality : this._address.addressLocality,
      //     region   : this._address.addressRegion,
      //     latitude : this._geo.latitude,
      //     longitude: this._geo.longitude,
      //   }).html()
      // })
  }
}

module.exports = City
