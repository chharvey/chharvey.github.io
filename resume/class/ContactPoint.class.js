const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')

const View = require('extrajs-view')

/**
 * Piece of contact information in resume.
 * @class
 */
class ContactPoint {
  /**
   * @summary Construct a new ContactPoint object.
   * @param  {!Object} jsondata JSON object of type {@link http://schema.org/ContactPoint}
   * @param  {string} jsondata.$octicon octicon CSS class of the icon
   * @param  {string=} jsondata.name display text of the link
   * @param  {string=} jsondata.contactType type of contact point
   * @param  {string=} jsondata.url url of the link
   * @param  {string=} jsondata.telephone telephone number
   * @param  {string=} jsondata.email email address
   */
  constructor(jsondata) {
    /**
     * All the data for this object.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary Render this award in HTML.
   * @see ContactPoint.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `ContactPoint#view()` - default display
     * @namespace ContactPoint.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return a <a.c-Contact__Link> subcomponent displaying a contact item.
     * @summary Call `ContactPoint#view()` to render this display.
     * @function ContactPoint.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      const dom = new jsdom.JSDOM(fs.readFileSync(path.join(__dirname, '../tpl/x-contactlink.tpl.html'), 'utf8'))
      const document = dom.window.document
      const template = document.querySelector('template')
      let frag = template.content.cloneNode(true)
      let href = ({
        url      : this._DATA.url,
        email    : `mailto:${this._DATA.email}`,
        telephone: `tel:${this._DATA.telephone}`,
        default  : null,
      })[this._DATA.contactType || 'default']
      if (href) {
        frag.querySelector('.c-Contact__Link').href = href
      } else {
        frag.querySelector('.c-Contact__Link').removeAttribute('href')
      }
      if (this._DATA.contactType) {
        frag.querySelector('.c-Contact__Link').setAttribute('itemprop', this._DATA.contactType)
        frag.querySelector('meta[itemprop="contactType"]').setAttribute('content', this._DATA.contactType)
      } else {
        frag.querySelector('.c-Contact__Link').removeAttribute('itemprop')
        frag.querySelector('meta[itemprop="contactType"]').remove()
      }
      frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ this._DATA.$octicon }}', this._DATA.$octicon)
      frag.querySelector('.c-Contact__Text').textContent = this._DATA.name || this._DATA.url || this._DATA.email || this._DATA.telephone || ''
      if (!this._DATA.name) frag.querySelector('.c-Contact__Text').removeAttribute('itemprop')

      let div = document.createElement('div')
      div.append(frag)
      return div.innerHTML
    }, this)
  }
}

module.exports = ContactPoint
