const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

/**
 * Geographic coordinates of a place or event.
 * @see http://schema.org/GeoCoordinates
 */
class GeoCoordinates {
  /**
   * @summary Construct a new GeoCoordinates object.
   * @param  {!Object} $coordinates the labeled coordinates
   * @param  {number} $coordinates.latitude  the latitude , in decimal degrees (WGS 84)
   * @param  {number} $coordinates.longitude the longitude, in decimal degrees (WGS 84)
   * @param  {number} [$coordinates.elevation=0] the elevation, in meters (WGS 84)
   * @see https://en.wikipedia.org/wiki/World_Geodetic_System
   */
  constructor({latitude, longitude, elevation = 0}) {
    /**
     * the latitude , in decimal degrees (WGS 84)
     * @private
     * @final
     * @type {number}
     */
    this._LATITUDE  = latitude
    /**
     * the longitude, in decimal degrees (WGS 84)
     * @private
     * @final
     * @type {number}
     */
    this._LONGITUDE = longitude
    /**
     * the elevation, in meters (WGS 84)
     * @private
     * @final
     * @type {number}
     */
    this._ELEVATION = elevation
  }

  /**
   * the latitude, in decimal degrees (WGS 84)
   * @type {number}
   */
  get latitude() { return this._LATITUDE  }
  /**
   * the longitude, in decimal degrees (WGS 84)
   * @type {number}
   */
  get longitude() { return this._LONGITUDE }
  /**
   * the elevation, in meters (WGS 84)
   * @type {number}
   */
  get elevation() { return this._ELEVATION }

  /**
   * Set the address of these coordinates.
   * @param  {!Object} $address the address components
   * @param  {?string=} $address.country             the country             of the address
   * @param  {?string=} $address.region              the region              of the address
   * @param  {?string=} $address.locality            the locality            of the address
   * @param  {?string=} $address.streetAddress       the streetAddress       of the address
   * @param  {?string=} $address.postalCode          the postalCode          of the address
   * @param  {?string=} $address.postOfficeBoxNumber the postOfficeBoxNumber of the address
   */
  set address({country, region, locality, streetAddress, postalCode, postOfficeBoxNumber}) {
    this._country             = country
    this._region              = region
    this._locality            = locality
    this._streetAddress       = streetAddress
    this._postalCode          = postalCode
    this._postOfficeBoxNumber = postOfficeBoxNumber
  }

  /**
   * the country of the address
   * @type {?string}
   */
  get country() { return this._country || null }
  /**
   * the region of the address
   * @type {?string}
   */
  get region() { return this._region || null }
  /**
   * the locality of the address
   * @type {?string}
   */
  get locality() { return this._locality || null }
  /**
   * the streetAddress of the address
   * @type {?string}
   */
  get streetAddress() { return this._streetAddress || null }
  /**
   * the postalCode of the address
   * @type {?string}
   */
  get postalCode() { return this._postalCode || null }
  /**
   * the postOfficeBoxNumber of the address
   * @type {?string}
   */
  get postOfficeBoxNumber() { return this._postOfficeBoxNumber || null }

  /**
   * Return a string abbreviation for the region name.
   * @param   {!Object} options options for specifying the abbreviation
   * @returns {string} a shorter name or abbreviation, specified by the options
   */
  regionAbbr(options) {
    try {
      return STATE_DATA.find((obj) => obj.name===this.region).code
    } catch (e) {
      console.error(`No data found for ${this.region}.`)
      throw e
    }
  }
}

// /**
//  * A postal address.
//  */
// class PostalAddress {
//   /**
//    * Construct a new PostalAddress object.
//    * @param  {!Object} $address the address components
//    * @param  {string} $address.country             the country             of this address
//    * @param  {string} $address.region              the region              of this address
//    * @param  {string} $address.locality            the locality            of this address
//    * @param  {string} $address.streetAddress       the streetAddress       of this address
//    * @param  {string} $address.postalCode          the postalCode          of this address
//    * @param  {string} $address.postOfficeBoxNumber the postOfficeBoxNumber of this address
//    */
//   constructor({country, region, locality, streetAddress, postalCode, postOfficeBoxNumber}) {
//     this.country             = country
//     this.region              = region
//     this.locality            = locality
//     this.streetAddress       = streetAddress
//     this.postalCode          = postalCode
//     this.postOfficeBoxNumber = postOfficeBoxNumber
//   }
// }

module.exports = GeoCoordinates
