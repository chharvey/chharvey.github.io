const Element = require('extrajs-element')

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
   * Render this degree in HTML.
   * Displays:
   * - `Degree#view()` - default display
   * @return {string} HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> degree text, <dd> degree year.
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        return Element.concat(
          new Element('dt').class('o-ListAchv__Award h-Inline')
            .attr('data-instanceof','Degree.Text')
            .attr('itemprop','award')
            .addContent(`${this._field}, `)
            .addElements([
              new Element('span').attr('itemscope','').attr('itemtype','http://schema.org/Rating')
                .addElements([
                  new Element('meta').attr('itemprop','worstRating').attr('content',0),
                  new Element('span').attr('itemprop','ratingValue').addContent(this._gpa),
                ])
                .addContent(`/`)
                .addElements([
                  new Element('span').attr('itemprop','bestRating').addContent(`4.0 `),
                  new Element('abbr').class('c-Acro').attr('title','Grade Point Average').attr('itemprop','name').addContent(`GPA`),
                ]),
            ]),
          new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
            .attr('data-instanceof','Degree.Year')
            .addContent(`(`)
            .addElements([
              (this._year > 0) ? new Element('time').addContent(this._year) : new Element('small').addContent(`in progress`)
            ])
            .addContent(`)`)
        )
      }).call(self)
    }
    return returned
  }
}
