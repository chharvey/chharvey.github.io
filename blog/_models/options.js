// Options and locals for compiling Pug pages.

module.exports = {
  basedir : './'
, Page    : require('sitepage').Page
, groups  : require('./entities.js').groups
, entities  : require('./entities.js').entities
}
