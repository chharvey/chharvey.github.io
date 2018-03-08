const fs = require('fs')
const path = require('path')

const Ajv      = require('ajv')
const jsdom = require('jsdom')
const xjs = {
  Object: require('extrajs').Object,
  ...require('extrajs-dom'),
}

const { SCHEMATA } = require('schemaorg-jsd')
const requireOther = require('schemaorg-jsd/lib/requireOther.js')

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
      let xName = new xjs.HTMLTemplateElement(container.querySelector('template')).setRenderer(function (frag, data) {
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
      })
      let data = {
        // REVIEW indentation
      familyName      : this._DATA.familyName      || '',
      givenName       : this._DATA.givenName       || '',
      additionalName  : this._DATA.additionalName  || '',
      honorificPrefix : this._DATA.honorificPrefix || '',
      honorificSuffix : this._DATA.honorificSuffix || '',
      }
      container.append(xName.render(data))
    }).call(this)

      new xjs.HTMLUListElement(document.querySelector('main header address ul.c-Contact')).populate([
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
      ], function (frag, data) {
        new xjs.HTMLAnchorElement(frag.querySelector('.c-Contact__Link')).href(data.href || null)
        frag.querySelector('.c-Contact__Link').setAttribute('itemprop', data.name)
        frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ octicon }}', data.icon)
        frag.querySelector('.c-Contact__Text').textContent = data.text
      })

    document.querySelector('#about slot[name="about"]').textContent = this._DATA.description || ''

      new xjs.HTMLUListElement(document.querySelector('.o-Grid--skillGroups')).populate(this._DATA.$skills || [], function (frag, data) {
        frag.querySelector('.o-List__Item'    ).id          = `${data.identifier}-item` // TODO fix this after fixing hidden-ness
        frag.querySelector('.c-Position'      ).id          = data.identifier
        frag.querySelector('.c-Position__Name').textContent = data.name
        new xjs.HTMLDListElement(frag.querySelector('.o-Grid--skill')).empty().append(
          ...data.itemListElement.map(Resume.TEMPLATES.xSkill.render, Resume.TEMPLATES.xSkill) // i.e. `(item) => Resume.TEMPLATES.xSkill.render(item)`
        )
      })
      new xjs.HTMLUListElement(document.querySelector('#skills .o-List--print')).populate(Array.from(document.querySelector('.o-Grid--skillGroups').querySelectorAll('dt.o-Grid__Item')), function (frag, data) {
        frag.querySelector('li').innerHTML = data.innerHTML
      })

    ;(function () {
      let templateEl = document.querySelector('template#experience')
      const xPositionGroup = new xjs.HTMLTemplateElement(templateEl).setRenderer(function (frag, data) {
        frag.querySelector('.o-Grid__Item--exp').id = data.identifier
        frag.querySelector('.c-ExpHn').textContent = data.name
          new xjs.HTMLUListElement(frag.querySelector('ul.o-List')).populate(data.itemListElement, function (f, d) {
            new xjs.HTMLLIElement(f.querySelector('li')).empty().append(Resume.TEMPLATES.xPosition.render(d))
          })
      })
      templateEl.after(...(this._DATA.$positions || []).map(xPositionGroup.render, xPositionGroup)) // i.e. `(datum) => xPositionGroup.render(datum)`
    }).call(this)


    return dom.serialize()
  }
}

/**
 * @summary A set of component builders.
 * @namespace
 */
Resume.TEMPLATES = {
  xSkill   : xjs.HTMLTemplateElement.fromFileSync(path.join(__dirname, '../tpl/x-skill.tpl.html'   )).setRenderer(require('../tpl/x-skill.tpl.js'   )),
  xPosition: xjs.HTMLTemplateElement.fromFileSync(path.join(__dirname, '../tpl/x-position.tpl.html')).setRenderer(require('../tpl/x-position.tpl.js')),
  xCity    : xjs.HTMLTemplateElement.fromFileSync(path.join(__dirname, '../tpl/x-city.tpl.html'    )).setRenderer(require('../tpl/x-city.tpl.js'    )),
}

module.exports = Resume
