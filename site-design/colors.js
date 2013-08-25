function makeTables(start, stop) {
	var hueArray = [
		127, 163, 185, 199, 208, 213,
		217, 221, 226, 235, 249, 271,
		307, 343,   5,  19,  28,  33,
		 37,  41,  46,  55,  69,  91
	];
	var tableArray = [];
	for (var i=start; i<stop; i++) {
		tableArray[i - start] = newElem('table').addClass('hue-' + hueArray[i]).append(new Array(
			newElem('thead').append(
				newElem('tr').append(new Array(
					newElem('th').html(hueArray[i] + '&deg; hue'),
					newElem('th').html('100% val'),
					newElem('th').html('75% val'),
					newElem('th').html('50% val'),
					newElem('th').html('25% val')
				))
			),
			newElem('tbody').append(function() {
				var trArray = new Array(
					newElem('tr').addClass('sat-alph').append(newElem('th').html('100% sat')),
					newElem('tr').addClass('sat-beta').append(newElem('th').html('83.33% sat')),
					newElem('tr').addClass('sat-gamm').append(newElem('th').html('66.66% sat')),
					newElem('tr').addClass('sat-delt').append(newElem('th').html('50% sat')),
					newElem('tr').addClass('sat-epsi').append(newElem('th').html('33.33% sat')),
					newElem('tr').addClass('sat-zeta').append(newElem('th').html('16.66% sat'))
				);
				for (var j=0; j<trArray.length; j++) {
					$(trArray[j]).append(new Array(
						newElem('td').addClass('val-full'),
						newElem('td').addClass('val-lite'),
						newElem('td').addClass('val-med'),
						newElem('td').addClass('val-dark')
					));
				}
				return trArray;
			})
		));
	}
	return tableArray;
}
function insertColorname(hue, sat, val, id) {
	if (sat ==   100) {sat = 'tr.sat-alph';}
	if (sat == 83.33) {sat = 'tr.sat-beta';}
	if (sat == 66.66) {sat = 'tr.sat-gamm';}
	if (sat ==    50) {sat = 'tr.sat-delt';}
	if (sat == 33.33) {sat = 'tr.sat-epsi';}
	if (sat == 16.66) {sat = 'tr.sat-zeta';}
	
	if (val == 100) {val = 'td.val-full';}
	if (val ==  75) {val = 'td.val-lite';}
	if (val ==  50) {val = 'td.val-med';}
	if (val ==  25) {val = 'td.val-dark';}
	
	$('table.hue-'+hue + ' ' + sat + ' ' + val).append(
		newElem('a').addClass('colorname').attr('href', id).html(
			$('li'+id + ' span.h-gamma').html()
		)
	);
}
$(document).ready(function() {
	$('.palettes .group1').append(makeTables( 0, 12));
	$('.palettes .group2').append(makeTables(12, 24));
	
	$('.palettes td, .chosencolors > li').append(
		newElem('div').addClass('colorcode invisible').html('What is this color?')
	).hover(function() {
		$(this).children('.colorcode').toggleClass('invisible');
	});
	$('.colorcode').html(function() {
		return $(this).parent().css('background-color');
	});
	
//	insertColorname(217,   100, 100, '#atlas-blue');
//	insertColorname( 37,   100, 100, '#pbody-orange');
	
//	insertColorname(217,   100, 100, '#bridges-of-light');
//	insertColorname(185, 66.66, 100, '#light-bridge-edge');
//	insertColorname(217,   100, 100, '#asbestos');
//	insertColorname(217,   100, 100, '#lake-superior');
//	insertColorname(217,   100, 100, '#facility-abyss');
//	insertColorname(217,   100, 100, '#caves-caves');
//	insertColorname(217,   100, 100, '#deploying');
//	insertColorname(217,   100, 100, '#her-eye');
//	insertColorname(217,   100, 100, '#neurotoxin');
//	insertColorname(217,   100, 100, '#vilify');
//	insertColorname(217,   100, 100, '#heart-of-a-companion');
});
