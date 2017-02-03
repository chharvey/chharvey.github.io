var Page = require('sitepage').Page

module.exports = (function () {
  // CONSTRUCTOR
  function Home() {}

  // STATIC MEMBERS
  /**
   * The set of main pages on this site.
   * @type {Page}
   */
  Home.HOME = new Page({ name: 'Chris Harvey', url: '/home/' })
    .title('Chris Harvey')
    .description('Home page of Christopher H. Harvey of Fairfax, VA.')
    .add(new Page({ name: 'Home', url: '/index.html' }))
    .add(new Page({ name: 'About Me', url: 'about.html' })
      .description('About Chris Harvey of Fairfax, VA.')
      .add(new Page({ name: 'Copyright', url: 'copyright.html' }))
    )
    .add(new Page({ name: 'Mathematics', url: 'math.html' }))
    .add(new Page({ name: 'Education'  , url: 'edu.html' }))
    .add(new Page({ name: 'Music'      , url: 'music.html' }))
    .add(new Page({ name: 'Swimming'   , url: 'swim.html' }))
    .add(new Page({ name: 'Web'        , url: 'web.html' }))

  return Home
})()
