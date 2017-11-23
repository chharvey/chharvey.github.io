const xjs = require('extrajs')

class XPosition extends HTMLElement {
  constructor() {
    super()
    this._name = this.querySelector('name').innerHTML

    this._org_name = this.querySelector('org').innerHTML
    this._org_type = this.getAttribute('type')
    this._org_url  = this.getAttribute('url')

    this._date_start = new Date(this.getAttribute('start'))
    this._date_end   = new Date(this.getAttribute('end'))

    this._locality  = this.getAttribute('city')
    this._region    = this.getAttribute('state')
    this._latitude  = this.getAttribute('lat')
    this._longitude = this.getAttribute('lon')

    this._descriptions = this.querySelector('ul').innerHTML

    let frag = XPosition.TEMPLATE.content.cloneNode(true)
    frag.querySelector('.c-Position').setAttribute('itemtype', this._org_type)
    frag.querySelector('.c-Position__Name').innerHTML = this._name
    frag.querySelector('.c-Position__Org > a').href = this._org_url
    frag.querySelector('.c-Position__Org > a').innerHTML = this._org_name
    frag.querySelector('.c-Position__Dates > time:nth-child(1)').datetime    = this._date_start.toISOString()
    frag.querySelector('.c-Position__Dates > time:nth-child(1)').textContent = xjs.Date.format(this._date_start, 'M Y')
    frag.querySelector('.c-Position__Dates > time:nth-child(2)').datetime    = this._date_end.toISOString()
    frag.querySelector('.c-Position__Dates > time:nth-child(2)').textContent = xjs.Date.format(this._date_end, 'M Y')
    frag.querySelector('.c-Position__Dates > time:nth-child(3)').datetime = this._date_end.toISOString()
    frag.querySelector('.c-Position__Place').innerHTML = `(${[this._locality, this._region].join(', ')})`
    frag.querySelector('.c-Position__Body').innerHTML = this._descriptions
    if (xjs.Date.sameDate(this._date_end, new Date())) {
      frag.querySelector('.c-Position').setAttribute('itemprop', 'worksFor')
      frag.querySelector('.c-Position__Dates > time:nth-child(2)').remove()
    } else {
      frag.querySelector('.c-Position').removeAttribute('itemprop')
      frag.querySelector('.c-Position__Dates > time:nth-child(3)').remove()
    }
    while (this.childNodes.length) { this.firstChild.remove() }
    this.appendChild(frag)
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-position.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XPosition
