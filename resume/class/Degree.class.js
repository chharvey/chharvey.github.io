const Element = require('extrajs-dom').Element
const View = require('extrajs-view')

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
   * @summary Render this award in HTML.
   * @see Degree.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Degree#view()` - default display
     * @namespace Degree.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <dt>–<dd> pair of elements:
     * <dt> degree text, <dd> degree year.
     * @summary Call `Degree#view()` to render this display.
     * @function Degree.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      // REVIEW INDENTATION
          return Element.concat([
            new Element('dt').class('o-ListAchv__Award h-Inline')
              .attr('data-instanceof','Degree.Text')
              .attr('itemprop','award')
              .addContent([
                `${this._field}, `,
                new Element('span').attr({ itemscope:'', itemtype:'http://schema.org/Rating' })
                  .addContent([
                    new Element('meta').attr('itemprop','worstRating').attr('content',0),
                    new Element('span').attr('itemprop','ratingValue').addContent(this._gpa),
                    `/`,
                    new Element('span').attr('itemprop','bestRating').addContent(`4.0 `),
                    new Element('abbr').class('c-Acro').attr('title','Grade Point Average').attr('itemprop','name').addContent(`GPA`),
                  ]),
              ]),
            new Element('dd').class('o-ListAchv__Date h-Inline h-Clearfix')
              .attr('data-instanceof','Degree.Year')
              .addContent([
                `(`,
                (this._year > 0) ?
                  new Element('time').addContent(this._year)
                : new Element('small').addContent(`in progress`),
                `)`,
              ]),
          ])
    }, this)
  }
}

module.exports = Degree
