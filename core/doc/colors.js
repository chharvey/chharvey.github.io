var colorNameArray = [
  'hue-base',
  'hue-comp',
  'hue-tria-warm',
  'hue-tria-cool',
  'hue-tetr-warm',
  'hue-tetr-cool',
  'hue-anal-warm',
  'hue-anal-cool'
];
/**
  * Creates a table containing empty cells corresponding to different levels of
  * saturation and value for a particular hue.
  * This function takes the hue name as a parameter. See `colorNameArray` above.
  */
function createTable(name) {
  function tdArray() {
    return [
      newElem('td').addClass('Cell val-full'),
      newElem('td').addClass('Cell val-lite'),
      newElem('td').addClass('Cell val-medi'),
      newElem('td').addClass('Cell val-dark')
    ];
  }
  return newElem('table').addClass('Table colortable ' + name).append([
    newElem('thead').append(
      newElem('tr').append([
        newElem('th').addClass('Cell Hc huetitle'),
        newElem('th').addClass('Cell Hc val-full'),
        newElem('th').addClass('Cell Hc val-lite'),
        newElem('th').addClass('Cell Hc val-medi'),
        newElem('th').addClass('Cell Hc val-dark')
      ])
    ),
    newElem('tbody').append([
      newElem('tr').addClass('sat-alph').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-beta').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-gamm').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-delt').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-epsi').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-zeta').append(newElem('th').addClass('Cell Hc')).append(tdArray())
    ])
  ]);
}
function allTables() {
  var tableArray = [];
  for (var i = 0; i < colorNameArray.length; i++) {
    tableArray[i] = createTable(colorNameArray[i]);
  }
  return tableArray;
}
/**
  * Creates a table containing empty cells corresponding to different levels of
  * saturation and value for a particular hue.
  * This function takes a numeric degree as a parameter. See `degreeArray` below.
  */
function table(degree) {
  function tdArray() {
    return [
      newElem('td').addClass('Cell val-full'),
      newElem('td').addClass('Cell val-lite'),
      newElem('td').addClass('Cell val-medi'),
      newElem('td').addClass('Cell val-dark')
    ];
  }
  return newElem('table').addClass('Table colortable hue-' + degree).append([
    newElem('thead').append(
      newElem('tr').append([
        newElem('th').addClass('Cell Hc huetitle'),
        newElem('th').addClass('Cell Hc val-full'),
        newElem('th').addClass('Cell Hc val-lite'),
        newElem('th').addClass('Cell Hc val-medi'),
        newElem('th').addClass('Cell Hc val-dark')
      ])
    ),
    newElem('tbody').append([
      newElem('tr').addClass('sat-alph').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-beta').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-gamm').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-delt').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-epsi').append(newElem('th').addClass('Cell Hc')).append(tdArray()),
      newElem('tr').addClass('sat-zeta').append(newElem('th').addClass('Cell Hc')).append(tdArray())
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
/**
  * Fills the empty cells with codes for its background color.
  * (Remember, CSS will give the cells their background color.)
  */
function insertColorCodes() {
  $('.colortable td').append(
    newElem('code').addClass('colorcode').html('?')
  );
  $('.colorcode').html(function () {
    return rgbToHex($(this).parent().css('background-color'));
  });
}

/**
  * Adds a color name to corresponding cell in the palette.
  * Each color name is a link to its description.
  */
function insertColorNames() {
  /**
    * The colors used in the site. Each entry of this array is another array: [hue, sat, val, id].
    */
  var colorArray = [
    [217, 2.13,   100, 'aperture_white'],
    [ 37,  100,  2.13, 'aperture_black'],
    [217,  100, 100, 'atlas'],
    [ 37,  100, 100, 'pbody'],
    [208, 83.3, 100, 'repulsion'],
    [ 28, 83.3, 100, 'propulsion'],
    [  5,  100, 100, 'deploying'],
    [ 55, 66.6, 100, 'hereye'],
    [226,  100,  50, 'lakesuperior'],
    [ 28, 66.6,  50, 'cavescaves'],
    [199,   50,  50, 'facilityabyss'],
    [ 46,  100,  75, 'asbestos'],
    [ 69, 83.3,  75, 'neurotoxin'],
    [271,  100,  75, 'vilify'],
    [185, 16.6, 100, 'bridges'],
    [343, 33.3, 100, 'companion']
  ];
  for (var i = 0; i < colorArray.length; i++) {
    var hue = colorArray[i][0];
    var sat = colorArray[i][1];
    var val = colorArray[i][2];
    var id  = colorArray[i][3];

    var satClass = 0;
    var valClass = 0;
    var idId = '#' + id;

    if      (sat ===  100) {satClass = 'tr.sat-alph';}
    else if (sat === 83.3) {satClass = 'tr.sat-beta';}
    else if (sat === 66.6) {satClass = 'tr.sat-gamm';}
    else if (sat ===   50) {satClass = 'tr.sat-delt';}
    else if (sat === 33.3) {satClass = 'tr.sat-epsi';}
    else if (sat === 16.6) {satClass = 'tr.sat-zeta';}
    else {}

    if      (val === 100) {valClass = 'td.val-full';}
    else if (val ===  75) {valClass = 'td.val-lite';}
    else if (val ===  50) {valClass = 'td.val-medi';}
    else if (val ===  25) {valClass = 'td.val-dark';}
    else {}

    $('table.hue-' + hue + ' ' + satClass + ' ' + valClass).prepend(
      newElem('a').addClass('Link colorname').attr('href', idId).html($(idId + ' h1').html())
    );
  }
}
$(document).ready(function () {
  $('#palettes').append([
    newElem('div').addClass('Gcol w-f1o2').append(tables( 0, 11)),
    newElem('div').addClass('Gcol w-f1o2').append(tables(12, 23))
  ]);
  $('#palettes2').append(function () {
    var k = 0;
    var gRowArray = [];
    for (var i = 0; i < 4; i++) {
      gRowArray[i] = newElem('div').addClass('Grow').append(function() {
        gColArray = [];
        for (var j = 0; j < 2; j++) {
          gColArray[j] = newElem('div').addClass('Gcol w-f1o2').append(createTable(colorNameArray[k]));
          k++;
        }
        return gColArray;
      });
    }
    return gRowArray;
  });
  insertColorCodes();
  insertColorNames();
});
