const path = require('path')

const xjs = {
  ...require('extrajs-dom'),
}

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

const xAddress = require('aria-patterns/tpl/x-address.tpl.js')


/**
 * @summary xCity renderer.
 * @param   {DocumentFragment} frag the template conent with which to render
 * @param   {sdo.City} data the data to fill the template
 * @param   {string=} data.$itemprop the value of the `[itemprop]` attribute to write, if any
 * @param   {boolean=} data.$full `true` to display the full (non-abbreviated) region name
 */
function xCity_renderer(frag, data) {
  new xjs.HTMLElement(frag.querySelector('[itemtype="http://schema.org/City"]'))
    .attr('itemprop', data.$itemprop || null)
  new xjs.HTMLElement(frag.querySelector('slot[name="address"]')).empty()
    .append(xAddress.render({ ...data.address, $itemprop: 'address', $regionName: true }))
  frag.querySelector('[itemprop="latitude"]'         ).content     = data.geo.latitude
  frag.querySelector('[itemprop="longitude"]'        ).content     = data.geo.longitude
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-city.tpl.html'))
  .setRenderer(xCity_renderer)
