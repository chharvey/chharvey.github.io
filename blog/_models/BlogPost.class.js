var Page = require('sitepage').Page

/**
 * A blog post article.
 * @type {BlogPost}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a new BlogPost object.
   * @param {string} name the name of this page
   * @param {string} url  the url of this page
   */
  function BlogPost(name, url) {
    Page.call(this, { name: name, url: url })
    this._status = null
  }
  BlogPost.prototype = Object.create(Page.prototype)
  BlogPost.prototype.constructor = BlogPost

  /**
   * Set or get the status of this blog post.
   * @see BlogPost.status
   * @param  {BlogPost.STATUS=} s the status to set
   * @return {(BlogPost|BlogPost.STATUS)} this blog post || the status of this blog post
   */
  BlogPost.prototype.status = function status(s) {
    if (arguments.length >= 1) {
      ;
    } else return this._status
    this._status = s
    return this
  }

  // STATIC MEMBERS
  /**
   * A set of possible statuses for a post.
   * @enum {string}
   */
  BlogPost.STATUS = {
    DRAFT   : 'draft'
  , COMPLETE: 'complete'
  , RELEASED: 'released'
  }

  return BlogPost
})()
