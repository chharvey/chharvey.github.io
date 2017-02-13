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
    this._history = []
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

  /**
   * Add a timestamp to this post’s revision history.
   * @param {Date} datetime the date and/or time of revision
   * @param {Array<BlogPost.STATUS>=} statuses any status changes to the document at this timestamp
   * @return {BlogPost} this blog post
   */
  BlogPost.prototype.addTimestamp = function addTimestamp(datetime, statuses) {
    statuses = statuses || [] // NOTE param validation
    this._history.push({
      datetime   : datetime
    , is_complete: statuses.indexOf(BlogPost.STATUS.COMPLETE) >= 0
    , is_released: statuses.indexOf(BlogPost.STATUS.RELEASED) >= 0
    })
    return this
  }
  /**
   * Get all the timestamps of this post.
   * @return {Array<Object>} an array of timestamp objects, each of the format {datetime:Date, is_complete:boolean, is_released:boolean}
   */
  BlogPost.prototype.getTimestampsAll = function getTimestampsAll() {
    return this._history.slice()
  }

  // STATIC MEMBERS
  /**
   * A set of possible statuses for a post.
   * @enum {string}
   */
  BlogPost.STATUS = {
    DRAFT   : 'Draft'
  , COMPLETE: 'Complete'
  , RELEASED: 'Released'
  }

  return BlogPost
})()
