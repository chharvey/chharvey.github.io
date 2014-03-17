var degreeArray = [
	127, 163, 185, 199, 208, 213,
	217, 221, 226, 235, 249, 271,
	307, 343,   5,  19,  28,  33,
	 37,  41,  46,  55,  69,  91
];
//degreeArray = [
//	  0,  15,  30,  45,  60,  75,
//	 90, 105, 120, 135, 150, 165,
//	180, 195, 210, 225, 240, 255,
//	270, 285, 300, 315, 330, 345
//];
function table(degree) {
	function tdArray() {
		return [
			newElem('td').addClass('val-full'),
			newElem('td').addClass('val-lite'),
			newElem('td').addClass('val-medi'),
			newElem('td').addClass('val-dark')
		];
	}
	return newElem('table').addClass('colortable hue-' + degree).append([
		newElem('thead').append(
			newElem('tr').append([
				newElem('th').html(degree + '&deg; hue'),
				newElem('th').html('100% val'),
				newElem('th').html( '75% val'),
				newElem('th').html( '50% val'),
				newElem('th').html( '25% val')
			])
		),
		newElem('tbody').append([
			newElem('tr').addClass('sat-alph').append(newElem('th').html( '100% sat')).append(tdArray()),
			newElem('tr').addClass('sat-beta').append(newElem('th').html('83.3% sat')).append(tdArray()),
			newElem('tr').addClass('sat-gamm').append(newElem('th').html('66.6% sat')).append(tdArray()),
			newElem('tr').addClass('sat-delt').append(newElem('th').html(  '50% sat')).append(tdArray()),
			newElem('tr').addClass('sat-epsi').append(newElem('th').html('33.3% sat')).append(tdArray()),
			newElem('tr').addClass('sat-zeta').append(newElem('th').html('16.6% sat')).append(tdArray())
		])
	]);
}
function tables(start, stop) {
	var tableArray = [];
	for (var i = start; i < stop; i++) {
		tableArray[i - start] = table(degreeArray[i]);
	}
	return tableArray;
}
function insertColorCodes() {
	$('.colortable td, .chosencolors > li').append(
		newElem('div').addClass('colorcode').html('#')
	);
	$('.colorcode').html(function () {
		return rgbToHex($(this).parent().css('background-color'));
	});
}
function insertColorNames() {
//	function colorNameLink(hue, sat, val, id) {
//		if (sat ===   100) {sat = 'tr.sat-alph';}
//		if (sat === 83.33) {sat = 'tr.sat-beta';}
//		if (sat === 66.66) {sat = 'tr.sat-gamm';}
//		if (sat ===    50) {sat = 'tr.sat-delt';}
//		if (sat === 33.33) {sat = 'tr.sat-epsi';}
//		if (sat === 16.66) {sat = 'tr.sat-zeta';}
//
//		if (val === 100) {val = 'td.val-full';}
//		if (val ===  75) {val = 'td.val-lite';}
//		if (val ===  50) {val = 'td.val-medi';}
//		if (val ===  25) {val = 'td.val-dark';}
//
//		$('table.hue-' + hue + ' ' + sat + ' ' + val).prepend(
//			newElem('a').addClass('colorname').attr('href', id).html(
//				$('li' + id + ' span.h-gamma').html()
//			)
//		);
//	}
//	colorNameLink(217,   100, 100, '#atlas-blue');
//	colorNameLink( 37,   100, 100, '#pbody-orange');
//	colorNameLink(217,   100, 100, '#bridges-of-light');
//	colorNameLink(185, 66.66, 100, '#light-bridge-edge');
//	colorNameLink(217,   100, 100, '#asbestos');
//	colorNameLink(217,   100, 100, '#lake-superior');
//	colorNameLink(217,   100, 100, '#facility-abyss');
//	colorNameLink(217,   100, 100, '#caves-caves');
//	colorNameLink(217,   100, 100, '#deploying');
//	colorNameLink(217,   100, 100, '#her-eye');
//	colorNameLink(217,   100, 100, '#neurotoxin');
//	colorNameLink(217,   100, 100, '#vilify');
//	colorNameLink(217,   100, 100, '#heart-of-a-companion');
}
$(document).ready(function() {
	$('.palettes').append([
		newElem('div').addClass('group-cold').append(tables( 0, 12)),
		newElem('div').addClass('group-warm').append(tables(12, 24))
	]);
	insertColorCodes();
	insertColorNames();
});
