class XContactLink extends HTMLElement {
  constructor() {
    super()
    this._url      = this.getAttribute('url')
    this._octicon  = this.getAttribute('icon')
    this._itemprop = this.getAttribute('prop')
    this._content  = this.innerHTML
    let frag = XContactLink.TEMPLATE.content.cloneNode(true)
    frag.querySelector('.c-Contact__Link').href = this._url
    if (this._itemprop) {
      frag.querySelector('.c-Contact__Link').setAttribute('itemprop', this._itemprop)
    } else {
      frag.querySelector('.c-Contact__Link').removeAttribute('itemprop')
    }
    frag.querySelector('.c-Contact__Icon').className = frag.querySelector('.c-Contact__Icon').className.replace('{{ this._octicon }}', this._octicon)
    frag.querySelector('.c-Contact__Text').innerHTML = this._content
    while (this.childNodes.length) { this.firstChild.remove() } // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
    this.appendChild(frag)
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-contactlink.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XContactLink
