const path = require('path')

const Ajv = require('ajv')
const xjs = require('extrajs-dom')
const { SCHEMATA } = require('schemaorg-jsd')
const requireOther = require('schemaorg-jsd/lib/requireOther.js')
const {Processor} = require('template-processor')

const xAward    = require('../../tpl/x-award.tpl.js')
const xDegree   = require('../../tpl/x-degree.tpl.js')
const xPosition = require('../../tpl/x-position.tpl.js')
const xProdev   = require('../../tpl/x-prodev.tpl.js')
const xSkill    = require('../../tpl/x-skill.tpl.js')

const RESUME_SCHEMA = requireOther(path.join(__dirname, '../../resume.jsd'))

/**
 * @todo    TODO put in template-processor
 * @param   {Document} doc [description]
 * @param   {ProcessingFunction_Document<V, W>} instructions [description]
 * @param   {V} data [description]
 * @param   {W} options [description]
 * @param   {unknown} this_arg [description]
 * @returns {Promise<Document>} [description]
 */
async function Processor_processAsync_Document(doc, instructions, data, options = {}, this_arg = null) {
	await instructions.call(this_arg, doc, data, options)
	return doc
}


const doc/*: Document*/ = xjs.Document.fromFileSync(path.join(__dirname, '../../tpl/resume.tpl.html')).importLinks(__dirname).node
const data = (function (jsondata) {
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
	return jsondata
})(require('../../resume.json'))

async function instructions(document/*: Document*/, jsondata/*: ResumePerson*/, opts/*: object*/)/*: Promise<void>*/ {
    ;(() => {
      let container = document.querySelector('main header h1')
      let xName = new Processor(container.querySelector('template'), function (frag, data, opts) {
        // TODO use aria-patterns name
        ;[
          'familyName',
          'givenName',
          'additionalName',
          'honorificPrefix',
          'honorificSuffix',
        ].forEach((nameprop) => {
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
      familyName      : jsondata.familyName      || '',
      givenName       : jsondata.givenName       || '',
      additionalName  : jsondata.additionalName  || '',
      honorificPrefix : jsondata.honorificPrefix || '',
      honorificSuffix : jsondata.honorificSuffix || '',
      }
      container.append(xName.process(data))
    })()

      new xjs.HTMLUListElement(document.querySelector('main header address ul.c-Contact')).populate(function (frag, data, opts) {
				new xjs.HTMLAnchorElement(frag.querySelector('.c-Contact__Link')).href(data.href || null)
				frag.querySelector('.c-Contact__Link').setAttribute('itemprop', data.name)
				frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ octicon }}', data.icon)
				frag.querySelector('.c-Contact__Text').textContent = data.text
      }, [
        {
          name: 'telephone',
          href: (jsondata.telephone) ? `tel:${jsondata.telephone}` : '',
          icon: 'device-mobile',
          text: jsondata.$contactTitles.telephone || jsondata.telephone,
        },
        {
          name: 'email',
          href: (jsondata.email) ? `mailto:${jsondata.email}` : '',
          icon: 'mail',
          text: jsondata.$contactTitles.email || jsondata.email,
        },
        {
          name: 'url',
          href: jsondata.url || '',
          icon: 'home',
          text: jsondata.$contactTitles.url || jsondata.url,
        },
      ])

    document.querySelector('#about slot[name="about"]').textContent = jsondata.description || ''
    new xjs.HTMLDListElement(document.querySelector('#edu .o-ListAchv')).empty().append(
      new xjs.DocumentFragment(document.createDocumentFragment()).append(
        ...(jsondata.$degrees || []).map((item) => xDegree.process(item))
      )
    )

      new xjs.HTMLUListElement(document.querySelector('.o-Grid--skillGroups')).populate(function (frag, data, opts) {
        frag.querySelector('.o-List__Item'    ).id          = `${data.identifier}-item` // TODO fix this after fixing hidden-ness
        frag.querySelector('.c-Position'      ).id          = data.identifier
        frag.querySelector('.c-Position__Name').textContent = data.name
        new xjs.HTMLDListElement(frag.querySelector('.o-Grid--skill')).empty().append(
          ...data.itemListElement.map((item) => xSkill.process(item))
        )
      }, jsondata.$skills || [])
      new xjs.HTMLUListElement(document.querySelector('#skills .o-List--print')).populate(function (frag, data) {
        frag.querySelector('li').innerHTML = data.innerHTML
      }, [...document.querySelector('.o-Grid--skillGroups').querySelectorAll('dt.o-Grid__Item')])

    ;(() => {
      let templateEl = document.querySelector('template#experience')
      const xPositionGroup = new Processor(templateEl, function (frag, data, opts) {
        frag.querySelector('.o-Grid__Item--exp').id = data.identifier
        frag.querySelector('.c-ExpHn').textContent = data.name
				new xjs.HTMLUListElement(frag.querySelector('ul.o-List')).populate(function (f, d, o) {
					new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xPosition.process(d))
				}, data.itemListElement)
      })
      templateEl.after(
        new xjs.DocumentFragment(document.createDocumentFragment())
          .append(...(jsondata.$positions || []).map((group) => xPositionGroup.process(group)))
          .node
      )
    })()

    ;(() => {
      let templateEl = document.querySelector('template#achievements')
      const xAchivementGroup = new Processor(templateEl, function (frag, data, opts) {
        frag.querySelector('.o-Grid__Item--exp').id = data.id
        frag.querySelector('.c-ExpHn').textContent = data.title
        new xjs.HTMLDListElement(frag.querySelector('.o-ListAchv')).empty()
          .replaceClassString('{{ classes }}', data.classes || '')
          .append(
            ...data.list.map((item) => data.xComponent.process(item))
          )
      })
      templateEl.after(
        new xjs.DocumentFragment(document.createDocumentFragment())
          .append(...[
            {
              title  : 'Profes­sional Dev­elopment', // NOTE invisible soft hyphens here! // `Profes&shy;sional Dev&shy;elopment`
              id     : 'prof-dev',
              list   : jsondata.$prodevs || [],
              xComponent: xProdev,
            },
            {
              title  : 'Awards & Member­ships', // NOTE `Awards &amp; Member&shy;ships`
              id     : 'awards',
              list   : jsondata.$awards || [],
              xComponent: xAward,
            },
            {
              title  : 'Team Athletic Experience',
              id     : 'athletic',
              classes: 'h-Hr',
              list   : jsondata.$teams  || [],
              xComponent: xAward,
            }
          ].map((group) => xAchivementGroup.process(group)))
          .node
      )
    })()
}
module.exports = Processor_processAsync_Document(doc, instructions, data)
