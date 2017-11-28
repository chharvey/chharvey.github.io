const Ajv      = require('ajv')
const xjs      = require('extrajs')
const Element  = require('extrajs-dom').Element
const HTMLDListElement  = require('extrajs-dom').HTMLDListElement

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

const GeoCoordinates = require('./GeoCoordinates.class.js')
const City           = require('./City.class.js')
const ContactPoint   = require('./ContactPoint.class.js')
const Skill          = require('./Skill.class.js')
const Position       = require('./Position.class.js')
const Award          = require('./Award.class.js')
const ProDev         = require('./ProDev.class.js')
const Degree         = require('./Degree.class.js')

/**
 * A résumé generated with given content data.
 */
class Resume {
  /**
   * @summary Construct a new Resume object.
   * @param   {Object} jsondata a JSON object that validates against `../resume.schema.json`
   */
  constructor(jsondata) {
    // REVIEW indentation
  ;(function () {
    let ajv = new Ajv()
    let is_schema_valid = ajv.validateSchema(require('../resume.schema.json'))
    if (!is_schema_valid) {
      console.error(ajv.errors)
      throw new Error('Schema is not a valid schema!')
    }
  })()
  ;(function () {
    let ajv = new Ajv()
    let is_data_valid = ajv.validate(require('../resume.schema.json'), jsondata)
    if (!is_data_valid) {
      console.error(ajv.errors)
      throw new Error('Data does not valiate against schema!')
    }
  })()
    /**
     * Raw JSON data for this resume.
     * @private
     * @final
     * @type {Object}
     */
    this._DATA = jsondata
  }

  /**
   * Generate content from strings.
   * @private
   * @param   {(string|Array<string>)} x a string, or array of strings
   * @returns {string} the string, or the joined array
   */
  static _content(x) {
    return (xjs.Object.typeOf(x) === 'array') ? x.join('') : x
  }

  /**
   * Remove all child nodes from a node, and return the modified node.
   * @param   {Node} $node the node from which to remove all child nodes
   * @returns {Node} the given node, emptied
   */
  static removeAllChildNodes($node) {
    // $node.childNodes.forEach(function (c) { c.remove() } ) // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
    while ($node.hasChildNodes()) { $node.firstChild.remove() }
    return $node
  }

  /**
   * @summary About the applicant.
   * @type {string}
   */
  get about() { return this._DATA.about }

  /**
   * @summary Contact data for this resume.
   * @type {Array<Object<string>>}
   */
  get contactData() {
    return this._DATA.contact.map((d) => new ContactPoint(d.url, d.octicon, d.content, d.itemprop))
  }

  /**
   * @summary List of skills, grouped by category.
   * @type {Object<Array<Skill>>}
   */
  get skills() {
    let returned = {}
    for (let i in this._DATA.skills) {
      returned[i] = this._DATA.skills[i].map((d) => new Skill(d.level, d.text))
    }
    return returned
  }

  /**
   * @summary List of positions, grouped by category.
   * @type {Object<Array<Position>>}
   */
  get positions() {
    let returned = {}
    for (let i in this._DATA.positions) {
      returned[i] = this._DATA.positions[i].map((d) =>
        new Position(d.id, {
          title: d.title,
          org  : {
            name    : d.orgname,
            url     : d.url,
            itemtype: d.itemtype,
          },
          dates: {
            start: new Date(d.start),
            end  : (d.end) ? new Date(d.end) : new Date(),
          },
          location: new City(
            { locality: d.city, region: (STATE_DATA.find((obj) => obj.code===d.state).name), }, // TODO make region the full name
            new GeoCoordinates({ latitude: d.geo[0], longitude: d.geo[1] })
          ),
          descriptions: d.descriptions.map(Resume._content)
        })
      )
    }
    return returned
  }

  /**
   * @summary List of degrees.
   * @type {Array<Degree>}
   */
  get degrees() {
    return this._DATA.degrees.map((d) => new Degree(d.year, d.gpa, d.field))
  }

  /**
   * @summary List of professional development hours.
   * @type {Array<ProDev>}
   */
  get proDevs() {
    return this._DATA.prodevs.map((d) =>
      new ProDev(
        { start: new Date(d.start), end  : new Date(d.end) },
        new City(
          { locality: d.city, region: (STATE_DATA.find((obj) => obj.code===d.state).name), }, // TODO make region the full name
          new GeoCoordinates({ latitude: d.geo[0], longitude: d.geo[1] })
        ),
        d.pdh,
        Resume._content(d.coursename),
        d.itemtype
      )
    )
  }

  /**
   * @summary List of other awards & memberships.
   * @type {Array<Award>}
   */
  get awards() {
    /**
     * Convert sub-awards into an array.
     * @private
     * @param   {{sub_awards:Array<{dates:string, content:string}>}} datum the data point to parse
     * @returns {?Array<Award>} an array of sub-awards
     */
    function subs(datum) {
      return (datum.sub_awards) ?
        datum.sub_awards.map((s) => new Award(s.dates, Resume._content(s.content)))
        : null
    }
    return this._DATA.awards.map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
  }

  /**
   * @summary List of athletic team memberships.
   * @type {Array<Award>}
   */
  get teams() {
    /**
     * Convert sub-awards into an array.
     * @private
     * @param   {{sub_awards:Array<{dates:string, content:string}>}} datum the data point to parse
     * @returns {?Array<Award>} an array of sub-awards
     */
    function subs(datum) {
      return (datum.sub_awards) ?
        datum.sub_awards.map((s) => new Award(s.dates, Resume._content(s.content)))
        : null
    }
    return this._DATA.teams.map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
  }
}

module.exports = Resume
