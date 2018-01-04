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
   * @param  {!Object} $address the names of the address
   * @param  {GeoCoordinates} $geo the geo-coordinates
   */
  constructor($address, $geo) {
    this._geo = $geo
    this._geo.address = $address
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
                new HTMLElement('span').attr('itemprop','addressLocality').addContent(this._geo.locality),
                `, `,
                new HTMLElement('abbr').attr('itemprop','addressRegion')
                  .attr('title', this._geo.region)
                  .addContent(this._geo.regionAbbr()),
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
          locality : this._geo.locality,
          region   : this._geo.regionAbbr(),
          latitude : this._geo.latitude,
          longitude: this._geo.longitude,
        }).html()
      })
  }
}

module.exports = City
