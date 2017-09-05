var Element = require('helpers-js').Element

/**
 * An degree I’ve earned from a university.
 * @module
 */
module.exports = class Degree {
  /**
   * Construct a new Degree object.
   * @param {number} year year the degree was earned
   * @param {number} gpa grade-point-average
   * @param {string} field type and field of the degree
   */
  constructor(year, gpa, field) {
    this._year  = year
    this._gpa   = gpa
    this._field = field
  }

  /**
   * Render a degree in HTML.
   * @return {string} HTML string
   */
  html() {
    return Element.concat(
      new Element('dt').class('o-ListAchv__Award h-Inline')
        .attr('data-class','Degree.Text')
        .attr('itemprop','award')
        .addContent(`${this._field}, `)
        .addElements([
          new Element('span').attr('itemscope','').attr('itemtype','http://schema.org/Rating')
            .addElements([
              // new Element('meta').attr('itemprop','worstRating').attr('content',0),
              // new Element('span').attr('itemprop','ratingValue').addContent(this._gpa),
              new Element('meta').attr('itemprop','worstRating').attr('content','0'),
              new Element('span').attr('itemprop','ratingValue').addContent(`${this._gpa}`),
            ])
            .addContent(`/`)
            .addElements([
              new Element('span').attr('itemprop','bestRating').addContent(`4.0 `),
              new Element('abbr').class('c-Acro').attr('title','Grade Point Average').attr('itemprop','name').addContent(`GPA`),
            ]),
        ]),
      new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
        .attr('data-class','Degree.Level')
        .addContent(`(`)
        .addElements([
          (!(this._year > 0)) ? new Element('small').addContent(`in progress`) : new Element('time').addContent(this._year)
        ])
        .addContent(`)`)
    )
  }
}
