var Util = require('./Util.class.js')
var Element = require('./Element.class.js')

/**
 * A working position I’ve held at an organization tht I’ve worked for.
 * @module
 */
module.exports = class Position {
  /**
   * Construct a new Position object.
   * @param {string} id the id of this job position
   * @param {string} name the official position name
   * @param {{start:Date, end:Date}} $dates the dates the the position was held
   * @param {Date} $dates.start the start date
   * @param {Date} $dates.end the end date; use `new Date()` for present date
   * @param {Position.City} $location location of the organization
   * @param {{name:string, url:string, itemtype:string}} $org details of the organization
   * @param {string} $org.name the name of the organization; may be HTML
   * @param {string} $org.url the url of the organization’s homepage
   * @param {string} $org.itemtype the value used for the organization’s `itemtype` attribute
   * @param {boolean} is_current `true` if I currently work here
   */
  constructor(id, name, $dates, $location, $org, is_current) {
    this._id = id
    this._name = name

    this._date_start = $dates.start
    this._date_end   = $dates.end

    this._location = $location

    this._org_name = $org.name
    this._org_type = $org.itemtype
    this._org_url  = $org.url

    this._is_current = is_current

    this._descriptions = []
  }

  /**
   * Add a description to this position.
   * @param  {string} desc the description to add
   * @param  {boolean} is_hidden `true` if hidden
   * @return {Position} `this`
   */
  addDescription(desc, is_hidden = false) {
    this._descriptions.push({ html: desc, 'is_hidden': is_hidden })
    return this
  }


  /**
   * Render an organization in HTML.
   * @return {string} HTML string
   */
  html() {
    function renderDate(date) {
      function sameDay(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear())
          &&   (date1.getUTCMonth() === date2.getUTCMonth())
          &&   (date1.getUTCDate()  === date2.getUTCDate())
      }
      return new Element('time')
        .attr('datetime', date.toISOString())
        .addContent((sameDay(date, new Date())) ? 'present' : `${Util.MONTH_NAMES[date.getUTCMonth()].slice(0,3)} ${date.getFullYear()}`)
        .render()
    }
    let result = new Element('section').id(this._id).class('o-Org')
      .attr('itemscope','').attr('itemtype',this._org_type)
      .addElements([
        new Element('header').class('o-Org__Header').addElements([
          new Element('div').class('o-Org__Header__Titles').addElements([
            new Element('h3').class('o-Org__Header__Titles__JobTitle c-H3').attr('itemprop','jobTitle').addContent(this._name),
            new Element('p').class('o-Org__Header__Titles__Name c-H4').addElements([
              new Element('a').class('c-Camo').attr('rel','external').attr('href',this._org_url).attr('itemprop','url').addElements([
                new Element('span').attr('itemprop','name').addContent(this._org_name),
              ]),
            ]),
          ]),
          new Element('div').class('o-Org__Header__Spacetime').addElements([
            new Element('p').class('o-Org__Header__Spacetime__Dates').addContent(`${renderDate(this._date_start)}&ndash;${renderDate(this._date_end)}`),
            new Element('p').class('o-Org__Header__Spacetime__Place')
              .attr('itemprop',"location").attr('itemscope',"").attr('itemtype',"http://schema.org/Place")
              .addContent(this._location.html()),
          ]),
        ]),
        new Element('ul').class('o-Org__Detail').addElements(
          this._descriptions.map((obj) => new Element('li')
            .addClass((obj.is_hidden) ? '-d-n' : '')
            .addContent(obj.html)
          )
        ),
      ])
    if (this._is_current) result.attr('itemprop','worksFor')
    return result.render()
  }

  static get City() { return City }
}


/**
 * A class encoding information about a city or town’s location.
 * @module
 */
class City {
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
    return [
      new Element('span').attr('itemprop','address').attr('itemscope','').attr('itemtype','http://schema.org/PostalAddress').addContent(
        new Element('span').attr('itemprop','addressLocality').addContent(this._locality).render()
      + ', '
      + new Element('abbr').attr('itemprop','addressRegion')
          .attr('title',Util.STATE_DATA.find((obj) => obj.code===this._region).name)
          .addContent(this._region).render()
      ),
      new Element('span').attr('itemprop','geo').attr('itemscope','').attr('itemtype','http://schema.org/GeoCoordinates').addElements([
        new Element('meta',true).attr('itemprop','latitude' ).attr('content',this._latitude),
        new Element('meta',true).attr('itemprop','longitude').attr('content',this._longitude),
      ]),
    ].map((el) => el.render()).join('')
  }
}
