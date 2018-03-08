const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary xProdev renderer.
 * @param   {DocumentFragment} frag the template conent with which to render
 * @param   {sdo.Event} data the data to fill the template
 * @param   {number} data.$pdh the number of professional development hours
 */
function xProdev_renderer(frag, data) {
  const {xCity} = require('../class/Resume.class.js').TEMPLATES
  let date_start = new Date(data.startDate)
  let date_end   = new Date(data.endDate  )
  let pdh = data.$pdh || 0

  frag.querySelector('.o-ListAchv__Award').setAttribute('itemtype', `http://schema.org/${data['@type']}`)
  frag.querySelector('[itemprop="name"]').innerHTML = data.name
  new xjs.HTMLElement(frag.querySelector('slot[name="city"]')).empty()
    .append(xCity.render(data.location || { "@type": "Place" }))
  frag.querySelector('.o-ListAchv__Award > time').dateTime    = `PT${pdh}H`
  frag.querySelector('.o-ListAchv__Award > time').textContent = `${pdh} hr`
  if (xjs.Date.sameDate(date_start, date_end)) {
    new xjs.HTMLTimeElement(frag.querySelector('[itemprop="startDate endDate"]'))
      .dateTime(date_end.toISOString())
      .textContent(xjs.Date.format(date_end, 'j M Y'))
    frag.querySelectorAll('.o-ListAchv__Date')[1].remove()
  } else {
    let same_UTC_date  = date_start.getUTCDate () === date_end.getUTCDate ()
    let same_UTC_month = date_start.getUTCMonth() === date_end.getUTCMonth()
    let same_UTC_year  = date_start.getFullYear() === date_end.getFullYear()
    let dates = frag.querySelectorAll('.o-ListAchv__Date')[1]
    new xjs.HTMLTimeElement(dates.querySelector('[itemprop="startDate"]'))
      .dateTime(date_start.toISOString())
      .textContent([
        date_start.getUTCDate(),
        (same_UTC_month && same_UTC_year) ? '' : ` ${xjs.Date.format(date_start, 'M')}`,
        (same_UTC_year) ? '' : ` ${date_start.getFullYear()}`,
      ].join(''))
    new xjs.HTMLTimeElement(dates.querySelector('[itemprop="endDate"]'))
      .dateTime(date_end.toISOString())
      .textContent(xjs.Date.format(date_end, 'j M Y'))
    new xjs.HTMLElement(dates).trimInner()
    frag.querySelectorAll('.o-ListAchv__Date')[0].remove()
  }
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-prodev.tpl.html'))
  .setRenderer(xProdev_renderer)
