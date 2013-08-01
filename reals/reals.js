function numberNodes(jQobj, ssletter) {
	var nodecount = 0;
	jQobj.each(function() {
		$(this).wrapInner(newElem('div').addClass('js-mathnode-content'));
		$(this).prepend(newElem('div').addClass('js-mathnode-label'));
		$(this).children('.js-mathnode-label').html(function() {
			var theparent = $(this).parent();
			var mathnodetype = '';
			if (theparent.hasClass('definition')) {
				mathnodetype = 'Definition';
			} else if (theparent.hasClass('axiom')) {
				mathnodetype = 'Axiom';
			} else if (theparent.hasClass('theorem')) {
				mathnodetype = 'Theorem';
			}
			return mathnodetype + ' ' + ssletter + '.' + (++nodecount);
		});
	});
}
function addNodeLabel(jQobj, ssletter) {
	var nodecount = 0;
	jQobj.wrapInner(newElem('div').addClass('js-mathnode-content'));
	jQobj.prepend(newElem('div').addClass('js-mathnode-label'));
	jQobj.children('.js-mathnode-label').html(function() {
		var theparent = $(this).parent();
		var mathnodetype = '';
		if (theparent.hasClass('definition')) {
			mathnodetype = 'Definition';
		} else if (theparent.hasClass('axiom')) {
			mathnodetype = 'Axiom';
		} else if (theparent.hasClass('theorem')) {
			mathnodetype = 'Theorem';
		}
		return mathnodetype + ' ' + ssletter + '.' + (++nodecount);
	});
}

$(document).ready(function() {
	/** JavaScript 'grabber' classes --- only here for jQuery selectors */
	$('.definition').addClass('js-mathnode');
	$('.axiom').addClass('js-mathnode');
	$('.theorem').addClass('js-mathnode');
	
	numberNodes($('#logical-operators .js-mathnode'), 'A');
	numberNodes($('#first-axioms .js-mathnode'), 'B');
	
		
	addLede($('.proof'), 'Proof. ');
//	addLede($('.informal'), 'Informal Remark. ');
	
	$('a.internal').addClass('up');
//	var sectct = 0;	
//	$('section').each(function() {
//		sectct++;
//		var nodect = 0;
//		$(this).children('.js-mathnode').prepend(function() {
//			return newElem('div').addClass('').html(getMathnodeType($(this)) + sectct + '.' + ++nodect);
//		});
//	});
	
	
//	$('.proof').append(
//		newElem('abbr').addClass('qed').attr('title','quod erat demonstrandum').append(
//			newElem('i').attr('lang','la').html(' q.e.d.').css('color','#0c0')
//		)
//	);
//	
	
//	
//	
//	
//	
//	
	
	
	
	/* changes the text contents of an internal link to the label of the node to which it links. */
//	$('a.internal[href]').html(function() {
//		return $($(this).attr('href') + ' > .label').html();
//	});	
	/* changes the title of an internal link to the contents of the node to which it links. */
//	$('a.internal[href]').attr('title', function() {
//		return $($(this).attr('href') + ' .summary').text();
//	});
});
