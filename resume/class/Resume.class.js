const fs = require('fs')
const path = require('path')

const Ajv      = require('ajv')
const jsdom = require('jsdom')
const xjs = {
  Object: require('extrajs').Object,
  ...require('extrajs-dom'),
}
const {Processor} = require('template-processor')

const { SCHEMATA } = require('schemaorg-jsd')
const requireOther = require('schemaorg-jsd/lib/requireOther.js')

const RESUME_SCHEMA = requireOther(path.join(__dirname, '../resume.jsd'))

const xResume = require('../tpl/resume.tpl.js')

/**
 * A résumé generated with given content data.
 */
class Resume {
  /**
   * @summary Construct a new Resume object.
   * @param   {!Object=} jsondata a JSON object that validates against `../resume.schema.json`
   */
  constructor(jsondata = {}) {
    let ajv = new Ajv()
    ajv.addSchema(SCHEMATA)
    let is_data_valid = ajv.validate(RESUME_SCHEMA, jsondata)
    if (!is_data_valid) {
      let e = new TypeError(ajv.errors[0].message)
      e.filename = 'resume.json'
      e.details = ajv.errors[0]
      console.error(e)
      throw e
    }

    /**
     * Raw JSON data for this resume.
     * @private
     * @final
     * @type {Object}
     */
    this._DATA = jsondata
  }

  /**
   * Compile the entire document.
   * @returns {string} the compiled DOM output
   */
  compile() {
    return new xjs.Document(xResume.process(this._DATA)).innerHTML()
  }
}

/**
 * @summary A set of component builders.
 * @namespace
 */
Resume.TEMPLATES = {
  /**
   * @summary A low-level skill with a subjective proficiency level.
   * @example
   * const {xSkill} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('dl').append(
   *   xSkill.process({ "@type": "Rating" })
   * )
   * @see xSkill_renderer
   * @type {Processor}
   */
  xSkill: require('../tpl/x-skill.tpl.js'),
  /**
   * @summary A working position while employed at an organization.
   * @example
   * const {xPosition} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('li').append(
   *   xSkill.process({ "@type": "JobPosting" })
   * )
   * @see xPosition_renderer
   * @type {Processor}
   */
  xPosition: require('../tpl/x-position.tpl.js'),
  /**
   * @summary Professional development hours.
   * @example
   * const {xProdev} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('dl').append(
   *   xProdev.process({ "@type": "Event" })
   * )
   * @see xProdev_renderer
   * @type {Processor}
   */
  xProdev: require('../tpl/x-prodev.tpl.js'),
  /**
   * @summary An award earned.
   * @example
   * const {xAward} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('dl').append(
   *   xProdev.process({dates, text})
   * )
   * @see xAward_renderer
   * @type {Processor}
   */
  xAward: require('../tpl/x-award.tpl.js'),
  /**
   * @summary A degree earned from a college or university.
   * @example
   * const {xDegree} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('dl').append(
   *   xDegree.process({year, gpa, field})
   * )
   * @see xDegree_renderer
   * @type {Processor}
   */
  xDegree: require('../tpl/x-degree.tpl.js'),
  /**
   * @summary Markup representing a city, town, or municipality.
   * @example
   * const {xCity} = require('./Resume.class.js').TEMPLATES
   * document.querySelector('span').append(
   *   xCity.process({ "@type": "Place" })
   * )
   * @see xCity_renderer
   * @type {Processor}
   */
  xCity: require('../tpl/x-city.tpl.js'),
}

module.exports = Resume
