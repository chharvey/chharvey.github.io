const Element = require('extrajs-dom').Element
const Util   = require('../_models/Util.class.js')

/**
 * A class encoding information about a city or town’s location.
 * @module
 */
module.exports = class City {
  /**
   * Construct a new City object.
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
   * Render this city in HTML.
   * Displays:
   * - `City#view()` - default display
   * @returns {City.View} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * @extends Function
     */
    City.View = class extends Function {
      /**
       * Default display. Takes no arguments.
       * Return a <span> marking up this city with microdata.
       * Call `City#view()` to render this display.
       * @returns {string} HTML output
       */
      constructor() {
        function returned() {
          // REVIEW INDENTATION
        return new Element('span')
          .attr({
            'data-instanceof': 'City',
            itemprop : 'location',
            itemscope: '',
            itemtype : 'http://schema.org/Place',
          })
          .addElements([
            new Element('span')
              .attr({ itemprop:'address', itemscope:'', itemtype:'http://schema.org/PostalAddress' })
              .addElements([new Element('span').attr('itemprop','addressLocality').addContent(this._locality)])
              .addContent(`, `)
              .addElements([
                new Element('abbr').attr('itemprop','addressRegion')
                  .attr('title',Util.STATE_DATA.find((obj) => obj.code===this._region).name)
                  .addContent(this._region),
              ]),
            new Element('span')
              .attr({ itemprop:'geo', itemscope:'', itemtype:'http://schema.org/GeoCoordinates' })
              .addElements([
                new Element('meta').attr('itemprop','latitude' ).attr('content',this._latitude),
                new Element('meta').attr('itemprop','longitude').attr('content',this._longitude),
              ]),
          ])
          .html()
        }
        super(`return '${returned.call(self)}'`)
      }
    }
    return new City.View()
  }
}
