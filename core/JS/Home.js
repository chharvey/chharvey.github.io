/*** ======== SITE-WIDE BEHAVIORS ======== ***/
var t_ani = 200;

$(document).ready(function() {
	$('.tex').attr('title',function() {
		return $(this).text();
	});
});

$(document).ready(function() {
	/*
	Adds classes to necessary elements.
	These methods are NOT meant for extending classes! For extending CSS classes, either use includes (redundant properties) or extends (multiple selectors).
	These methods are meant for using JS to 'grab' certain classes for behavioral reasons.
	For example, the "a" class enables JS to toggle the subclasses "up" and "dn". In the HTML, you can just apply the subclass, eg.,
		<div class="up">
		and thus JS will add the class "a" to the div. The compiled HTML will output <div class="up a"> and now JS can 'grab' the element with class "a" and toggle "up" and "down".
	If trying to decide whether to include a JS method to add a class, think, "does JS need to use the class or is only used for CSS?" If JS doesn't need it, you can find a better way to get what you want using CSS.
	*/
	$('.list-action a').addClass('up');
	$('.up, .dn').addClass('link');
	$('.sp-up, .sp-dn').addClass('sp');
	
//	$('code').addClass('code');
//	$('kbd kbd').addClass('kbd');
	
	$('.box-link-up, .box-link-dn').addClass('box-link');
	
	$('table thead, table tfoot, table th').addClass('header');
	$('.table-list thead, .table-list tfoot, .table-list th').addClass('header');
	$('.table-list tbody').addClass('body');
	$('.table-bars th').addClass('header');
	$('.table-grid tbody').addClass('body');
	$('.table-grid th').addClass('header');
});

$(document).ready(function() {
	
	// hyperlinks
	$('.link').hover(function() {
		$(this).toggleClass('up dn');
	});
	$('.sp').hover(function() {
		$(this).toggleClass('sp-up sp-dn');
	});
	
	$('a').mousedown(function() {
		$(this).addClass('active');
	});
	$('a').mouseup(function () {
		$(this).removeClass('active');
	});
	
	// box hyperlinks
	$('a.box-link').hover(function() {
		$(this).toggleClass('box-block-up box-block-dn',t_ani);
	});
	$('a.box-link').mousedown(function() {
		$(this).addClass('box-block-active');
	});
	$('a.box-link').mouseup(function () {
		$(this).removeClass('box-block-active');
	});
	
	// hyperlinks in main navigation bars
	$('.hub-nav a').hover(function() {
		$(this).parent().toggleClass('P1-midright P1-right',t_ani);
	});
	
	
	
	// tables. remember, jQuery's :even and :odd selectors are 0-based (0 is first)
	for (var i=0; i<$('.table-list .body').size(); i++) {
		var jQobj = $($('.table-list .body').toArray()[i]);
		jQobj.children('tr:even').addClass('row-odd');
		jQobj.children('tr:odd').addClass('row-even');
	}
	for (var i=0; i<$('.table-bars tr').size(); i++) {
		var jQobj = $($('.table-bars tr').toArray()[i]);
		jQobj.children('td:even').addClass('column-odd');
		jQobj.children('td:odd').addClass('column-even');
	}
	for (var i=0; i<$('.table-grid .body').size(); i++) {
		var jQobj = $($('.table-grid .body').toArray()[i]);
		jQobj.children('tr:even').addClass('row-odd');
		jQobj.children('tr:odd').addClass('row-even');
	}
	for (var i=0; i<$('.table-grid tr').size(); i++) {
		var jQobj = $($('.table-grid tr').toArray()[i]);
		jQobj.children('td:even').addClass('column-odd');
		jQobj.children('td:odd').addClass('column-even');
	}
	
	// special icons
	$('.icon-special').addClass('icon-special-clear');
	$('.icon-special').hover(function() {
		$(this).toggleClass('icon-special-clear',t_ani);
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
	$('.a-broken').hover(function() {
		oldHTML = $(this).html();
		oldHref = $(this).attr('href');
		$(this).html('coming soon...')
		$(this).removeAttr('href');
	}, function() {
		$(this).html(oldHTML);
		$(this).attr('href', oldHref);
	});
});