var degreeArray = [
	127, 163, 185, 199, 208, 213,
	217, 221, 226, 235, 249, 271,
	307, 343,   5,  19,  28,  33,
	 37,  41,  46,  55,  69,  91
];
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
	$('.colortable td').append(
		newElem('code').addClass('lang-css colorcode').html('?')
	);
	$('.colorcode').html(function () {
		return rgbToHex($(this).parent().css('background-color'));
	});
}
var colorArray = [
	[0, 0, 100, 'aperture-white'],
	[0, 0, 0, 'aperture-black'],
	[217,  100, 100, 'atlas'],
	[ 37,  100, 100, 'pbody'],
	[  5,  100, 100, 'deploying'],
	[ 55, 66.6, 100, 'her-eye'],
	[226,  100,  50, 'lake-superior'],
	[ 28, 66.6,  50, 'caves-caves'],
	[199,   50,  50, 'facility-abyss'],
	[ 46,  100,  75, 'asbestos'],
	[343, 33.3, 100, 'companion'],
	[ 69, 83.3,  75, 'neurotoxin']
];

//Excursion Funnel, forward
//Excursion Funnel, backward
//Repulsion Gel
//Propulsion Gel
//
//Hard Light Bridge
//setupColors(217,   100, 100, '#bridges-of-light');
//@bridges-of-light:     hsv(207, 33.33%, 100%);
//@light-bridge-edge:    hsv(185, 66.66%, 100%);
//
//@vilify:               hsv(277, 66.66%,  75%);
//setupColors(217,   100, 100, '#vilify');

function insertColorNames() {
	for (var i = 0; i < colorArray.length; i++) {
		var hue = colorArray[i][0];
		var sat = colorArray[i][1];
		var val = colorArray[i][2];
		var id  = colorArray[i][3];

		if (sat ===  100) {sat = 'tr.sat-alph';}
		if (sat === 83.3) {sat = 'tr.sat-beta';}
		if (sat === 66.6) {sat = 'tr.sat-gamm';}
		if (sat ===   50) {sat = 'tr.sat-delt';}
		if (sat === 33.3) {sat = 'tr.sat-epsi';}
		if (sat === 16.6) {sat = 'tr.sat-zeta';}

		if (val === 100) {val = 'td.val-full';}
		if (val ===  75) {val = 'td.val-lite';}
		if (val ===  50) {val = 'td.val-medi';}
		if (val ===  25) {val = 'td.val-dark';}
		
		id = '#' + id;
		
		$('table.hue-' + hue + ' ' + sat + ' ' + val).prepend(
			newElem('a').addClass('colorname').attr('href', id).html($(id + ' h1').html())
		);
	}
}
function setupColors() {
	for (var i = 0; i < colorArray.length; i++) {
		var theColor = colorArray[i];
		var rgb = hsvToRgb(theColor[0], theColor[1], theColor[2]);
		var hex = rgbToHex('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
		$('#' + theColor[3]).css('background-color', hex);
	}
}
$(document).ready(function() {
	$('.palettes').append([
		newElem('div').addClass('group-cold').append(tables( 0, 12)),
		newElem('div').addClass('group-warm').append(tables(12, 24))
	]);
	insertColorCodes();
	insertColorNames();
	setupColors();
});
