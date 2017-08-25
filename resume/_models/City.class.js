var Element = require('helpers-js').Element
var UtilLocation = require('./UtilLocation.class.js')

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
   * @return {string} HTML string
   */
  html() {
    return new Element('span')
      .attrObj({
        itemprop : 'location',
        itemscope: '',
        itemtype : 'http://schema.org/Place',
        'data-class': 'City',
      })
      .addElements([
        new Element('span')
          .attrObj({ itemprop:'address', itemscope:'', itemtype:'http://schema.org/PostalAddress' })
          .addElements([new Element('span').attr('itemprop','addressLocality').addContent(this._locality)])
          .addContent(`, `)
          .addElements([
            new Element('abbr').attr('itemprop','addressRegion')
              .attr('title',UtilLocation.STATE_DATA.find((obj) => obj.code===this._region).name)
              .addContent(this._region),
          ]),
        new Element('span')
          .attrObj({ itemprop:'geo', itemscope:'', itemtype:'http://schema.org/GeoCoordinates' })
          .addElements([
            new Element('meta',true).attr('itemprop','latitude' ).attr('content',this._latitude),
            new Element('meta',true).attr('itemprop','longitude').attr('content',this._longitude),
          ]),
      ])
      .html()
  }
}
