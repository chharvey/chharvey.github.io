/*----------*\
	all.js
\*----------*/

//var t_ani = 200;
/** Creates a new HTML element and returns it as a jQuery object. */
function newElem(elemname) {
	return $(document.createElement(elemname));
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
//	return newElem(elemname).addClass(classname).html(html);
//}
//function addSomethingTo(jQobj, elemname, classname, html) {
//	jQobj.prepend(newElemFilled(elemname, classname, html));
//}
//function showOnHover(container) {
//	container.wrapInner(newElem('div').addClass('js-wrapper invisible'));
//	container.hover(function () {
//		$(this).find('.js-wrapper').toggleClass('invisible',t_ani);
//	});
//}
$(document).ready(function () {
	/**
	Subtracts margin-bottom, or adds padding-bottom to tables to compensate for horizontal borders.
	ONLY USE THIS FUNCTION ON TABLES WITH HORIZONTAL BORDERS.
	If number of h-borders (n_rows + 1) is 0–11, 24–35, etc., then subtract at most 11px from margin-bottom, thereby pulling subsequent elements upward.
	If number of h-borders is 12-23, 36-47, etc., then add at most 12px to padding-bottom, thereby pushing subsequent elements downward.
	**/
	/*
	Algorithm:
	for each table:
	take the number of rows (x)
	add 12
	mod 24
	subtract 12
	negate.
	function notation: g(x) = -(f(x+12)-12) where f(x) = MOD(x,24)
	function transformation: MOD(x,24) translated left 12 and down 12, then flipped vertically.
	if g(x) <= 0, then margin-bottom that number
	else, padding-bottom that number.
	*/
	$('table').each(function () {
		if ($(this).hasClass('table-list') || $(this).hasClass('table-bars')) {
			var n_rowgroups = 0;
			$(this).find('thead, tbody, tfoot').each(function () {
				n_rowgroups++;
			});
			n_rowgroups++; // once more for the last border
			var btm = -(((n_rowgroups + 12) % 24) - 12);
			if (btm <= 0) {$(this).css('margin-bottom',btm);}
			else          {$(this).css('padding-bottom',btm);}
		}
		else {
			var n_rows = 0;
			$(this).find('tr').each(function () {
				n_rows++;
			});
			n_rows++; // once more for the last border
			var btm = -(((n_rows + 12) % 24) - 12);
			if (btm <= 0) {$(this).css('margin-bottom',btm);}
			else          {$(this).css('padding-bottom',btm);}
		}
	});
	
	
	
	/*
	Adds classes to necessary elements.
	These methods are NOT meant for extending classes! For extending CSS classes, either use includes (redundant properties) or extends (multiple selectors), or some other method of inheritance in the stylesheet.
	These methods are meant for using JS to 'grab' certain classes for behavioral reasons.
	For example, the "js-link" class enables JS to toggle the subclasses "up" and "dn". In the HTML, you can just apply the class
		<div class="up">
		and thus JS will add the class "js-link" to the div. The compiled HTML will output <div class="up js-link"> and now jQuery can 'grab' the element with class "js-link" and toggle "up" and "down".
		**The classes specific to JavaScript and not needed for CSS styling shall be prefixed with "js-" **
	If trying to decide whether to include a JS method to add a class, think, "does JS need to use the class or is only used for CSS?" If JS doesn't need it, you can find a better way to get what you want using CSS.
	The only exception to this rule is to use JS to automate repetitive commands. For instance in an unordered list, if every line item needs to have a certain class, you can save time by writing a jQuery command to add the class to every line item.
	*/
	
//	$('.js-enabled-remove').css('display','none');
//	$('.js-disabled-remove, .wff').css('display','inline-block');
	
	/** JavaScript 'grabber' classes --- only here for jQuery selectors */
});

$(document).ready(function () {
	/* BLOCK ELEMENTS */
	
	/** Colors tables' rows and columns alternating colors. 
	remember, jQuery's :even and :odd selectors are 0-based (0 is first),
	so the first row (row 0) should be given class 'row-odd' */
// 	$('.table-list tbody').each(function () {
// 		$(this).children('tr:even').addClass('row-odd');
// 		$(this).children('tr:odd').addClass('row-even');
// 	});
// 	$('.table-bars tbody tr').each(function () {
// 		$(this).children('td:even').addClass('column-odd');
// 		$(this).children('td:odd').addClass('column-even');
// 	});
//	$('.table-grid tbody').each(function () {
//		$(this).children('tr:even').addClass('row-odd');
//		$(this).children('tr:odd').addClass('row-even');
//		$(this).children('tr').each(function () {
//			$(this).children('td:even').addClass('column-odd');
//			$(this).children('td:odd').addClass('column-even');
//		});
//	});
	
	/* INLINE ELEMENTS */
	
	/* MODS */
	/* code */
//	$('.lang-html').attr('title','HTML');
//	$('.lang-css').attr('title','CSS');
//	$('.lang-less').attr('title','LESS');
//	$('.lang-js').attr('title','JavaScript');
//	$('.lang-jq').attr('title','jQuery');

	/* math */
	/** puts the LaTeX source in the 'title' attribute */
// 	$('.latex').attr('title',function () {
// 		return $(this).text();
// 	});
	
	/** an attempt to fix the cursive headings of the folio pages 
	EDIT: Temporary fix available at the bottom of each hub page. */
//	while($('.folio .h-folio').width > $('.folio').width) {
//		$('.folio .h-folio').css('font-size', (parseInt($('.folio .h-folio').css('font-size')) - 1) + "px" );
//	}
});


$(document).ready(function () {
	//broken links - really only meant for inline links, buggy on block links
//	var oldHTML;
//	var oldHref;
//	$('.a-broken').hover(function () {
//		oldHTML = $(this).html();
//		oldHref = $(this).attr('href');
//		$(this).html('coming soon...');
//		$(this).removeAttr('href');
//	}, function () {
//		$(this).html(oldHTML);
//		$(this).attr('href', oldHref);
//	});
});