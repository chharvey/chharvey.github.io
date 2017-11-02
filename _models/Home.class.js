const Page     = require('sitepage').Page
const BlogPost = require('still-alive').BlogPost

/**
 * Model for the entire site
 * @type {Home}
 */
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
    .add(new BlogPost('Classical Music Cataloging System', 'classical-music.html')
      .description('A proposed cataloging system for classical music in iTunes.')
      .keywords(['music', 'classical music'])
    )
    .add(new BlogPost('The Semantics and Style of Nested Headings in Webkit', 'headings.html')
      .description('The semantics and style of nested heading elements in Webkit.')
      .keywords(['semantic', 'heading', 'Document Outline'])
    )
    .add(new BlogPost('Flexbox', 'layout.html')
      .description('Using Flexbox to lay out Elements on a page.')
      .keywords(['Flexbox', 'layout', 'CSS', 'Less'])
    )
    .add(new BlogPost('Lists', 'lists.html')
      .description('My thoughts on lists.')
      .keywords(['lists', 'ordered', 'unordered', 'association'])
    )
    .add(new BlogPost('Typesetting Math in Moodle', 'math-moodle.html')
      .description('A tutorial for inputting mathematical expressions into the Moodle system.')
      .keywords(['math expressions', 'math equations'])
        //  nav.
        //    h2 Table of Contents
        //    ol.TOC
        //      li:a(href="#intro") Introduction: Your First Equation by Hand
        //      li:a(href="#modes") Equation Modes
        //      li
        //        a(href="#placement") Placement of Symbols
        //        ol
        //          li:a(href="#supsub") Superscripts and Subscripts
        //          li:a(href="#frac") Fraction Bars
        //          li:a(href="#sqrt") Square Roots
        //          li
        //            a(href="#delimeters") Parentheses and other Delimiters
        //            ol
        //              li:a(href="#parens") Parentheses
        //              li:a(href="#brackets") Absolute Value, Square Brackets
        //              li:a(href="#braces") Curly Braces
        //      li
        //        a(href="#special-chars") Special Characters
        //        ol
        //          li:a(href="#vars") Values and Variables
        //          li:a(href="#operations") Binary Operations
        //          li:a(href="#relations") Binary Relations
        //      li:a(href="#more-oper") More Operators
        //      li
        //        a(href="#conclusion") Conclusion
        //        ol
        //          li:a(href="#more-info") More Information
    )
    .add(new BlogPost('Page Relationships', 'page-relationships.html')
      .description('description pending...')
    )
    .add(new BlogPost('Punctuation', 'semantic-punctuation.html')
      .description('A brief overview of traditional convention regarding punctuation & typography.')
      .keywords(['HTML', 'English', 'language', 'punctuation'])
    )
    .add(new BlogPost('Comparison Sorting Algorithms', 'sort.html')
      .description('A comparison of the most popular comparison sorting algorithms used in computer science.')
      .keywords(['computer science', 'sorting', 'algorithm'])
    )
    .add(new BlogPost('Workflow with Git', 'workflow-git.html')
      .description('My workflow with git.')
      .keywords(['git', 'workflow', 'semantic versioning', 'versioning', 'branching'])
    )

  return Home
})()
