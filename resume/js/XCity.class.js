const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

class XCity extends HTMLElement {
  constructor() {
    super()
    this._locality  = this.getAttribute('locality')
    this._region    = this.getAttribute('region')
    this._latitude  = this.getAttribute('latitude')
    this._longitude = this.getAttribute('longitude')
    let frag = XCity.TEMPLATE.content.cloneNode(true)
    frag.querySelector('[itemprop="addressLocality"]').textContent = this._locality
    frag.querySelector('[itemprop="addressRegion"]'  ).textContent = this._region
    frag.querySelector('[itemprop="latitude"]'       ).content     = this._latitude
    frag.querySelector('[itemprop="longitude"]'      ).content     = this._longitude
    try {
      frag.querySelector('[itemprop="addressRegion"]').title = STATE_DATA.find((obj) => obj.code===this._region).name
    } catch (e) {
      console.error(`No data found for ${this._region}.`)
      frag.querySelector('[itemprop="addressRegion"]').removeAttribute('title')
    }
    this.appendChild(frag)
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-city.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XCity
