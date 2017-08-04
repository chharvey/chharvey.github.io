// var Element = require('./Element.class.js')

/**
 * Skill listed in the Technical Experience section.
 * @module
 */
module.exports = class Skill {
  /**
   * Construct a new Skill object.
   * @param  {Skill.Level} level proficiency with this skill
   * @param  {string} text custom HTML string defining this skill
   */
  constructor(level, text) {
    this._text  = text
    this._level = level
  }

  /**
   * Render a skill in HTML.
   * @param  {string} positive classname to add when the marker indicator is positive
   * @param  {Object<string>} classes classnames for other shit
   * @return {string} HTML string
   */
  render(positive, classes) {
    let n = Skill.LEVELS.indexOf(this._level)+1
    let dt_class = (classes) ? classes.dt : ''
    let dd_class = (classes) ? classes.dd : ''
    return `
      <dt class="o-Grid__Item-s o-ListLangs__Text ${dt_class}">${this._text}</dt>
      <dd class="o-Grid__Item-s o-ListLangs__Viz ${dd_class}" title="${this._level}" itemscope="" itemtype="http://schema.org/Rating">
        <meta itemprop="worstRating" content="0"/>
        <meta itemprop="bestRating" content="${Skill.LEVELS.length}"/>
        <meta itemprop="ratingValue" content="${n}"/>
        <svg class="c-LangViz" viewbox="0 0 15 4">
          <g transform="translate(2,2)">
            ${Skill.LEVELS.map(function (lvl, index) {
              return `<circle class="c-LangViz__Marker${(index+1 <= n) ? ` ${positive}` : ''}" cx=${3*index} cy="0" r="1"/>`
            }).join('')}
          </g>
        </svg>
      </dd>
    `
    // return [
    //   new Element('dt').class('o-Grid__Item-s o-ListLangs__Text')
    //     .addClass(dt_class || '')
    //     .addContent(this._text),
    //   new Element('dd').class('o-Grid__Item-s o-ListLangs__Viz')
    //     .addClass(dd_class || '')
    //     .attr('title',this._level).attr('itemscope','').attr('itemtype','http://schema.org/Rating')
    //     .addElements([
    //       new Element('meta',true).attr('itemprop','worstRating').attr('content',0),
    //       new Element('meta',true).attr('itemprop','bestRating' ).attr('content',`${Skill.LEVELS.length}`),
    //       new Element('meta',true).attr('itemprop','ratingValue').attr('content',`${n}`),
    //       new Element('svg').class('c-LangViz').attr('viewbox','0 0 15 4').addElements([
    //         new Element('g').attr('transform','translate(2,2)').addElements(
    //           Skill.LEVELS.map(function (lvl, index) {
    //             return new Element('circle',true).class(`c-LangViz__Marker`)
    //               .addClass((index+1 <= n) ? positive : '')
    //               .attr('cx',3*index).attr('cy',0).attr('r',1)
    //           })
    //         ),
    //       ]),
    //     ]),
    // ].map((el) => el.render()).join('')
  }

  /**
   * An array imposing an order of skill levels.
   * @type {Array<Skill.Level>}
   */
  static get LEVELS() {
    return [
      Skill.Level.NOVICE,
      Skill.Level.BEGINNER,
      Skill.Level.COMPETENT,
      Skill.Level.PROFICIENT,
      Skill.Level.EXPERT,
    ]
  }

  /**
   * A set of possible skill levels.
   * @enum {String}
   */
  static get Level() {
    return {
      NOVICE    : 'novice',
      BEGINNER  : 'beginner',
      COMPETENT : 'competent',
      PROFICIENT: 'proficient',
      EXPERT    : 'expert',
    }
  }
}
