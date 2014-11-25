/*#############*\
    global.js
\*#############*/

/** Creates a new HTML element and returns it as a jQuery object. */
function newElem(elemname) {
  return $(document.createElement(elemname)); // same as $(<elementname>)
}
/** Converts an rgb string, of the form `rgb(r, g, b)`, into a hex string, of the form `#RRGGBB` */
function rgbToHex(rgbString) {
  var sliced = rgbString.slice(4, -1);
  var splitted = sliced.split(',');
  var decR = splitted[0];
  var decG = splitted[1];
  var decB = splitted[2];
  function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
  }
  return '#' + toHex(decR) + toHex(decG) + toHex(decB);
}
/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
function hsvToRgb(h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;
   // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
   // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100;
  v /= 100;
  if(s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
//function newElemFilled(elemname, classname, html) {
//  return newElem(elemname).addClass(classname).html(html);
//}
//function addSomethingTo(jQobj, elemname, classname, html) {
//  jQobj.prepend(newElemFilled(elemname, classname, html));
//}
//function showOnHover(container) {
//  container.wrapInner(newElem('div').addClass('js-wrapper invisible'));
//  container.hover(function () {
//    $(this).find('.js-wrapper').toggleClass('invisible',t_ani);
//  });
//}

/**
  * Changes the line height of block quotes to 1.5 times the usual amount.
  *
  * Currently (2014-03-01), the line-height is 1.2, because font-size is 1.25rem and
  * 1.25rem × 1.2 = 1.5rem = 1vru, where 1vru = 1.5rem = 24px, one "line".
  *
  * Change line-height to 1.8 to increase vertical spacing between lines. That way, each line
  * would be 1.25rem × 1.8 = 2.25rem = 1.5vru.
  *
  * If the number of lines is even, the total would be a multiple of 1.5vru × 2 = 3vru, which is
  * a whole number, so vertical rhythm would be okay. No need to adjust margin-bottom.
  *
  * However if the number of lines is odd, the total would always be a multiple of 3vru plus 1.5vru,
  * which would always be offset by 0.5vru = 0.75rem = 12px. So the margin-bottom must be set to -12px.
  *
  * 1. take the height of the blockquote in pixels (e.g. 72px)
  * 2. divide height by vru (e.g. 72px / 24px = 3) this result is the number of lines
  * 3. If the number of lines is odd, set margin-bottom: -12px;.
  */
function qblockLines() {
  $('.Qblock.Short').each(function () {
    var lines = $(this).height() / 24;
    lines = Math.round(lines / 1.5); // divide by 1.5 to account for new line height
    if (lines % 2 === 1) {
      $(this).css('margin-bottom','-12px');
    } else {
      $(this).css('margin-bottom','');
    }
  });
}

/**
  * Adjusts the height of the `.Term`s and `.Desc`s inside a `.Map` such that
  * the each pair of terms and descriptions share the same height.
  */
function mapHeights() {
  $('.Map.Horiz, .FuncTabl').each(function () {
    $(this).children('.Term').each(function () {
      var h1 = parseInt($(this).css('height'));
      var h2 = parseInt($(this).next().css('height'));
      $(this).next().css('height', Math.max(h1, h2) + 'px');
    });
    $(this).children('.Desc').each(function () {
      var h1 = parseInt($(this).prev().css('height'));
      var h2 = parseInt($(this).css('height'));
      $(this).prev().css('height', Math.max(h1, h2) + 'px');
    });
  });
}

/**
  * Adjusts the bottom spacing of a `.Table`.
  * Subtracts margin-bottom, or adds padding-bottom to tables to compensate for horizontal borders.
  * ONLY USE THIS FUNCTION ON TABLES WITH HORIZONTAL BORDERS.
  * If number of h-borders (n_rows + 1) is 0–11, 24–35, etc., then subtract at most 11px from margin-bottom, thereby pulling subsequent elements upward.
  * If number of h-borders is 12-23, 36-47, etc., then add at most 12px to padding-bottom, thereby pushing subsequent elements downward.
  */
function tableSpacing() {
  /*
   * Algorithm:
   * for each table:
   * take the number of rows (x)
   * add 12
   * mod 24
   * subtract 12
   * negate.
   * function notation: g(x) = -(f(x+12)-12) where f(x) = MOD(x,24)
   * function transformation: MOD(x,24) translated left 12 and down 12, then flipped vertically.
   * if g(x) <= 0, then margin-bottom that number
   * else, padding-bottom that number.
   */
  $('.Table').each(function () {
    var n_rowgroups = 0;
    $(this).find('.Rowgroup').each(function () {
      n_rowgroups++;
    });
    if ($(this).find('.Rowgroup')[0] != null)     n_rowgroups++; // once more for the last border, if there is one
    if ($(this).find('caption').hasClass('Capt')) n_rowgroups++; // once more again for a caption if it exists
    var btm = -(((n_rowgroups + 12) % 24) - 12);
    if (btm <= 0) $(this).css('margin-bottom',btm);
    else          $(this).css('padding-bottom',btm);
    // var n_rows = 0;
    // $(this).find('tr').each(function () {
    //   n_rows++;
    // });
    // n_rows++; // once more for the last border
    // var btm = -(((n_rows + 12) % 24) - 12);
    // if (btm <= 0) {$(this).css('margin-bottom',btm);}
    // else          {$(this).css('padding-bottom',btm);}
  });
}
/**
  * Adds delimiters to LaTeX expressions.
  * Inline uses parentheses and block uses brackets.
  * // Puts the LaTeX source in the 'title' attribute.
  */
function mathJax() {
  $('.M:not(.B)').prepend('\\(').append('\\)');
  $('.M.B').prepend('\\[').append('\\]');
  // $('.M').attr('title', function () { return $(this).text(); });
}
$(document).ready(function () {
  qblockLines();
  mapHeights();
  tableSpacing();
  mathJax();

  /** an attempt to fix the cursive headings of the folio pages
  EDIT: Temporary fix available at the bottom of each hub page. */
//  while($('.folio .h-folio').width > $('.folio').width) {
//    $('.folio .h-folio').css('font-size', (parseInt($('.folio .h-folio').css('font-size')) - 1) + "px" );
//  }
});
$(window).resize(function () {
  qblockLines();
});
