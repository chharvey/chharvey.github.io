const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

/**
 * @summary xAward renderer.
 * @param {DocumentFragment} frag the template conent with which to render
 * @param {{dates:string, text:string}} data the data to fill the template
 * @param {string} data.dates date(s) relevant to the award
 * @param {string} data.text  custom HTML string defining this award
 * @param {Array<{dates:string, text:string}>=} sub_awards any sub-awards associated with this award
 */
function xAward_renderer(frag, data) {
  /**
   * @summary Generate content from strings.
   * @private
   * @param   {(string|Array<string>)} x a string, or array of strings
   * @returns {string} the string, or the joined array
   */
  function _content(x) { // TODO don’t use arrays for line breaks
    return (xjs.Object.typeOf(x) === 'array') ? x.join('') : x
  }
  frag.querySelector('slot[name="text"]' ).innerHTML = _content(data.text)
  frag.querySelector('slot[name="dates"]').innerHTML = data.dates

  let subs = frag.querySelector('.o-ListAchv__Award > .o-ListAchv')
  if (data.sub_awards) {
    subs.append(...data.sub_awards.map((s) => require(__filename).render(s)))
  } else subs.remove()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-award.tpl.html'))
  .setRenderer(xAward_renderer)
