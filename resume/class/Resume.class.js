const fs = require('fs')
const path = require('path')

const Ajv      = require('ajv')
const jsdom = require('jsdom')
const xjs      = require('extrajs')
const View = require('extrajs-view')

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

const GeoCoordinates = require('./GeoCoordinates.class.js')
const City           = require('./City.class.js')
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
   * @summary List of skills, grouped by category.
   * @type {Array<{title:string: id:string, items:Array<Skill>}>}
   */
  get skills() {
    return (this._DATA.skills || []).map((itemList) => ({
      title: itemList.name,
      id   : itemList.identifier,
      items: itemList.itemListElement.map((rating) => new Skill(rating)),
    }))
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
    return (this._DATA.degrees || []).map((d) => new Degree(d.year, d.gpa, d.field))
  }

  /**
   * @summary List of professional development hours.
   * @type {Array<ProDev>}
   */
  get proDevs() {
    return (this._DATA.prodevs || []).map((d) =>
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
    return (this._DATA.awards || []).map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
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
    return (this._DATA.teams || []).map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
  }

  /**
   * @summary Render this resume, or parts of it, in HTML.
   * @see Resume.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Resume#view()` - default display
     * - `Resume#contactInfo()` - markup for a piece of contact information
     * @namespace Resume.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * @summary Call `Resume#view()` to render this display.
     * @function Resume.VIEW.default
     * @returns {string} HTML output
     */
    return new View(null, this)
      /**
       * Return an `<a>` element marking up a piece of contact information.
       * @summary Call `Resume#view.contactInfo()` to render this display.
       * @function Resume.VIEW.contactInfo
       * @param   {{url:string=, email:string=, telephone:string=}=} titles optional alternative titles to display
       * @param   {string=} titles.url       optional alternative title of the url
       * @param   {string=} titles.email     optional alternative title of the email
       * @param   {string=} titles.telephone optional alternative title of the telephone
       * @returns {string} HTML output
       */
      .addDisplay(function contactInfo(titles) {
        const display_data = [
          {
            name: 'telephone',
            href: (this._DATA.telephone) ? `tel:${this._DATA.telephone}` : '',
            icon: 'device-mobile',
          },
          {
            name: 'email',
            href: (this._DATA.email) ? `mailto:${this._DATA.email}` : '',
            icon: 'mail',
          },
          {
            name: 'url',
            href: this._DATA.url || '',
            icon: 'home',
          },
        ]

        const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/contact-links.tpl.html'), 'utf8'))
        const document = dom.window.document
        const template = document.querySelector('template')
        let list = document.querySelector('ul')
        display_data.forEach(function (d) {
            let frag = template.content.cloneNode(true)
            if (d.href) {
              frag.querySelector('.c-Contact__Link').href = d.href
            } else {
              frag.querySelector('.c-Contact__Link').removeAttribute('href')
            }
            frag.querySelector('.c-Contact__Link').setAttribute('itemprop', d.name)
            frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ octicon }}', d.icon)
            frag.querySelector('.c-Contact__Text').textContent = titles && titles[d.name] || this._DATA[d.name]
            list.append(frag)
        }, this)
        return list.outerHTML
      })
  }
}

module.exports = Resume
