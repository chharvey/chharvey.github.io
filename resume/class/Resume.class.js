const fs = require('fs')
const path = require('path')

const Ajv      = require('ajv')
const jsdom = require('jsdom')
const xjs = {
  Object: require('extrajs').Object,
  ...require('extrajs-dom'),
}

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
   * Compile the entire document.
   * @returns {string} the compiled DOM output
   */
  compile() {
    const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/resume.tpl.html'), 'utf8'))
    const {document} = dom.window


    // ++++ USER-INPUT DATA ++++ //


    // ++++ DATA WITH NO PATTERNS ++++ //
    ;(function () {
      let container = document.querySelector('main header h1')
      container.append((function (frag, data) {
        ;[
          'familyName',
          'givenName',
          'additionalName',
          'honorificPrefix',
          'honorificSuffix',
        ].forEach(function (nameprop) {
          let el = frag.querySelector(`slot[name="${nameprop}"]`)
          if (data[nameprop]) {
            el.textContent = data[nameprop]
          } else el.remove()
        })

        // abbreviate the middle name
        if (data.additionalName) {
          frag.querySelector('slot[name="additionalName"]').textContent = `${data.additionalName[0]}.`
          frag.querySelector('abbr[itemprop="additionalName"]').title = data.additionalName
        } else {
          frag.querySelector('abbr[itemprop="additionalName"]').remove()
        }

        // comma preceding suffix
        if (!data.honorificSuffix) {
          frag.querySelector('[itemprop="familyName"]').classList.remove('h-CommaAfter')
        }

        return frag
      })(container.querySelector('template').content.cloneNode(true), {
        // REVIEW indentation
      familyName      : this._DATA.familyName      || '',
      givenName       : this._DATA.givenName       || '',
      additionalName  : this._DATA.additionalName  || '',
      honorificPrefix : this._DATA.honorificPrefix || '',
      honorificSuffix : this._DATA.honorificSuffix || '',
      }))
    }).call(this)

    ;(function () {
      let container = document.querySelector('main header address ul.c-Contact')
      container.append(...[
        {
          name: 'telephone',
          href: (this._DATA.telephone) ? `tel:${this._DATA.telephone}` : '',
          icon: 'device-mobile',
          text: this._DATA.$contactTitles.telephone || this._DATA.telephone,
        },
        {
          name: 'email',
          href: (this._DATA.email) ? `mailto:${this._DATA.email}` : '',
          icon: 'mail',
          text: this._DATA.$contactTitles.email || this._DATA.email,
        },
        {
          name: 'url',
          href: this._DATA.url || '',
          icon: 'home',
          text: this._DATA.$contactTitles.url || this._DATA.url,
        },
      ].map((d) => (function (frag, data) {
        new xjs.HTMLAnchorElement(frag.querySelector('.c-Contact__Link')).href(data.href || null )
        frag.querySelector('.c-Contact__Link').setAttribute('itemprop', data.name)
        frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ octicon }}', data.icon)
        frag.querySelector('.c-Contact__Text').textContent = data.text
        return frag
      })(container.querySelector('template').content.cloneNode(true), d)))
    }).call(this)

    document.querySelector('#about slot[name="about"]').textContent = this._DATA.description || ''


    return dom.serialize()
  }
}

/**
 * @summary A set of templates marking up small data types.
 * @const {Object<DocumentFragment>}
 */
Resume.NAMED_TEMPLATES = {
}

module.exports = Resume
