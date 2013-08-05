function numberNodes(sectionid, sectionLetter) {
	var nodecount = 0;
	
	$(sectionid + ' .definition .js-mathnode-label, ' + sectionid + ' .theorem .js-mathnode-label').append(function() {
		return sectionLetter + (++nodecount);
	});
}
function numberAxioms(pageid, axiomcount) {
	$(pageid).each(function() {
		$(this).find('.axiom .js-mathnode-label').append(function() {
			return engNumArray[++axiomcount];
		});
	});
}
var engNumArray = [
	'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
	'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
$(document).ready(function() {
	/** JavaScript 'grabber' classes --- only here for jQuery selectors */
	$('.definition').addClass('js-mathnode');
	$('.axiom').addClass('js-mathnode');
	$('.theorem').addClass('js-mathnode');
		
	$('.js-mathnode').each(function() {
		$(this).wrapInner(newElem('div').addClass('js-mathnode-content'));
		$(this).prepend(newElem('div').addClass('js-mathnode-label'));
	});
	$('.definition .js-mathnode-label').append('Definition ');
	$('.axiom .js-mathnode-label').append('Axiom ');
	$('.theorem .js-mathnode-label').append('Theorem ');
	
	numberAxioms('#propositional-logic', 0);
	numberNodes('#logical-operators', 'I.A.');
	numberNodes('#logical-axioms', 'I.B.');
	
	numberAxioms('#set-theory', 12);
	numberNodes('#predicate-logic', 'II.A.');
	numberNodes('#set-axioms', 'II.B.');
	
	/* changes the text contents of an internal link to the label of the node to which it links. */
//	$('a.internal[href]').html(function() {
//		return $($(this).attr('href') + ' > .label').html();
//	});	
	/* changes the title of an internal link to the contents of the node to which it links. */
//	$('a.internal[href]').attr('title', function() {
//		return $($(this).attr('href') + ' .summary').text();
//	});
});
