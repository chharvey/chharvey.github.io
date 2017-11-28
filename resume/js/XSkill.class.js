const Skill = require('../class/Skill.class.js')

class XSkill extends HTMLElement {
  constructor() {
    super()
    this._level = +this.getAttribute('level')
    this._text  = this.innerHTML

    let frag = XSkill.TEMPLATE.content.cloneNode(true)
    frag.querySelector('dt'                      ).innerHTML   = this._text
    frag.querySelector('.c-Label--skill'         ).textContent = Skill.LEVELS[this._level-1]
    frag.querySelector('[itemprop="bestRating"]' ).content     = Skill.LEVELS.length
    frag.querySelector('[itemprop="ratingValue"]').content     = this._level
    Skill.LEVELS.forEach(function (leveltext, index) {
      // NOTE: cannot use <template> in SVG elements
      // <circle class="c-SkillViz__Marker {{ truthy }}" cx="{{ 3 * index }}" cy="0" r="1"/>
      let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      // NOTE: these IDL properties are read-only for SVG elements, and return objects
      // instead of strings. While those objects are mutable, it’s too complicated
      // to access their settable properties, so it’s easier to call `.setAttribute()`.
      circle.setAttribute('class', `c-SkillViz__Marker${(index <= this._level-1) ? ' c-SkillViz__Marker--true' : ''}`)
      circle.setAttribute('cx'   , 3 * index)
      circle.setAttribute('cy'   , 0)
      circle.setAttribute('r'    , 1)
      frag.querySelector('g').appendChild(circle)
    }, this)

    this.parentNode.appendChild(frag)
    this.remove()
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-skill.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XSkill
