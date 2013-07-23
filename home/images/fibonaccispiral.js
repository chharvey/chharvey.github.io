function p(n, length) {
	var Phi = (-1 + Math.sqrt(5)) / 2;
//	var Phi = 0.618033988749894848;
	return (length * Math.pow(Phi, n));
}
function squareheight(rectangle) {
	// sets the height of each box link to its width
	$(rectangle).css('height', function() {
		return $(this).width();
	});
}
function positionSquares(mw) {
	//positions the squares in a Fibonacci spiral
	var P1  = p(1,  mw);
	var P2  = p(2,  mw);
	var P3  = p(3,  mw);
	var P4  = p(4,  mw);
	var P5  = p(5,  mw);
	var P6  = p(6,  mw);
	var P7  = p(7,  mw);
	var P8  = p(8,  mw);
	var P9  = p(9,  mw);
	var P10 = p(10, mw);
	var P11 = p(11, mw);
	var P12 = p(12, mw);
	$('.buttons a').css('position','absolute'); // this is in JS and not in CSS: in case users have JS disabled but CSS not disabled, the position should be static
	$('.a1').css('left',P2);
	$('.c1').css('top',P2);
	$('.d1').css('left',P3).css('top',P2+P5);
	$('.e1').css('left',P3+P6).css('top',P2);
	$('.f1').css('left',P3).css('top',P2);
	$('.g1').css('left',P3).css('top',P2+P6);
	$('.h1').css('left',P3+P7).css('top',P2+P6+P9);
	$('.i1').css('left',P3+P7+P10).css('top',P2+P6);
	$('.j1').css('left',P3+P7).css('top',P2+P6);
	$('.k1').css('left',P3+P7).css('top',P2+P6+P10);
	$('.l1').css('left',P3+P7+P11).css('top',P2+P6+P10);
}
function bigtext() {
	// sets a proportional font size for each box link
	$('.buttons .buttontext').css('font-size', function () {
		return $(this).parent().height() / 4 + 'px';
	});
	// vertically aligns the font in each box link
	$('.buttons .buttontext').css('top',function () {
		return ($(this).parent().height() - $(this).height()) / 2 + 'px';
	});
}
function positionSpiral(mw) {
	// centers the group of box links on the page
	$('.buttons').css('top', function() {
		return ($(window).height() - p(1, mw)) * p(2, 1) + 'px';
	});
}
function makepretty() {
	var mainwidth = $('.main').width();
	squareheight('.buttons a');
	positionSquares(mainwidth);
	bigtext();
	positionSpiral(mainwidth);
}

$(document).ready(function() {
	showOnHover($('.buttons a'));
	
	makepretty();
});
$(window).resize(function() {
	makepretty();
});