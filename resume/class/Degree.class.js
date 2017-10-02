const Element = require('extrajs-dom').Element

/**
 * An degree I’ve earned from a university.
 * @class
 */
class Degree {
  /**
   * @summary Construct a new Degree object.
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
   * @summary Render this degree in HTML.
   * @description Displays:
   * - `Degree#view()` - default display
   * @returns {Degree.View} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * @extends Function
     */
    Degree.View = class extends Function {
      /**
       * Default display. Takes no arguments.
       * Return a <dt>–<dd> pair of elements:
       * <dt> degree text, <dd> degree year.
       * @summary Call `Degree#view()` to render this display.
       * @returns {string} HTML output
       */
      constructor() {
        function returned() {
          // REVIEW INDENTATION
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
        }
        super(`return '${returned.call(self)}'`)
      }
    }
    return new Degree.View()
  }
}

module.exports = Degree
