var Element = require('./Element.class.js')

/**
 * Skill listed in the Technical Experience section.
 * @module
 */
module.exports = class Skill {
  /**
   * Construct a new Skill object.
   * @param  {number} level proficiency with this skill; must be `0`–`Skill.LEVELS.length`
   * @param  {string} text custom HTML string defining this skill
   */
  constructor(level, text) {
    this._level = level
    this._text  = text
  }

  /**
   * Render a skill in HTML.
   * @param  {Object=} options options for rendering this skill
   * @param  {string=} options.positive classname to add when the marker indicator is positive
   * @return {string} HTML string
   */
  html(options = {}) {
    let positive = options.positive || 'c-LangViz__Marker--pos'
    return [
      new Element('dt').class('o-ListLangs__Text h-Inline')
        .addContent(this._text),
      new Element('dd').class('o-ListLangs__Viz h-Inline h-Clearfix')
        .attr('title',Skill.LEVELS[this._level-1]).attr('itemscope','').attr('itemtype','http://schema.org/Rating')
        .addElements([
          new Element('meta',true).attr('itemprop','worstRating').attr('content',0),
          new Element('meta',true).attr('itemprop','bestRating' ).attr('content',Skill.LEVELS.length),
          new Element('meta',true).attr('itemprop','ratingValue').attr('content',this._level),
          new Element('svg').class('c-LangViz').attr('viewbox','0 0 15 4').addElements([
            new Element('g').attr('transform','translate(2,2)').addElements(
              Skill.LEVELS.map(function (lvl, index) {
                return new Element('circle',true).class('c-LangViz__Marker')
                  .addClass((index <= this._level-1) ? positive : '')
                  .attr('cx',3*index).attr('cy',0).attr('r',1)
              }, this)
            ),
          ]),
        ]),
    ].map((el) => el.render()).join('')
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
