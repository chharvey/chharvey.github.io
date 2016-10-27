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
    return Styleguide
  })()
