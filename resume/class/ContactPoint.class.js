const Element = require('extrajs-dom').Element

/**
 * Piece of contact information in resume.
 * @module
 */
module.exports = class ContactPoint {
  /**
   * Construct a new ContactPoint object.
   * @param  {string} url url of the link
   * @param  {string} octicon octicon CSS class of the icon
   * @param  {string} content text content of the link
   * @param  {string=} itemprop itemprop Microdata of the contact point
   */
  constructor(url, octicon, content, itemprop = '') {
    this._url      = url
    this._octicon  = octicon
    this._content  = content
    this._itemprop = itemprop
  }

  /**
   * Render this contact point in HTML.
   * Displays:
   * - `ContactPoint#view()` - default display
   * @returns {function(?):string} a function returning HTML output
   */
  get view() {
    let self = this
      /**
       * Default display. Takes no arguments.
       * Return a <a.c-Contact__Link> subcomponent displaying a contact item.
       * Call `ContactPoint#view()` to render this display.
       * @memberof ContactPoint.view
       * @return {string} HTML output
       */
    function returned() {
      return (function () {
        return new Element('a').class('c-Contact__Link h-Block')
          .attr('href', this._url)
          .attr('itemprop', this._itemprop || null)
          .addElements([
            new Element('div').class('c-Contact__Icon octicon').addClass(this._octicon).attr('role','none'),
            new Element('div').addContent(this._content),
          ]).html()
      }).call(self)
    }
    return returned
  }
}
