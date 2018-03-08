const path = require('path')

const xjs = {
  ...require('extrajs-dom'),
}

/**
 * @summary xDegree renderer.
 * @param {DocumentFragment} frag the template conent with which to render
 * @param {!Object} data the data to fill the template
 * @param {number}  data.year year the degree was earned
 * @param {number}  data.gpa grade-point-average
 * @param {string}  data.field type and field of the degree
 */
function xDegree_renderer(frag, data) {
  frag.querySelector('[itemprop="name"]'       ).innerHTML   = data.field
  frag.querySelector('[itemprop="ratingValue"]').textContent = data.gpa
  if (data.year > 0) {
    frag.querySelector('[itemprop="timeEarned"]'  ).textContent = data.year
    frag.querySelector('.o-ListAchv__Date > small').remove()
  } else {
    frag.querySelector('[itemprop="timeEarned"]').remove()
  }
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-degree.tpl.html'))
  .setRenderer(xDegree_renderer)
