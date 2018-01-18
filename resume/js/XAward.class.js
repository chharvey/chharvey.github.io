const xjs = {
  Node: require('extrajs-dom').Node,
}

class XAward extends HTMLElement {
  constructor() {
    super()
    this._dates = this.querySelector('dates').innerHTML
    this._text  = this.querySelector('text' ).innerHTML

    let frag = XAward.TEMPLATE.content.cloneNode(true)
    frag.querySelector('.o-ListAchv__Award').innerHTML = this._text + frag.querySelector('dt').innerHTML.replace('{{ this._text }}', '')
    ;(function (dates) {
      xjs.Node.empty(dates)
      dates.innerHTML = this._dates
      dates.prepend('(')
      dates.append(')')
    }).call(this, frag.querySelector('.o-ListAchv__Date'))
    ;(function (subs) {
      if (this.querySelector('dl')) {
        xjs.Node.empty(subs)
        subs.append(...this.querySelector('dl').children)
      } else {
        subs.remove()
      }
    }).call(this, frag.querySelector('.o-ListAchv__Award > .o-ListAchv'))
    this.parentNode.appendChild(frag)
    this.remove()
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-award.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XAward
