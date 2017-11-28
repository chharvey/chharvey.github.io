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
    frag.querySelector('[itemprop="jobTitle"]').innerHTML = this._name
    frag.querySelector('[itemprop="url"]').href           = this._org_url
    frag.querySelector('[itemprop="url"]').innerHTML      = this._org_name
    frag.querySelectorAll('.c-Position__Dates > time')[0].datetime    = this._date_start.toISOString()
    frag.querySelectorAll('.c-Position__Dates > time')[0].textContent = xjs.Date.format(this._date_start, 'M Y')
    frag.querySelectorAll('.c-Position__Dates > time')[1].datetime    = this._date_end.toISOString()
    frag.querySelectorAll('.c-Position__Dates > time')[1].textContent = xjs.Date.format(this._date_end, 'M Y')
    frag.querySelectorAll('.c-Position__Dates > time')[2].datetime    = this._date_end.toISOString()
    ;(function (place) {
      while (place.childNodes.length) { place.firstChild.remove() } // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
      let city = document.createElement('x-city')
      city.setAttribute('locality' , this._locality)
      city.setAttribute('region'   , this._region)
      city.setAttribute('latitude' , this._latitude)
      city.setAttribute('longitude', this._longitude)
      place.append(new Text('('), city, new Text(')'))
    }).call(this, frag.querySelector('.c-Position__Place'))
    frag.querySelector('.c-Position__Body').innerHTML = this._descriptions
    if (xjs.Date.sameDate(this._date_end, new Date())) {
      frag.querySelector('.c-Position').setAttribute('itemprop', 'worksFor')
      frag.querySelectorAll('.c-Position__Dates > time')[1].remove()
    } else {
      frag.querySelector('.c-Position').removeAttribute('itemprop')
      frag.querySelectorAll('.c-Position__Dates > time')[2].remove()
    }
    while (this.childNodes.length) { this.firstChild.remove() } // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
    this.appendChild(frag)
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-position.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XPosition
