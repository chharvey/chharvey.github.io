//** ======== SITE-WIDE BEHAVIORS (all.js) ========
var t_ani = 200;
/** Creates a new HTML element and returns it as a jQuery object. */
function newElem(elemname) {
	return $(document.createElement(elemname));
}
function newElemFilled(elemname, classname, html) {
	return newElem(elemname).addClass(classname).html(html);
}
function addSomethingTo(jQobj, elemname, classname, html) {
	jQobj.prepend(newElemFilled(elemname, classname, html));
}
function addLede(jQobj, html) {
	addSomethingTo(jQobj, 'span', 'lede', html);
}
function addLabel(jQobj, html) {
//USE THE CSS ':before' element!!!
//	addSomethingTo(jQobj, 'div', 'label', html);
}
function showOnHover(container) {
	container.wrapInner(newElem('div').addClass('js-wrapper invisible'));
	container.hover(function() {
		$(this).find('.js-wrapper').toggleClass('invisible',t_ani);
	});
}
$(document).ready(function() {
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
	$('.js-disabled-hide, .wff').css('display','block');
	
	/** JavaScript 'grabber' classes --- only here for jQuery selectors */
	$('a.up, a.dn').addClass('js-link');
	$('a.sp-up, a.sp-dn').addClass('js-sp');
	$('a.block-up, a.block-dn').addClass('js-block-link');
});

$(document).ready(function() {
	/* BLOCK ELEMENTS */
	
	/** Colors tables' rows and columns alternating colors. 
	remember, jQuery's :even and :odd selectors are 0-based (0 is first),
	so the first row (row 0) should be given class 'row-odd' */
	$('.table-list .body').each(function () {
		$(this).children('tr:even').addClass('row-odd');
		$(this).children('tr:odd').addClass('row-even');
	});
	$('.table-bars .body tr').each(function() {
		$(this).children('td:even').addClass('column-odd');
		$(this).children('td:odd').addClass('column-even');
	});
	$('.table-grid .body').each(function() {
		$(this).children('tr:even').addClass('row-odd');
		$(this).children('tr:odd').addClass('row-even');
		$(this).children('tr').each(function() {
			$(this).children('td:even').addClass('column-odd');
			$(this).children('td:odd').addClass('column-even');
		});
	});
	
	/* INLINE ELEMENTS */
//	$('[datetime]').attr('title',function() {
//		return $(this).attr('datetime');
//	});
	/* hyperlinks */
	$('.js-link[href]').hover(function() {
		$(this).toggleClass('up dn');
		$(this).removeClass('active');
	});
	$('.js-sp[href]').hover(function() {
		$(this).toggleClass('sp-up sp-dn');
		$(this).removeClass('active');
	});
	
	$('a[href]').mousedown(function() {
		$(this).addClass('active');
	});
	$('a[href]').mouseup(function () {
		$(this).removeClass('active');
	});
	
	/* MODS */
//	showOnHover($('.example, .demo'));
	/* block hyperlinks */
	$('.js-block-link').hover(function() {
		$(this).toggleClass('block-up block-dn',t_ani);
	});
	$('.js-block-link').mousedown(function() {
		$(this).addClass('block-active');
	});
	$('.js-block-link').mouseup(function () {
		$(this).removeClass('block-active');
	});
	/* hyperlinks in main navigation bars */
	$('.hub-nav a').hover(function() {
		$(this).parent().toggleClass('pos neg',t_ani);
	});
	/* code */
//	$('.lang-html').attr('title','HTML');
//	$('.lang-css').attr('title','CSS');
//	$('.lang-less').attr('title','LESS');
//	$('.lang-js').attr('title','JavaScript');
//	$('.lang-jq').attr('title','jQuery');

	/* math */
//	$('data.latex[value]').html(function() {
//		return $(this).attr('value'); // for Mathjax rendering
//	});
//	$('data.latex[value]:after').css('content',''); // DOESN'T WORK!
//	$('data.latex[value]').attr('title',function() {
//		return $(this).attr('value'); // for people who want to see the LaTeX source
//	});

	/* special icons */
	$('.icon-special').addClass('icon-special-clear');
	$('.icon-special').hover(function() {
		$(this).toggleClass('icon-special-clear',t_ani);
	});
	/** an attempt to fix the cursive headings of the hub pages 
	EDIT: Temporary fix available at the bottom of each hub page. */
//	while($('.folio .h-folio').width > $('.folio').width) {
//		$('.folio .h-folio').css('font-size', (parseInt($('.folio .h-folio').css('font-size')) - 1) + "px" );
//	}
});


$(document).ready(function() {
	//broken links - really only meant for inline links, buggy on block links
	var oldHTML;
	var oldHref;
	$('.a-broken').hover(function() {
		oldHTML = $(this).html();
		oldHref = $(this).attr('href');
		$(this).html('coming soon...');
		$(this).removeAttr('href');
	}, function() {
		$(this).html(oldHTML);
		$(this).attr('href', oldHref);
	});
});