const Ajv      = require('ajv')
const Element  = require('extrajs-element')
const City     = require('./City.class.js')
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

const PRODEVS = [
  new ProDev(
    { start: new Date('2016-07-25'), end: new Date('2016-07-26') },
    new City('Alexandria', 'VA', { lat: 38.832972, lon: -77.1196307 }),
    12,
    `
      <span itemprop="organizer" itemscope="" itemtype="http://schema.org/Organization">
        <span itemprop="name">An Event Apart</span>
      </span>
    `,
    'http://schema.org/Event'
  ),
  new Award(`<time>2011</time>&ndash;<time>2014</time>`, `
    <span itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr> Conference, annually statewide (<time datetime="PT40H">10 hr each</time>)
    </span>
  `),
  new ProDev(
    { start: new Date('2014-03-14'), end: new Date('2014-03-15') },
    new City('Harrisonburg', 'VA', { lat: 38.4393105, lon: -78.8711824 }),
    10,
    `
      <span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
          <span class="c-Acro__First">V</span>CTM
        </abbr> Conference
      </span>
    `,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2013-03-08'), end: new Date('2013-03-09') },
    new City('Virginia Beach', 'VA', { lat: 36.7674971, lon: -76.0476647 }),
    10,
    `
      <span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
          <span class="c-Acro__First">V</span>CTM
        </abbr> Conference
      </span>
    `,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2012-03-09'), end: new Date('2012-03-10') },
    new City('Roanoke', 'VA', { lat: 37.2743219, lon: -79.9575425 }),
    10,
    `
      <span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
          <span class="c-Acro__First">V</span>CTM
        </abbr> Conference
      </span>
    `,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2011-03-11'), end: new Date('2011-03-12') },
    new City('Richmond', 'VA', { lat: 37.5246609, lon: -77.4932615 }),
    10,
    `
      <span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
          <span class="c-Acro__First">V</span>CTM
        </abbr> Conference
      </span>
    `,
    'http://schema.org/EducationEvent'
  ),
  new Award(`<time datetime="2011-08-12" itemprop="startDate endDate">12 Oct 2011</time>`, `
    <span itemscope="" itemtype="http://schema.org/Event">
      <span itemprop="name">Secondary Mathematics Instruction in an Inclusive Classroom</span>
      (<time datetime="PT3H" itemprop="duration">3 hr</time>)
    </span>
  `),
  new Award(`<time datetime="2009-03-28" itemprop="startDate endDate">28 Mar 2009</time>`, `
    <span itemscope="" itemtype="http://schema.org/Event">
      <span itemprop="name">Preservice Teacher Education with TI-Nspire Technology</span>
      (<time datetime="PT9H" itemprop="duration">9 hr</time>)
    </span>
  `),
]

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
  static get CONTACT_DATA() { return Resume.DATA.contact }

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
            // (xjs.Object.typeOf(t) === 'array') ? t.join('') : t
            (typeof t === 'string') ? t : t.join('')
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
   * @type {Array<Award>}
   */
  static get PRODEVS() { return PRODEVS }

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
   * - `Resume.view(data).contactItem()` - display a contact link
   * @param  {*} data any data to render
   * @return {string} HTML output
   */
  static view(data) {
    function returned(data) { throw new Error('Please select a display: Resume.view[display]') }
    /**
     * Return a link displaying a contact item,
     * as a `.c-Contact > .c-Conact__Link` subcomponent.
     * @return {string} HTML output
     */
    returned.contactItem = function () {
      return new Element('a').class('c-Contact__Link h-Block')
        .attr('href', data.url)
        .attr('itemprop', data.itemprop || null)
        .addElements([
          new Element('div').class('c-Contact__Icon octicon').addClass(data.octicon).attr('role','none'),
          new Element('div').addContent(data.content),
        ]).html()
    }
    return returned
  }
}
