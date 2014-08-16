function p(n, length) {
	// * returns the product of Phi^n and length
	var Phi = ((-1 + Math.sqrt(5)) / 2); // 0.618034
	return (length * Math.pow(Phi, n));
}
function positionSquares() {
	// * positions the squares in a Fibonacci spiral
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
	$('.Square').css('position', 'absolute'); // this is in JS and not in CSS: in case users have
	                                          // JS disabled but CSS not disabled, the position
	                                          // should be static

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
	var user_has_CSS_enabled = true;
	if (user_has_CSS_enabled) {
		$('.Square').css('height', function() {
			// * sets the height of the given rectangle to its width
			return $(this).width();
		});
		$('.Text').css('font-size', function () {
			// * sets a proportional font size for each square (dependent on square height)
			return $(this).parents('.Square').height() / 4 + 'px';
		});
		$('.Text').css('top', function () {;
			// * vertically aligns the textbox in each square (depenedent on font-size)
			return ($(this).parents('.Square').height() - $(this).height()) / 2 + 'px';
		});
		$('.Text').css('border-radius', function () {
			// * adjust the border-radius of the textbox proportionally
			return $(this).height() / 2 + 'px';
		});
		positionSquares();
		$('.Spiral').css('top', function () {
			// * centers the group of buttons on the page
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
