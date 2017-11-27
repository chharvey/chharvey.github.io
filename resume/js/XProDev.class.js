const xjs = require('extrajs')

class XProDev extends HTMLElement {
  constructor() {
    super()
    this._name = this.querySelector('name').innerHTML

    this._itemtype = this.getAttribute('type')
    this._pdh      = this.getAttribute('pdh')

    this._date_start = new Date(this.getAttribute('start'))
    this._date_end   = new Date(this.getAttribute('end'))

    this._locality  = this.getAttribute('city')
    this._region    = this.getAttribute('state')
    this._latitude  = this.getAttribute('lat')
    this._longitude = this.getAttribute('lon')

    let frag = XProDev.TEMPLATE.content.cloneNode(true)
    frag.querySelector('.o-ListAchv__Award').setAttribute('itemtype', this._itemtype)
    frag.querySelector('[itemprop="name"]').innerHTML = this._name
    frag.querySelector('x-city').setAttribute('locality' , this._locality)
    frag.querySelector('x-city').setAttribute('region'   , this._region)
    frag.querySelector('x-city').setAttribute('latitude' , this._latitude)
    frag.querySelector('x-city').setAttribute('longitude', this._longitude)
    frag.querySelector('.o-ListAchv__Award > time').dateTime    = `PT${this._pdh}H`
    frag.querySelector('.o-ListAchv__Award > time').textContent = `${this._pdh} hr`
    frag.querySelector('[itemprop="startDate endDate"]').dateTime    = this._date_end.toISOString()
    frag.querySelector('[itemprop="startDate endDate"]').textContent = xjs.Date.format(this._date_end, 'j M Y')
    ;(function (dates) {
      let same_UTC_date  = this._date_start.getUTCDate()  === this._date_end.getUTCDate()
      let same_UTC_month = this._date_start.getUTCMonth() === this._date_end.getUTCMonth()
      let same_UTC_year  = this._date_start.getFullYear() === this._date_end.getFullYear()
      dates.querySelector('[itemprop="startDate"]').dateTime    = this._date_start.toISOString()
      dates.querySelector('[itemprop="startDate"]').textContent = [
        this._date_start.getUTCDate(),
        (same_UTC_month && same_UTC_year) ? '' : ` ${xjs.Date.format(this._date_start, 'M')}`,
        (same_UTC_year) ? '' : ` ${this._date_start.getFullYear()}`,
      ].join('')
      dates.querySelector('[itemprop="endDate"]').dateTime    = this._date_end.toISOString()
      dates.querySelector('[itemprop="endDate"]').textContent = xjs.Date.format(this._date_end, 'j M Y')
    }).call(this, frag.querySelectorAll('.o-ListAchv__Date')[1])
    if (xjs.Date.sameDate(this._date_start, this._date_end)) {
      frag.querySelectorAll('.o-ListAchv__Date')[1].remove()
    } else {
      frag.querySelectorAll('.o-ListAchv__Date')[0].remove()
    }
    this.parentNode.appendChild(frag)
    this.remove()
  }
  static get TEMPLATE() {
    return document.querySelector('link[rel="import"][href$="x-prodev.tpl.html"]').import.querySelector('template')
  }
}

module.exports = XProDev
