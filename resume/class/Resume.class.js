const Ajv      = require('ajv')
const xjs      = require('extrajs')
const Element  = require('extrajs-dom').Element

const Award        = require('./Award.class.js')
const City         = require('./City.class.js')
const ContactPoint = require('./ContactPoint.class.js')
const Degree       = require('./Degree.class.js')
const Position     = require('./Position.class.js')
const ProDev       = require('./ProDev.class.js')
const Skill        = require('./Skill.class.js')

/**
 * A résumé generated with given content data.
 * @class
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
            d.city,
            d.state,
            { lat: d.geo[0], lon: d.geo[1] }
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
   * @type {Array<(ProDev|Award)>}
   */
  get proDevs() {
    return this._DATA.prodevs.map((d) =>
      new ProDev(
        { start: new Date(d.start), end  : new Date(d.end) },
        new City(d.city, d.state, { lat: d.geo[0], lon: d.geo[1] }),
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
     * Return markup for any sub-awards in this award.
     * TODO: move this model into Award.class
     * @private
     * @param   {{sub_awards:Array<{dates:string, text:string}>}} datum the data point to parse
     * @returns {string} a <dl.o-ListAchv> element if the datum has any sub-awards; else the empty string
     */
    function subs(datum) {
      return (datum.sub_awards) ?
        new Element('dl').class('o-ListAchv')
          .addContent(datum.sub_awards.map((s) =>
            new Award(s.dates, Resume._content(s.content)).view()
          ).join(''))
          .html()
        : ''
    }
    return this._DATA.awards.map((d) => new Award(d.dates, Resume._content(d.content) + subs(d)))
  }

  /**
   * @summary List of athletic team memberships.
   * @type {Array<Award>}
   */
  get teams() {
    /**
     * Return markup for any sub-awards in this award.
     * TODO: move this model into Award.class
     * @private
     * @param   {{sub_awards:Array<{dates:string, text:string}>}} datum the data point to parse
     * @returns {string} a <dl.o-ListAchv> element if the datum has any sub-awards; else the empty string
     */
    function subs(datum) {
      return (datum.sub_awards) ?
        new Element('dl').class('o-ListAchv')
          .addContent(datum.sub_awards.map((s) =>
            new Award(s.dates, Resume._content(s.content)).view()
          ).join(''))
          .html()
        : ''
    }
    return this._DATA.teams.map((d) => new Award(d.dates, Resume._content(d.content) + subs(d)))
  }
}

module.exports = Resume
