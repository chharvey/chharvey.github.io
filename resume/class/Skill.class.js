const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const View = require('extrajs-view')

/**
 * Skill listed in the Technical Experience section.
 */
class Skill {
  /**
   * @summary Construct a new Skill object.
   * @param  {!Object} jsondata JSON object of type {@link http://schema.org/Rating}
   * @param  {number} jsondata.ratingValue proficiency with this skill
   * @param  {string} jsondata.name custom HTML string defining this skill
   */
  constructor(jsondata) {
    this._level = jsondata.ratingValue
    this._text  = jsondata.name
  }

  /**
   * @summary This skill’s level.
   * @type {number}
   */
  get level() { return this._level }

  /**
   * @summary This skill’s text content.
   * @type {string}
   */
  get text() {
    return this._text.slice()
  }

  /**
   * @summary Render this award in HTML.
   * @see Skill.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Skill#view()` - default display
     * @namespace Skill.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <dt>–<dd> pair of elements:
     * <dt> skill name, <dd> visualization of skill level.
     * @summary Call `Skill#view()` to render this display.
     * @function Skill.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-skill.tpl.html'), 'utf8'))
      const document = dom.window.document
      const template = document.querySelector('template')
      let frag = template.content.cloneNode(true)
      frag.querySelector('dt'                      ).innerHTML   = this._text
      frag.querySelector('[itemprop="ratingValue"]').setAttribute('value', this._level) // .value = this._level // https://github.com/tmpvar/jsdom/issues/2100
      frag.querySelector('[itemprop="ratingValue"]').setAttribute('style', frag.querySelector('meter').getAttribute('style').replace('1', this._level)) // .style.setProperty('--fadein', this._level) // https://github.com/tmpvar/jsdom/issues/1895
      frag.querySelector('slot[name="percentage"]' ).textContent = 100 * this._level

      let div = document.createElement('div')
      div.append(frag)
      return div.innerHTML
    }, this)
  }
}

module.exports = Skill
