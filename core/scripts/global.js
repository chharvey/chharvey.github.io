/**
  * The entire project.
  */
project = {
  px_per_rem : 16,
  line_height : 1.5,
}

project.vru = project.px_per_rem * project.line_height

/**
  * Resizes the `.c-FolioTitle` headings on home site to keep them horizontally contained.
  */
/*
 * CHANGED: no longer needed as .c-FolioTitle is now responsive
function resizeFolioHeading() {
  $('.c-FolioTitle').each(function () {
    var self = this
    this.width_in_rem = $(this).parent().width() / project.px_per_rem
    this.font_size_in_rem = (1/16) * this.width_in_rem // HACK // magic number alert! why (1/16) ???
    this.line_height = 3 * project.line_height / this.font_size_in_rem // HACK // magic number alert!

    $(this).css('font-size', function () {
      return self.font_size_in_rem + 'rem'
    }).css('line-height', function () {
      return self.line_height
    });
  });
}
 */

/**
  * Compensates for changes of pullquote line height.
  *
  * The line-height of pull quotes and pull quote sources is by default the amount
  * such that the font-size * line-height equals 1 vru. In CSS, the line-height is
  * multiplied by a coefficient to increase vertical spacing between lines.
  *
  * This function compensates for the shift in vertical rhythm by adding a negative margin-top.
  */
function pullquoteLines() {
  $('.c-Pullquote').each(function () {
    var vrus = $(this).height() / project.vru
    $(this).css('margin-top','') // removes any inline style
    if (vrus % 1 !== 0) {
      $(this).css('margin-top', parseFloat($(this).css('margin-top')) - (vrus % 1) * project.vru)
    }
  })
}

/**
  * Adjusts the height of the `dt`s and `dd`s inside a `dl` such that
  * the each pair of terms and descriptions share the same height.
  * NOTE: this assumes each term-description group contains exactly one `dt` and one `dd`.
  * CHANGED: 2015-04-15: no longer needed as Flexbox now automates height of boxes
  */
// function mapHeights() {
//   $('.dl--Horiz').each(function () {
//     $(this).children('dt').each(function () {
//       var height1 = parseInt($(this).css('height'))
//         , height2 = parseInt($(this).next().css('height'))
//       $(this).next().css('height', Math.max(height1, height2) + 'px')
//     });
//     $(this).children('dd').each(function () {
//       var height1 = parseInt($(this).prev().css('height'))
//         , height2 = parseInt($(this).css('height'))
//       $(this).prev().css('height', Math.max(height1, height2) + 'px')
//     });
//   });
// }

/**
  * Adjusts the bottom spacing of a `.Table`.
  * Subtracts margin-bottom, or adds padding-bottom to tables to compensate for horizontal borders.
  * ONLY USE THIS FUNCTION ON TABLES WITH HORIZONTAL BORDERS.
  * If number of h-borders (n_rows + 1) is 0–11, 24–35, etc., then subtract at most 11px from margin-bottom, thereby pulling subsequent elements upward.
  * If number of h-borders is 12-23, 36-47, etc., then add at most 12px to padding-bottom, thereby pushing subsequent elements downward.
  * CHANGED: 2015-05-13: temporarily commenting out as generic tables no longer have borders.
  *                      may use components later which may need this function.
  */

// function tableSpacing() {
//   /*
//    * Algorithm:
//    * for each table:
//    * take the number of rows (x)
//    * add 12
//    * mod 24
//    * subtract 12
//    * negate.
//    * function notation: g(x) = -(f(x+12)-12) where f(x) = MOD(x,24)
//    * function transformation: MOD(x,24) translated left 12 and down 12, then flipped vertically.
//    * if g(x) <= 0, then margin-bottom that number
//    * else, padding-bottom that number.
//    *
//    * Notes:
//    * [1] n_rowgroups++ once more for the last border, if there is one
//    * [2] n_rowgroups++ once more again for a caption if it exists:
//    *     (this is for the border-top of the `caption` Element,
//    *     not the border-bottom of the `.c-Caption--before` Component)
//    */
//   var px_per_line = project.px_per_rem * project.line_height;
//   var px_per_line_half = px_per_line / 2;
//   $('.Table').each(function () {
//     var n_rowgroups = 0
//     $(this).find('.Rowgroup').each(function () {
//       n_rowgroups++
//     })
//     if ($(this).find('.Rowgroup')[0] != null)     n_rowgroups++ // *[1]
//     if ($(this).find('caption')[0]   != null)     n_rowgroups++ // *[2]
//     var btm = -(((n_rowgroups + px_per_line_half) % px_per_line) - px_per_line_half)
//     if (btm <= 0) {
//       $(this).css('margin-top','') // removes any previous inline style
//       $(this).css('margin-top',parseFloat($(this).css('margin-top'))+btm)
//     } else {
//       $(this).css('padding-top','') // removes any previous inline style
//       $(this).css('padding-top',parseFloat($(this).css('padding-top'))+btm)
//     }
//     // var n_rows = 0
//     // $(this).find('tr').each(function () {
//     //   n_rows++
//     // })
//     // n_rows++ // once more for the last border
//     // var btm = -(((n_rows + px_per_line_half) % px_per_line) - px_per_line_half)
//     // if (btm <= 0) $(this).css('margin-bottom', btm)
//     // else          $(this).css('padding-bottom', btm)
//   });
// }
function tableSpacing() {

  // fixes vertical spacing for normal, unclassed table elements. this is due to the fact that
  // each cell (th or td) has a vertical padding of `(0.25 * @chh_vru)`
  // (that is, `0.25 * project.line_height` in javascript), which totals to be 0.5.
  // thus if there are an odd number of rows in the table, the margin needs to be offset by
  // 0.5.

  var px_per_line = project.px_per_rem * project.line_height
    , px_per_line_half = px_per_line / 2

  $('table').each(function () {
    var n_rows = 0
    $(this).find('tr').each(function () {
      n_rows++
    })
    if (n_rows % 2 == 1) {
      $(this).css('margin-top', -1 * px_per_line_half)
    }
  })
}

/**
  * Adds delimiters to LaTeX expressions.
  * Inline uses parentheses and block uses brackets.
  */
function mathJax() {
  $('.M:not(.M--B)').prepend('\\(').append('\\)')
  $('.M.M--B').prepend('\\[').append('\\]')
}
$(document).ready(function () {
  // resizeFolioHeading()
  pullquoteLines()
  // mapHeights()
  tableSpacing()
  mathJax()
})
$(window).resize(function () {
  // resizeFolioHeading()
  pullquoteLines()
})
