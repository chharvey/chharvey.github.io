var Element = require('helpers-js').Element
var Util = require('./Util.class.js')

/**
 * A class encoding information about a city or town’s location.
 * @module
 */
module.exports = class City {
  /**
   * Construct a new City object.
   * @param  {string} locality the city/town name
   * @param  {string} region the state/province postal code (e.g. 'NY', 'CA')
   * @param  {{lat:number, lon:number}} geo the geo-coordinates
   * @param  {number} geo.lat the latitude, in decimal degrees
   * @param  {number} geo.lon the longitude, in decimal degrees
   */
  constructor(locality, region, geo) {
    this._locality  = locality
    this._region    = region
    this._latitude  = geo.lat
    this._longitude = geo.lon
  }

  /**
   * Render a city in HTML.
   * @param {City.Display=} display one of the output display
   * @param {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} HTML string
   */
  view(display = City.Display.DEFAULT, ...rest) {
    let returned = {
      /**
       * Default display.
       * @return {string} HTML string
       */
      [City.Display.DEFAULT]: function () {
        // REVIEW indentation
    return new Element('span')
      .attr({
        'data-class': 'City',
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
            // new Element('meta').attr('itemprop','latitude' ).attr('content',this._latitude),
            // new Element('meta').attr('itemprop','longitude').attr('content',this._longitude),
            new Element('meta').attr('itemprop','latitude' ).attr('content',`${this._latitude}`),
            new Element('meta').attr('itemprop','longitude').attr('content',`${this._longitude}`),
          ]),
      ])
      .html()
      },
      default: function () { return this.view() },
    }
    return (returned[display] || returned.default).call(this, ...rest)
  }


  /**
   * Enum for display formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** Default display. */ DEFAULT: 'view_default',
    }
  }
}
