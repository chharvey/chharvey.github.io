/** Creates a table containing empty cells corresponding to different levels of saturation and value for a particular hue. */
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
/** Creates an array of tables. */
function tables(start, stop) {
	/** The degrees of the base hues. */
	var degreeArray = [
		127, 163, 185, 199, 208, 213,
		217, 221, 226, 235, 249, 271,
		307, 343,   5,  19,  28,  33,
		 37,  41,  46,  55,  69,  91
	];
	var tableArray = [];
	for (var i = start; i <= stop; i++) {
		tableArray[i - start] = table(degreeArray[i]);
	}
	return tableArray;
}
/** Fills the empty cells with codes for its background color. (Remember, CSS will give the cells their background color.) */
function insertColorCodes() {
	$('.colortable td').append(
		newElem('code').addClass('lang-css colorcode').html('?')
	);
	$('.colorcode').html(function () {
		return rgbToHex($(this).parent().css('background-color'));
	});
}
/** The colors used in the site. Each entry of this array is another array: [hue, sat, val, id]. */
var colorArray = [
	[217, 2.13,   100, 'aperture-white'],
	[ 37,  100,  2.13, 'aperture-black'],
	[217,  100, 100, 'atlas'],
	[ 37,  100, 100, 'pbody'],
	[208, 83.3, 100, 'repulsion'],
	[ 28, 83.3, 100, 'propulsion'],
	[  5,  100, 100, 'deploying'],
	[ 55, 66.6, 100, 'her-eye'],
	[226,  100,  50, 'lake-superior'],
	[ 28, 66.6,  50, 'caves-caves'],
	[199,   50,  50, 'facility-abyss'],
	[ 46,  100,  75, 'asbestos'],
	[343, 33.3, 100, 'companion'],
	[ 69, 83.3,  75, 'neurotoxin']
//	Excursion Funnel, forward
//	Excursion Funnel, backward
//
//	Hard Light Bridge
//	setupColors(217,   100, 100, '#bridges-of-light');
//	@bridges-of-light:     hsv(207, 33.33%, 100%);
//	@light-bridge-edge:    hsv(185, 66.66%, 100%);
//
//	@vilify:               hsv(277, 66.66%,  75%);
];
/** Adds a color name to corresponding cell in the palette. Each color name is a link to its description. */
function insertColorNames() {
	for (var i = 0; i < colorArray.length; i++) {
		var hue = colorArray[i][0];
		var sat = colorArray[i][1];
		var val = colorArray[i][2];
		var id  = colorArray[i][3];
		
		var satClass = 0;
		var valClass = 0;
		var idId = '#' + id;
		
		     if (sat ===  100) {satClass = 'tr.sat-alph';}
		else if (sat === 83.3) {satClass = 'tr.sat-beta';}
		else if (sat === 66.6) {satClass = 'tr.sat-gamm';}
		else if (sat ===   50) {satClass = 'tr.sat-delt';}
		else if (sat === 33.3) {satClass = 'tr.sat-epsi';}
		else if (sat === 16.6) {satClass = 'tr.sat-zeta';}
		else                   {}
		
		     if (val === 100) {valClass = 'td.val-full';}
		else if (val ===  75) {valClass = 'td.val-lite';}
		else if (val ===  50) {valClass = 'td.val-medi';}
		else if (val ===  25) {valClass = 'td.val-dark';}
		else                  {}
		
		$('table.hue-' + hue + ' ' + satClass + ' ' + valClass).prepend(
			newElem('a').addClass('colorname').attr('href', idId).html($(idId + ' h1').html())
		);
	}
}
/** Automatically styles CSS id selectors with background colors. */
//function setupColors() {
//	for (var i = 0; i < colorArray.length; i++) {
//		var theColor = colorArray[i];
//		var rgb = hsvToRgb(theColor[0], theColor[1], theColor[2]);
//		var hex = rgbToHex('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
//		$('#' + theColor[3]).css('background-color', hex);
//	}
//}
$(document).ready(function () {
	$('.palettes').append([
		newElem('div').addClass('group-cold').append(tables( 0, 11)),
		newElem('div').addClass('group-warm').append(tables(12, 23))
	]);
	insertColorCodes();
	insertColorNames();
});
