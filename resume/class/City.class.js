const Element    = require('extrajs-dom').Element
const HTMLElement    = require('extrajs-dom').HTMLElement
const View       = require('extrajs-view')
const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

/**
 * A class encoding information about a city or town’s location.
 * @class
 */
class City {
  /**
   * @summary Construct a new City object.
   * @param  {string} locality the city/town name
   * @param  {string} region the state/province postal code (e.g. 'NY', 'CA')
   * @param  {{lat:number, lon:number}} $geo the geo-coordinates
   * @param  {number} $geo.lat the latitude, in decimal degrees
   * @param  {number} $geo.lon the longitude, in decimal degrees
   */
  constructor(locality, region, $geo) {
    this._locality  = locality
    this._region    = region
    this._latitude  = $geo.lat
    this._longitude = $geo.lon
  }

  /**
   * @summary Render this award in HTML.
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
                new HTMLElement('span').attr('itemprop','addressLocality').addContent(this._locality),
                `, `,
                new HTMLElement('abbr').attr('itemprop','addressRegion')
                  .attr('title', STATE_DATA.find((obj) => obj.code===this._region).name)
                  .addContent(this._region),
              ]),
            new HTMLElement('span')
              .attr({ itemprop:'geo', itemscope:'', itemtype:'http://schema.org/GeoCoordinates' })
              .addContent([
                new HTMLElement('meta').attr('itemprop','latitude' ).attr('content',this._latitude),
                new HTMLElement('meta').attr('itemprop','longitude').attr('content',this._longitude),
              ]),
          ])
          .html()
    }, this)
      .addDisplay(function xCity() {
        return new Element('x-city').attr({
          locality : this._locality,
          region   : this._region,
          latitude : this._latitude,
          longitude: this._longitude,
        })
      })
  }
}

module.exports = City
