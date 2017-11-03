// Options and locals for compiling Pug pages.

module.exports = {
  basedir : './',
  Page    : require('sitepage').Page,
  BlogPost: require('still-alive').BlogPost,
  Home    : require('../../_models/Home.class.js'),
  entities  : require('./entities.json'),
}
