/**
  * Returns the product of phi^n and length
  * @param  : n      : the power of phi
  * @param  : length : the multiplier
  * @return : phi^n * length
  */
function p(n, length) {
  var Phi = ((-1 + Math.sqrt(5)) / 2);
  return (length * Math.pow(Phi, n));
}
/**
  * Positions the squares in a Fibonacci spiral.
  */
function positionSquares() {
  var mainwidth = $('main').width();
  var P1  = p(1,  mainwidth);
  var P2  = p(2,  mainwidth);
  var P3  = p(3,  mainwidth);
  var P4  = p(4,  mainwidth);
  var P5  = p(5,  mainwidth);
  var P6  = p(6,  mainwidth);
  var P7  = p(7,  mainwidth);
  var P8  = p(8,  mainwidth);
  var P9  = p(9,  mainwidth);
  var P10 = p(10, mainwidth);
  var P11 = p(11, mainwidth);
  var P12 = p(12, mainwidth);

  /* this is in JS and not in CSS: in case users have
  JS disabled but CSS not disabled, the position
  should be static (as specified in css file) */
  $('.Square').css('position', 'absolute');

  $('.Spiral > li:nth-child( 1) > .Square').css('left', P2);
  $('.Spiral > li:nth-child( 3) > .Square').css('top', P2);
  $('.Spiral > li:nth-child( 4) > .Square').css('left', P3).css('top', P2 + P5);
  $('.Spiral > li:nth-child( 5) > .Square').css('left', P3 + P6).css('top', P2);
  $('.Spiral > li:nth-child( 6) > .Square').css('left', P3).css('top', P2);
  $('.Spiral > li:nth-child( 7) > .Square').css('left', P3).css('top', P2 + P6);
  $('.Spiral > li:nth-child( 8) > .Square').css('left', P3 + P7).css('top', P2 + P6 + P9);
  $('.Spiral > li:nth-child( 9) > .Square').css('left', P3 + P7 + P10).css('top', P2 + P6);
  $('.Spiral > li:nth-child(10) > .Square').css('left', P3 + P7).css('top', P2 + P6);
  $('.Spiral > li:nth-child(11) > .Square').css('left', P3 + P7).css('top', P2 + P6 + P10);
  $('.Spiral > li:nth-child(12) > .Square').css('left', P3 + P7 + P11).css('top', P2 + P6 + P10);
}
function makepretty() {
  var user_has_CSS_enabled = true; // it is most likely the case that if users have JS enabled then they also have CSS enabled
  if (user_has_CSS_enabled) {
    /** sets the height of the given rectangle to its width */
    $('.Square').css('height', function() {
      return $(this).width();
    });
    /** sets a proportional font size for each square (dependent on square height) */
    $('.Text').css('font-size', function () {
      return $(this).parents('.Square').height() / 4 + 'px';
    });
    /** vertically aligns the textbox in each square (depenedent on font-size) */
    $('.Text').css('top', function () {;
      return ($(this).parents('.Square').height() - $(this).height()) / 2 + 'px';
    });
    /** adjust the border-radius of the textbox proportionally */
    $('.Text').css('border-radius', function () {
      return $(this).height() / 2 + 'px';
    });
    positionSquares();
    /** centers the group of buttons on the page */
    $('.Spiral').css('top', function () {
      return ($(window).height() - p(1, $('main').width())) * p(2, 1) + 'px';
    });
  }
}

$(document).ready(function () {
  makepretty();
});
$(window).resize(function () {
  makepretty();
});
