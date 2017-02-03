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
      .add(new Page({ name: 'Copyright', url: 'copyright.html' })
        .description('Content is protected by intellectual property laws.')
      )
    )
    .add(new Page({ name: 'Mathematics', url: 'math.html' }))
    .add(new Page({ name: 'Education'  , url: 'edu.html' }))
    .add(new Page({ name: 'Music'      , url: 'music.html' }))
    .add(new Page({ name: 'Swimming'   , url: 'swim.html' }))
    .add(new Page({ name: 'Web'        , url: 'web.html' }))


  /**
   * Set of blog posts.
   * @type {Page}
   */
  Home.BLOG = new Page({ name: 'Chris Harvey’s Blog', url: '/blog/' })
    .title('Blog | Chris Harvey')
    .description('Blog posts written by Christopher H. Harvey of Fairfax, VA.')
    .add(new Page({ name: 'Classical Music Cataloging System', url: 'classical-music.html' })
      .description('A proposed cataloging system for classical music in iTunes.')
      .keywords(['music', 'classical music'])
    )
    .add(new Page({ name: 'The Semantics and Style of Nested Headings in Webkit', url: 'headings.html' })
      .description('The semantics and style of nested heading elements in Webkit.')
      .keywords(['semantic', 'heading', 'Document Outline'])
    )
    .add(new Page({ name: 'Flexbox', url: 'layout.html' })
      .description('Using Flexbox to lay out Elements on a page.')
      .keywords(['Flexbox', 'layout', 'CSS', 'Less'])
    )
    .add(new Page({ name: 'Lists', url: 'lists.html' })
      .description('My thoughts on lists.')
      .keywords(['lists', 'ordered', 'unordered', 'association'])
    )
    .add(new Page({ name: 'Typesetting Math in Moodle', url: 'math-moodle.html' })
      .description('A tutorial for inputting mathematical expressions into the Moodle system.')
      .keywords(['math expressions', 'math equations'])
    )
    .add(new Page({ name: 'Page Relationships', url: 'page-relationships.html' })
      .description('description pending...')
      .keywords(['HTML'])
    )
    .add(new Page({ name: 'Punctuation', url: 'semantic-punctuation.html' })
      .description('A brief overview of traditional convention regarding punctuation & typography.')
      .keywords(['HTML', 'English', 'language', 'punctuation'])
    )
    .add(new Page({ name: 'Comparison Sorting Algorithms', url: 'sort.html' })
      .description('A comparison of the most popular comparison sorting algorithms used in computer science.')
      .keywords(['computer science', 'sorting', 'algorithm'])
    )
    .add(new Page({ name: 'Workflow with Git', url: 'workflow-git.html' })
      .description('My workflow with git.')
      .keywords(['git', 'workflow', 'semantic versioning', 'versioning', 'branching'])
    )

  return Home
})()
