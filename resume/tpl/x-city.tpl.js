const path = require('path')

const xjs = {
  ...require('extrajs-dom'),
}

const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

/**
 * @summary xCity renderer.
 * @param   {DocumentFragment} frag the template conent with which to render
 * @param   {sdo.Place} data the data to fill the template
 * @param   {boolean=} data.$full `true` to display the full (non-abbreviated) region name
 */
function xCity_renderer(frag, data) {
  frag.querySelector('[itemprop="addressLocality"]'  ).textContent = data.address.addressLocality
  frag.querySelector('[itemprop="latitude"]'         ).content     = data.geo.latitude
  frag.querySelector('[itemprop="longitude"]'        ).content     = data.geo.longitude
  frag.querySelector('data[itemprop="addressRegion"]').value       = data.address.addressRegion
  frag.querySelector('slot[name="region-code"]'      ).textContent = data.address.addressRegion
  frag.querySelector('slot[name="region-full"]'      ).textContent = ''
  if (data.$full) {
    let region_name;
    try {
      region_name = regionName(data.address.addressRegion)
    } catch (e) {
      console.error(e)
      region_name = ''
    }
    frag.querySelector('slot[name="region-full"]').textContent = region_name
    frag.querySelector('slot[name="region-code"]').remove()
  }
}

/**
 * Return the full name of a State given its code.
 * @private
 * @param   {string} region the region code
 * @param   {!Object=} options options for specifying the abbreviation
 * @returns {string} the full name of the region, specified by the options
 */
function regionName(region, options = {}) {
  try {
    return STATE_DATA.find((obj) => obj.code===region).name
  } catch (e) {
    e.message = `No data found for ${region}.`
    throw e
  }
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-city.tpl.html'))
  .setRenderer(xCity_renderer)
