const Element = require('extrajs-element')

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
   * Return this skill’s text content.
   * @return {string} this._text
   */
  get text() {
    return this._text.slice()
  }

  /**
   * Render this skill in HTML.
   * Displays:
   * - `Skill#view()` - default display
   * @return {string} HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> skill name, <dd> visualization of skill level.
       * Call `Skill#view()` to render this display.
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        return Element.concat(
          new Element('dt').class('o-Grid__Item')
            .attr('data-instanceof','Skill.Text')
            .addContent(this._text),
          new Element('dd').class('o-Grid__Item')
            .attr('data-instanceof','Skill.Level')
            .attr({
              itemscope   : '',
              itemtype    : 'http://schema.org/Rating',
            })
            .addElements([
              new Element('span').class('o-Textbox c-Label c-Label--skss h-Hidden').addContent(Skill.LEVELS[this._level-1]), // TODO create a component; see _hack.less
              new Element('meta').attr('itemprop','worstRating').attr('content',0),
              new Element('meta').attr('itemprop','bestRating' ).attr('content',Skill.LEVELS.length),
              new Element('meta').attr('itemprop','ratingValue').attr('content',this._level),
              new Element('svg').class('c-SkillViz').attr('viewbox','0 0 14 4').addElements([
                new Element('g').attr('transform','translate(1,2)').addElements(
                  Skill.LEVELS.map(function (lvl, index) {
                    return new Element('circle',true).class('c-SkillViz__Marker')
                      .addClass((index <= this._level-1) ? 'c-SkillViz__Marker--true' : '')
                      .attr('cx',3*index).attr('cy',0).attr('r',1)
                  }, this)
                ),
              ]),
            ])
        )
      }).call(self)
    }
    return returned
  }



  /**
   * An array possible skill levels in increasing order.
   * @type {Array<string>}
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
