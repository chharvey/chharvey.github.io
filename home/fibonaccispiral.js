/**
  * Positions the squares in a Fibonacci spiral.
  */
function positionSquares() {
  /**
    * Returns the product of Phi^n and $('main').width(), where Phi ≈ 0.618034
    * @param n      the power of phi
    * @return       Phi^n * length
    */
  function p(n) {
    return ($('main').width() * Math.pow(Util.PHI_INV, n));
  }

  /* this is in JS and not in CSS: in case users have
  JS disabled but CSS not disabled, the position
  should be static (as specified in css file) */
  $('.Square').css('position', 'absolute');

  $('.Spiral > li:nth-child( 1) > .Square').css('left', p(2));
  $('.Spiral > li:nth-child( 3) > .Square').css('top', p(2));
  $('.Spiral > li:nth-child( 4) > .Square').css('left', p(3)).css('top', p(2) + p(5));
  $('.Spiral > li:nth-child( 5) > .Square').css('left', p(3) + p(6)).css('top', p(2));
  $('.Spiral > li:nth-child( 6) > .Square').css('left', p(3)).css('top', p(2));
  $('.Spiral > li:nth-child( 7) > .Square').css('left', p(3)).css('top', p(2) + p(6));
  $('.Spiral > li:nth-child( 8) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6) + p(9));
  $('.Spiral > li:nth-child( 9) > .Square').css('left', p(3) + p(7) + p(10)).css('top', p(2) + p(6));
  $('.Spiral > li:nth-child(10) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6));
  $('.Spiral > li:nth-child(11) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6) + p(10));
  $('.Spiral > li:nth-child(12) > .Square').css('left', p(3) + p(7) + p(11)).css('top', p(2) + p(6) + p(10));
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
      return ($(window).height() - $('main').width() * Util.PHI_INV) * Math.pow(Util.PHI_INV, 2) + 'px';
    });
  }
}

$(document).ready(function () {
  makepretty();
});
$(window).resize(function () {
  makepretty();
});
