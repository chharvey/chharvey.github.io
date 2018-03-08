const path = require('path')

const xjs = {
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
  frag.querySelector('slot[name="text"]' ).innerHTML = data.text
  frag.querySelector('slot[name="dates"]').innerHTML = data.dates

  let subs = frag.querySelector('.o-ListAchv__Award > .o-ListAchv')
  if (data.sub_awards) {
    subs.append(...data.sub_awards.map((s) => require(__filename).render(s._DATA)))
  } else subs.remove()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-award.tpl.html'))
  .setRenderer(xAward_renderer)
