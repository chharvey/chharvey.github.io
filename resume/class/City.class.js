const Element    = require('extrajs-dom').Element
const HTMLElement    = require('extrajs-dom').HTMLElement
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
      console.error(`No data found for ${this.region}.`)
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
      // REVIEW INDENTATION
        return new HTMLElement('span')
          .attr({
            'data-instanceof': 'City',
            itemprop : 'location',
            itemscope: '',
            itemtype : 'http://schema.org/Place',
          })
          .addContent([
            new HTMLElement('span')
              .attr({ itemprop:'address', itemscope:'', itemtype:'http://schema.org/PostalAddress' })
              .addContent([
                new HTMLElement('span').attr('itemprop','addressLocality').addContent(this._address.addressLocality),
                `, `,
                new HTMLElement('abbr').attr('itemprop','addressRegion')
                  .attr('title', City.regionName(this._address.addressRegion))
                  .addContent(this._address.addressRegion),
              ]),
            new HTMLElement('span')
              .attr({ itemprop:'geo', itemscope:'', itemtype:'http://schema.org/GeoCoordinates' })
              .addContent([
                new HTMLElement('meta').attr('itemprop','latitude' ).attr('content',this._geo.latitude),
                new HTMLElement('meta').attr('itemprop','longitude').attr('content',this._geo.longitude),
              ]),
          ])
          .html()
    }, this)
      .addDisplay(function xCity() {
        return new HTMLElement('x-city').attr({
          locality : this._address.addressLocality,
          region   : this._address.addressRegion,
          latitude : this._geo.latitude,
          longitude: this._geo.longitude,
        }).html()
      })
  }
}

module.exports = City
