//** ======== SITE-WIDE BEHAVIORS (all.js) ========
var t_ani = 200;
$(document).ready(function() {
	/*
	Adds classes to necessary elements.
	These methods are NOT meant for extending classes! For extending CSS classes, either use includes (redundant properties) or extends (multiple selectors), or some other method of inheritance.
	These methods are meant for using JS to 'grab' certain classes for behavioral reasons.
	For example, the "js-link" class enables JS to toggle the subclasses "up" and "dn". In the HTML, you can just apply the class
		<div class="up">
		and thus JS will add the class "js-link" to the div. The compiled HTML will output <div class="up js-link"> and now jQuery can 'grab' the element with class "js-link" and toggle "up" and "down".
		**The classes specific to JavaScript and not needed for CSS styling shall be prefixed with "js-" **
	If trying to decide whether to include a JS method to add a class, think, "does JS need to use the class or is only used for CSS?" If JS doesn't need it, you can find a better way to get what you want using CSS.
	The only exception to this rule is to use JS to automate repetitive actions. For instance in an unordered list, if every line item needs to have a certain class, you can save time by writing a jQuery command to add the class to every line item.
	*/
	
	/** Automated actions --- add 'real' CSS classes to elements */
	$('.list-action a').addClass('up');
	
	$('table thead, table tfoot, table th').addClass('header');
	
	$('.table-list thead, .table-list tfoot, .table-list th').addClass('header');
	$('.table-list tbody').addClass('body');
	
	$('.table-bars th').addClass('header');
	//no body for table-bars
	
	$('.table-grid th').addClass('header');
	$('.table-grid tbody').addClass('body');
	
	
	/** JavaScript 'grabber' classes --- only here for jQuery selectors */
	$('a.up, a.dn').addClass('js-link');
	$('a.sp-up, a.sp-dn').addClass('js-sp');
	$('a.block-up, a.block-dn').addClass('js-block-link');
});

$(document).ready(function() {
	
	// hyperlinks
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
	
	// box hyperlinks
	$('.js-block-link').hover(function() {
		$(this).toggleClass('block-up block-dn',t_ani);
	});
	$('.js-block-link').mousedown(function() {
		$(this).addClass('block-active');
	});
	$('.js-block-link').mouseup(function () {
		$(this).removeClass('block-active');
	});
		
	// hyperlinks in main navigation bars (banner.html)
	$('.hub-nav a').hover(function() {
		$(this).parent().toggleClass('pos neg',t_ani);
	});
	
	// code spans and code blocks
	$('.lang-html').attr('title','HTML');
	$('.lang-css').attr('title','CSS');
	$('.lang-less').attr('title','LESS');
	$('.lang-js').attr('title','JavaScript');
	$('.lang-jq').attr('title','jQuery');
	
	
	/**
	color tables' rows and columns alternating colors 
	remember, jQuery's :even and :odd selectors are 0-based (0 is first)
	*/
	var jQobj;
	for (var i=0; i<$('.table-list .body').size(); i++) {
		jQobj = $($('.table-list .body').toArray()[i]);
		jQobj.children('tr:even').addClass('row-odd');
		jQobj.children('tr:odd').addClass('row-even');
	}
	for (i=0; i<$('.table-bars tr').size(); i++) {
		jQobj = $($('.table-bars tr').toArray()[i]);
		jQobj.children('td:even').addClass('column-odd');
		jQobj.children('td:odd').addClass('column-even');
	}
	for (i=0; i<$('.table-grid .body').size(); i++) {
		jQobj = $($('.table-grid .body').toArray()[i]);
		jQobj.children('tr:even').addClass('row-odd');
		jQobj.children('tr:odd').addClass('row-even');
	}
	for (i=0; i<$('.table-grid tr').size(); i++) {
		jQobj = $($('.table-grid tr').toArray()[i]);
		jQobj.children('td:even').addClass('column-odd');
		jQobj.children('td:odd').addClass('column-even');
	}
	
	// special icons
	$('.icon-special').addClass('icon-special-clear');
	$('.icon-special').hover(function() {
		$(this).toggleClass('icon-special-clear',t_ani);
	});
	
	// inline elements
	$('.tex').attr('title',function() {
		return $(this).text();
	});
	$('[datetime]').attr('title',function() {
		return $(this).attr('datetime');
	});

	
	// footer-hub
	/*$('.footer-hub').addClass('footer-hub-collapse');
	$('.footer-hub').hover(function() {
		$(this).toggleClass('footer-hub-collapse',t_ani);
	});*/
	
	
	// an attempt to fix the cursive headings of the hub pages
//	while($('.folio .h-folio').width > $('.folio').width) {
//		$('.folio .h-folio').css('font-size', (parseInt($('.folio .h-folio').css('font-size')) - 1) + "px" );
//	}
// EDIT: Temporary fix available at the bottom of each hub page.
	
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