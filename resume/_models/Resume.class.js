const Ajv      = require('ajv')
const xjs      = require('extrajs')
const Element  = require('extrajs-element')
const City     = require('./City.class.js')
const ContactPoint = require('../class/ContactPoint.class.js')
const Skill    = require('./Skill.class.js')
const Position = require('./Position.class.js')
const Degree   = require('./Degree.class.js')
const Award    = require('./Award.class.js')
const ProDev   = require('./ProDev.class.js')

const DATA = (function validateData(data) {
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
    let is_data_valid = ajv.validate(require('../resume.schema.json'), data)
    if (!is_data_valid) {
      console.error(ajv.errors)
      throw new Error('Data does not valiate against schema!')
    }
  })()
  return data
})(require('../resume.json'))

/**
 * Static class for résumé content.
 * NOTE: since es6 classes cannot have static fields, I have used `static get` methods,
 * returning constants that have been declared outside the class.
 * This speeds up runtime as the objects above don’t have to be constructed each and every time
 * the static methods below are called.
 * @module
 */
module.exports = class Resume {
  /** @private */ constructor() {}

  /**
   * This project’s data, compiled from raw JSON.
   * @type {Object}
   */
  static get DATA() { return DATA }

  /**
   * Contact data for this resume.
   * @type {Array<Object<string>>}
   */
  static get CONTACT_DATA() {
    return Resume.DATA.contact.map((d) => new ContactPoint(d.url, d.octicon, d.content, d.itemprop))
  }

  /**
   * List of skills, grouped by category.
   * @type {Object<Array<Skill>>}
   */
  static get SKILLS() {
    let returned = {}
    for (let i in Resume.DATA.skills) {
      returned[i] = Resume.DATA.skills[i].map((d) => new Skill(d.level, d.text))
    }
    return returned
  }

  /**
   * List of positions, grouped by category.
   * @type {Object<Array<Position>>}
   */
  static get POSITIONS() {
    let returned = {}
    for (let i in Resume.DATA.positions) {
      returned[i] = Resume.DATA.positions[i].map((d) =>
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
          descriptions: d.descriptions.map((t) =>
            (xjs.Object.typeOf(t) === 'array') ? t.join('') : t
          )
        })
      )
    }
    return returned
  }

  /**
   * List of degrees.
   * @type {Array<Degree>}
   */
  static get DEGREES() {
    return Resume.DATA.degrees.map((d) => new Degree(d.year, d.gpa, d.field))
  }

  /**
   * List of professional development hours.
   * @type {Array<(ProDev|Award)>}
   */
  static get PRODEVS() {
    return Resume.DATA.prodevs.map((d) =>
      (d.prodev) ? new ProDev(
        { start: new Date(d.start), end  : new Date(d.end) },
        new City(d.city, d.state, { lat: d.geo[0], lon: d.geo[1] }),
        d.pdh,
        (xjs.Object.typeOf(d.coursename) === 'array') ? d.coursename.join('') : d.coursename,
        d.itemtype
      ) : new Award(
        d.dates,
        (xjs.Object.typeOf(d.text) === 'array') ? d.text.join('') : d.text
      )
    )
  }

  /**
   * List of other awards & memberships.
   * @type {Array<Award>}
   */
  static get AWARDS() {
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
          .addContent(datum.sub_awards.map((d) =>
            new Award(d.dates, d.text).view()
          ).join(''))
          .html()
        : ''
    }
    return Resume.DATA.awards.map((d) => new Award(d.dates, d.text + subs(d)))
  }

  /**
   * List of athletic team memberships.
   * @type {Array<Award>}
   */
  static get TEAMS() {
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
          .addContent(datum.sub_awards.map((d) =>
            new Award(d.dates, d.text).view()
          ).join(''))
          .html()
        : ''
    }
    return Resume.DATA.teams.map((d) => new Award(d.dates, d.text.join('') + subs(d)))
  }

  /**
   * Render any data in HTML.
   * Displays:
   * @param  {*} data any data to render
   * @return {string} HTML output
   */
  static view(data) {
    function returned(data) { throw new Error('Please select a display: Resume.view[display]') }
    return returned
  }
}
