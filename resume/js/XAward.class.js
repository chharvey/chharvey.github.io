class XAward extends HTMLElement {
  constructor() {
    super()
    this._dates = this.querySelector('dates').innerHTML
    this._text  = this.querySelector('text' ).innerHTML
    let frag = XAward.TEMPLATE.content.cloneNode(true)
    frag.querySelector('dt').innerHTML = this._text
    ;(function (dates) {
      while (dates.childNodes.length) { dates.firstChild.remove() } // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
      dates.innerHTML = this._dates
      dates.prepend('(')
      dates.append(')')
    }).call(this, frag.children[1]) // FIXME `.querySelector('dd')` might select sub-awards
    this.parentNode.appendChild(frag)
    this.remove()
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-award.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XAward
