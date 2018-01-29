const fs = require('fs')
const path = require('path')

const Ajv      = require('ajv')
const jsdom = require('jsdom')
const xjs = {
  Object: require('extrajs').Object,
  Node  : require('extrajs-dom').Node,
  DocumentFragment: require('extrajs-dom').DocumentFragment,
}
const View = require('extrajs-view')

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

const { SCHEMATA } = require('schemaorg-jsd')
const requireOther = require('schemaorg-jsd/lib/requireOther.js')

const Skill          = require('./Skill.class.js')
const Position       = require('./Position.class.js')
const Award          = require('./Award.class.js')
const ProDev         = require('./ProDev.class.js')
const Degree         = require('./Degree.class.js')

const RESUME_SCHEMA = requireOther(path.join(__dirname, '../resume.jsd'))

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
   * Generate content from strings.
   * @private
   * @param   {(string|Array<string>)} x a string, or array of strings
   * @returns {string} the string, or the joined array
   */
  static _content(x) {
    return (xjs.Object.typeOf(x) === 'array') ? x.join('') : x
  }


  /**
   * @summary The full name of the applicant, including prefixes and suffixes.
   * @type {Object<string>}
   * @property {string} familyName
   * @property {string} givenName
   * @property {string} additionalName
   * @property {string} honorificPrefix
   * @property {string} honorificSuffix
   */
  get fullName() {
    return {
      // REVIEW indentation
     familyName      : this._DATA.familyName      || '',
     givenName       : this._DATA.givenName       || '',
     additionalName  : this._DATA.additionalName  || '',
     honorificPrefix : this._DATA.honorificPrefix || '',
     honorificSuffix : this._DATA.honorificSuffix || '',
    }
  }

  /**
   * @summary Optional alternative titles for contact information.
   * @type {Object<string>}
   * @property {string=} url       optional alternative title of the url
   * @property {string=} email     optional alternative title of the email
   * @property {string=} telephone optional alternative title of the telephone
   */
  get contactTitles() {
    return {
      url      : this._DATA.$contactTitles.url       || '',
      email    : this._DATA.$contactTitles.email     || '',
      telephone: this._DATA.$contactTitles.telephone || '',
    }
  }

  /**
   * @summary About the applicant.
   * @type {string}
   */
  get about() { return this._DATA.description || '' }

  /**
   * @summary List of skills, grouped by category.
   * @type {Array<{title:string: id:string, items:Array<Skill>}>}
   */
  get skills() {
    return (this._DATA.$skills || []).map((itemList) => ({
      title: itemList.name,
      id   : itemList.identifier,
      items: itemList.itemListElement.map((rating) => new Skill(rating)),
    }))
  }

  /**
   * @summary List of positions, grouped by category.
   * @type {Array<{title:string: id:string, items:Array<Position>}>}
   */
  get positions() {
    return (this._DATA.$positions || []).map((itemList) => ({
      title: itemList.name,
      id   : itemList.identifier,
      items: itemList.itemListElement.map((jobposting) => new Position(jobposting))
    }))
  }

  /**
   * @summary List of degrees.
   * @type {Array<Degree>}
   */
  get degrees() {
    return (this._DATA.$degrees || []).map((d) => new Degree(d.year, d.gpa, d.field))
  }

  /**
   * @summary List of professional development hours.
   * @type {Array<ProDev>}
   */
  get proDevs() {
    return (this._DATA.$prodevs || []).map((event) => new ProDev(event))
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
    return (this._DATA.$awards || []).map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
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
    return (this._DATA.$teams || []).map((d) => new Award(d.dates, Resume._content(d.content), subs(d)))
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
       * Return an `<h1>` element marking up the applicant name. Serves as the top-level heading of the resume.
       * @summary Call `Resume#view.fullName()` to render this display.
       * @function Resume.VIEW.fullName
       * @returns {string} HTML output
       */
      .addDisplay(function fullName() {
        let frag = Resume.NAMED_TEMPLATES.fullName.cloneNode(true)
        ;[
          'familyName',
          'givenName',
          'additionalName',
          'honorificPrefix',
          'honorificSuffix',
        ].forEach(function (nameprop) {
          let el = frag.querySelector(`slot[name="${nameprop}"]`)
          if (this.fullName[nameprop]) {
            el.textContent = this.fullName[nameprop]
          } else el.remove()
        }, this)


        // abbreviate the middle name
        if (this.fullName.additionalName) {
          frag.querySelector('slot[name="additionalName"]').textContent = `${this.fullName.additionalName[0]}.`
          frag.querySelector('abbr[itemprop="additionalName"]').title = this.fullName.additionalName
        } else {
          frag.querySelector('abbr[itemprop="additionalName"]').remove()
        }

        // comma preceding suffix
        if (!this.fullName.honorificSuffix) {
          frag.querySelector('[itemprop="familyName"]').classList.remove('h-CommaAfter')
        }

        return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
      })
      /**
       * Return an `<a>` element marking up a piece of contact information.
       * @summary Call `Resume#view.contactInfo()` to render this display.
       * @function Resume.VIEW.contactInfo
       * @returns {string} HTML output
       */
      .addDisplay(function contactInfo() {
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

        let frag = Resume.NAMED_TEMPLATES.contactInfo.cloneNode(true)
        display_data.forEach(function (d) {
          let inner = frag.querySelector('ul > template').content.cloneNode(true)
          if (d.href) {
            inner.querySelector('.c-Contact__Link').href = d.href
          } else {
            inner.querySelector('.c-Contact__Link').removeAttribute('href')
          }
          inner.querySelector('.c-Contact__Link').setAttribute('itemprop', d.name)
          inner.querySelector('.c-Contact__Icon').className = inner.querySelector('.c-Contact__Icon').className.replace('{{ octicon }}', d.icon)
          inner.querySelector('.c-Contact__Text').textContent = this.contactTitles[d.name] || this._DATA[d.name]
          frag.querySelector('ul').append(inner)
        }, this)
        frag.querySelector('ul > template').remove()
        return xjs.DocumentFragment.innerHTML(xjs.Node.trimInner(frag))
      })
  }
}

/**
 * @summary A set of templates marking up small data types.
 * @const {Object<DocumentFragment>}
 */
Resume.NAMED_TEMPLATES = {
  /**
   * @summary Template for full name.
   * @const {DocumentFragment}
   */
  fullName: new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/fullname.tpl.html'), 'utf8'))
    .window.document.querySelector('template').content,
  /**
   * @summary Template for contact info.
   * @const {DocumentFragment}
   */
  contactInfo: new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/contact-links.tpl.html'), 'utf8'))
    .window.document.querySelector('template').content,
}

module.exports = Resume
