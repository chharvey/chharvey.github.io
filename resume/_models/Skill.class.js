var Element = require('helpers-js').Element

/**
 * Skill listed in the Technical Experience section.
 * @module
 */
module.exports = class Skill {
  /**
   * Construct a new Skill object.
   * @param  {number} level proficiency with this skill; must be `1`–`Skill.LEVELS.length`
   * @param  {string} text custom HTML string defining this skill
   */
  constructor(level, text) {
    this._level = level
    this._text  = text
  }

  /**
   * Render a skill in HTML.
   * @return {string} HTML string
   */
  html() {
    return Element.concat(
      new Element('dt').class('o-Grid__Item')
        .attr('data-class','Skill.Text')
        .addContent(this._text),
      new Element('dd').class('o-Grid__Item')
        .attr('data-class','Skill.Level')
        .attr({
          'aria-label': Skill.LEVELS[this._level-1],
          title       : Skill.LEVELS[this._level-1], // fallback for aria-label
          itemscope   : '',
          itemtype    : 'http://schema.org/Rating',
        })
        .addElements([
          new Element('span').class('h-Hidden').addContent(Skill.LEVELS[this._level-1]), // when css is disabled, colors are not shown
          // new Element('meta').attr('itemprop','worstRating').attr('content',0),
          // new Element('meta').attr('itemprop','bestRating' ).attr('content',Skill.LEVELS.length),
          // new Element('meta').attr('itemprop','ratingValue').attr('content',this._level),
          new Element('meta').attr('itemprop','worstRating').attr('content',`${0}`),
          new Element('meta').attr('itemprop','bestRating' ).attr('content',`${Skill.LEVELS.length}`),
          new Element('meta').attr('itemprop','ratingValue').attr('content',`${this._level}`),
          new Element('svg').class('c-SkillViz').attr('viewbox','0 0 14 4').addElements([
            new Element('g').attr('transform','translate(1,2)').addElements(
              Skill.LEVELS.map(function (lvl, index) {
                return new Element('circle',true).class('c-SkillViz__Marker')
                  .addClass((index <= this._level-1) ? 'c-SkillViz__Marker--true' : '')
                  // .attr('cx',3*index).attr('cy',0).attr('r',1)
                  .attr('cx',`${3*index}`).attr('cy',`${0}`).attr('r',`${1}`)
              }, this)
            ),
          ]),
        ])
    )
  }

  /**
   * An array possible skill levels in increasing order.
   * @type {Array<string}>}
   */
  static get LEVELS() {
    return [
      'beginner',
      'novice',
      'competent',
      'proficient',
      'expert',
    ]
  }
}
