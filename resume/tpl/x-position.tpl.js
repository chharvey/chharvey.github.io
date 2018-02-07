const xjs = require('extrajs')
const Component = require('../class/Component.class.js')
const City = require('../class/City.class.js')

/**
 * @summary Position display.
 * @param   {DocumentFragment} frag the template conent with which to render
 * @param   {sdo.JobPosting} data the data to fill the template
 * @returns {DocumentFragment} modified fragment
 */
function xPosition(frag, data) {
  let date_start = new Date(data.$start)
  let date_end   = (data.$end) ? new Date(data.$end) : null
  let descriptions = (typeof data.responsibilities === 'string') ? [data.responsibilities] : data.responsibilities || []

  frag.querySelector('.c-Position'       ).id        = data.identifier
  frag.querySelector('[itemprop="title"]').innerHTML = data.title
  frag.querySelector('[itemprop="hiringOrganization"]').setAttribute('itemtype', `http://schema.org/${data.hiringOrganization['@type']}`)
  frag.querySelector('[itemprop="hiringOrganization"] [itemprop="url"]').href       = data.hiringOrganization.url || ''
  frag.querySelector('[itemprop="hiringOrganization"] [itemprop="name"]').innerHTML = data.hiringOrganization.name
  frag.querySelectorAll('.c-Position__Dates > time')[0].dateTime    = date_start.toISOString()
  frag.querySelectorAll('.c-Position__Dates > time')[0].textContent = xjs.Date.format(date_start, 'M Y')
  frag.querySelector('.c-Position__Place > slot[name="city"]').innerHTML = new City(data.jobLocation).view() // TODO replace with x-city.tpl

  ;(function () {
    let container = frag.querySelector('.c-Position__Body')
    container.append(...descriptions.map((text) =>
      new Component(container.querySelector('template').content, function (f, d) {
        f.querySelector('li').innerHTML = d
      }).render(text))
    )
  })()

  if (!date_end) {
    frag.querySelectorAll('.c-Position__Dates > time')[2].dateTime    = new Date().toISOString()
    frag.querySelectorAll('.c-Position__Dates > time')[1].remove()
  } else {
    frag.querySelectorAll('.c-Position__Dates > time')[1].dateTime    = date_end.toISOString()
    frag.querySelectorAll('.c-Position__Dates > time')[1].textContent = xjs.Date.format(date_end, 'M Y')
    frag.querySelectorAll('.c-Position__Dates > time')[2].remove()
  }
  return frag
}

module.exports = xPosition
