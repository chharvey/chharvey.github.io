/**
 * @summary Skill display.
 * @param   {DocumentFragment} frag the template conent with which to render
 * @param   {sdo.Rating} data the data to fill the template
 * @returns {DocumentFragment} modified fragment
 */
function xSkill(frag, data) {
  frag.querySelector('dt'                      ).innerHTML   = data.name
  frag.querySelector('[itemprop="ratingValue"]').value       = data.ratingValue
  frag.querySelector('[itemprop="ratingValue"]').setAttribute('style', frag.querySelector('meter').getAttribute('style').replace('1', data.ratingValue)) // .style.setProperty('--fadein', this._level) // https://github.com/tmpvar/jsdom/issues/1895
  frag.querySelector('slot[name="percentage"]' ).textContent = 100 * (+data.ratingValue)
}

module.exports = xSkill
