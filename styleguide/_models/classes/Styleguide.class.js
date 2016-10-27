var Page = require('sitepage').Page

/**
 * A set of static members used for the site style guide.
 * Similar to a utility class.
 * @type {Styleguide}
 */
module.exports = (function () {
  // CONSTRUCTOR
  function Styleguide() {}

  // METHODS

  // STATIC MEMBERS
  /**
   * The style guide site for this project.
   * @type {Page}
   */
  Styleguide.PAGES = (function () {
    return new Page({ name: 'Chris Harvey – Site Design', url: '/styleguide/' })
      .title('Portfolio Style Guide')
      .add(new Page({ name: 'Mathematical Background', url: 'phi.html'}))
      .add(new Page({ name: 'Coding Style'           , url: 'code.html' }))
      .add(new Page({ name: 'Site Schemes'           , url: 'visual.html' }))
      .add(new Page({ name: 'Base Typography'        , url: 'base.html' }))
      .add(new Page({ name: 'Objects'                , url: 'obj.html' }))
      .add(new Page({ name: 'Typo Components'        , url: 'comp-typo.html' }))
      .add(new Page({ name: 'UI Components'          , url: 'comp-ui.html' }))
      .add(new Page({ name: 'Helpers'                , url: 'help.html' }))
      .add(new Page({ name: 'Atoms'                  , url: 'atom.html' }))
  })()

  /**
   * Set of fonts used on the site.
   * @type {Object}
   */
  Styleguide.FONT_SCHEME = {
    base : {
      name    : 'Avenir Next'
    , class   : 'a-ff-base'
    , sample  : 'The quick brown fox jumps over the lazy dog.'
    , similar : [ 'Helvetica Neue' ]
    }
  , heading : {
      name    : 'Optima'
    , class   : 'a-ff-heading'
    , sample  : 'Oh, sphinx of black quartz, judge my vow.'
    , similar : [ 'Seravek' , 'Tahoma' ]
    }
  , prose : {
      name    : 'Baskerville'
    , class   : 'a-ff-prose'
    , sample  : 'The five boxing wizards jump quickly.'
    , similar : [ 'Palatino' , 'Cochin' ]
    }
  , accent : {
      name    : 'Helvetica Neue'
    , class   : 'a-ff-accent'
    , sample  : 'Heavy boxes perform quick waltzes and jigs.'
    , similar : [ 'Helvetica' ]
    }
  , code : {
      name    : 'Menlo'
    , class   : 'a-ff-code'
    , sample  : 'The quick brown fox jumps over the lazy dog.'
    , similar : [ 'Monaco' , 'Andale Mono' ]
    }
  , math : {
      name    : 'Didot'
    , class   : 'a-ff-math'
    , sample  : 'Sixty zippers were quickly picked from the woven jute bag.'
    , similar : [ 'Bodoni 72' , 'Times' ]
    }
  , script : {
      name    : 'Zapfino'
    , class   : 'a-ff-script'
    , sample  : 'The quick brown fox jumps over the lazy dog.'
    }
  }

  /**
   * Set of colors used on the site.
   * @type {Object}
   */
  Styleguide.COLOR_SCHEME = {
    aperturewhite : {
      name        : 'Aperture White'
    , code_dfn    : 'hsv(217,   5%, 100%)'
    , code_hex    : '#f2f7ff'
    , bg_class    : 'a-bc-aperturewhite'
    , uses        : [ 'body background' ]
    }
  , apertureblack : {
      name        : 'Aperture Black'
    , code_dfn    : 'hsv( 37, 100%,   5%)'
    , code_hex    : '#0d0800'
    , bg_class    : 'a-bc-apertureblack'
    , is_dark     : true
    , uses        : [ 'body text' ]
    }
  , lakesuperior : {
      name        : 'Lake Superior'
    , code_dfn    : 'hsv(247, 100%,  60%)'
    , code_hex    : '#120099'
    , bg_class    : 'a-bc-lakesuperior'
    , is_dark     : true
    , uses        : [ 'major heading text' , 'ledes and drop caps' ]
    }
  , facilityabyss : {
      name        : 'Facility Abyss'
    , code_dfn    : 'hsv(187,  40%,  40%)'
    , code_hex    : '#3d6166'
    , bg_class    : 'a-bc-facilityabyss'
    , is_dark     : true
    , uses        : [ 'minor heading text' ]
    }
  , atlas : {
      name        : 'Atlas'
    , code_dfn    : 'hsv(217, 100%, 100%)'
    , code_hex    : '#0062ff'
    , bg_class    : 'a-bc-atlas'
    , is_dark     : true
    , uses        : [ 'link text' ]
    }
  , pbody : {
      name     : 'P-Body'
    , code_dfn : 'hsv( 37, 100%, 100%)'
    , code_hex : '#ff9d00'
    , bg_class : 'a-bc-pbody'
    , uses     : [ 'hover link text' ]
    }
  , cavescaves : {
      name     : 'Cave’s Caves'
    , code_dfn : 'hsv( 28,  66.6%,  50%)'
    , code_hex : '#80522b'
    , bg_class : 'a-bc-cavescaves'
    , is_dark  : true
    }
  , asbestos : {
      name     : 'Asbestos'
    , code_dfn : 'hsv( 46, 100.0%,  75%)'
    , code_hex : '#bf9300'
    , bg_class : 'a-bc-asbestos'
    }
  , repulsion : {
      name     : 'Repulsion Gel'
    , code_dfn : 'hsv(202,  80.0%, 100%)'
    , code_hex : '#33b4ff'
    , bg_class : 'a-bc-repulsion'
    , uses     : [ 'code/kbd/samp on print' ]
    }
  , propulsion : {
      name     : 'Propulsion Gel'
    , code_dfn : 'hsv( 22,  80.0%, 100%)'
    , code_hex : '#ff7e33'
    , bg_class : 'a-bc-propulsion'
    , uses     : [ 'subheading text' ]
    }
  , deploying : {
      name     : 'Deploying'
    , code_dfn : 'hsv(  7,  80%, 100%)'
    , code_hex : '#ff4b33'
    , bg_class : 'a-bc-deploying'
    , uses     : [ 'Danger components' ]
    }
  , hereye : {
      name     : 'HER Eye'
    , code_dfn : 'hsv( 52,  80%, 100%)'
    , code_hex : '#ffe433'
    , bg_class : 'a-bc-hereye'
    , uses     : [ 'Caution components' ]
    }
  , neurotoxin : {
      name     : 'Neurotoxin'
    , code_dfn : 'hsv( 97,  40%,  80%)'
    , code_hex : '#9acc7a'
    , bg_class : 'a-bc-neurotoxin'
    , uses     : [ 'Success components' ]
    }
  , bridges : {
      name     : 'Bridges of Light'
    , code_dfn : 'hsv(202,  40%, 100%)'
    , code_hex : '#99daff'
    , bg_class : 'a-bc-bridges'
    , uses     : [ 'Info components' ]
    }
  , companion : {
      name     : 'Heart of a Companion'
    , code_dfn : 'hsv(337,  40%, 100%)'
    , code_hex : '#ff99c0'
    , bg_class : 'a-bc-companion'
    , uses     : [ 'Help components' ]
    }
  , vilify : {
      name     : 'Vilify'
    , code_dfn : 'hsv(277, 100%, 100%)'
    , code_hex : '#9d00ff'
    , bg_class : 'a-bc-vilify'
    , uses     : [ 'alert links' ]
    }
  , graylite : {
      name     : 'Aperture Gray Lite'
    , code_dfn : 'mix(mix(@aperturewhite, @apertureblack, 80%), @pbody, 95%)'
    , code_hex : '#c7c5c2'
    , bg_class : 'a-bc-graylite'
    , uses     : [ 'light component default' ]
    }
  , graydark : {
      name     : 'Aperture Gray Dark'
    , code_dfn : 'mix(mix(@apertureblack, @aperturewhite, 80%), @atlas, 95%)'
    , code_hex : '#383a3d'
    , bg_class : 'a-bc-graydark'
    , is_dark  : true
    , uses     : [ 'dark component default' ]
    }
  }

  /**
   * Set of translucent colors, shades and tints, used on the site.
   * @type {Object}
   */
  Styleguide.TRANS_SCHEME = {
    tintlight : {
      name      : 'Tint Light'
    , code_dfn  : 'fadeout(@aperturewhite, 80%)'
    , code_hexa : 'rgba(#f2f7ff, 0.2)'
    , bg_class  : 'a-bc-tintlight'
    , box_color : Styleguide.COLOR_SCHEME.apertureblack
    }
  , shadelight : {
      name      : 'Shade Light'
    , code_dfn  : 'fadeout(@apertureblack, 80%)'
    , code_hexa : 'rgba(#0d0800, 0.2)'
    , bg_class  : 'a-bc-shadelight'
    , box_color : Styleguide.COLOR_SCHEME.aperturewhite
    }
  , tintheavy : {
      name      : 'Tint Heavy'
    , code_dfn  : 'fadeout(@aperturewhite, 20%)'
    , code_hexa : 'rgba(#f2f7ff, 0.8)'
    , bg_class  : 'a-bc-tintheavy'
    , box_color : Styleguide.COLOR_SCHEME.apertureblack
    }
  , shadeheavy : {
      name      : 'Shade Heavy'
    , code_dfn  : 'fadeout(@apertureblack, 20%)'
    , code_hexa : 'rgba(#0d0800, 0.8)'
    , bg_class  : 'a-bc-shadeheavy'
    , box_color : Styleguide.COLOR_SCHEME.aperturewhite
    }
  }

  return Styleguide
})()
