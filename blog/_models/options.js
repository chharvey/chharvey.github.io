// Options and locals for compiling Pug pages.

module.exports = {
  basedir : './'
, Page    : require('sitepage').Page
, Home    : require('../../_models/Home.class.js')
, BlogPost: require('./BlogPost.class.js')
, entities  : require('./entities.js')
}
