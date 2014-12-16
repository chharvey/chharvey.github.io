function p(n, length) {
  // * returns the product of phi^n and length
  var Phi = ((-1 + Math.sqrt(5)) / 2);
  return (length * Math.pow(Phi, n));
}
function positionSquares() {
  // * positions the squares in a Fibonacci spiral
  var mainwidth = $('main').width();
  var P1  = p(1,  mainwidth);
  var P2  = p(2,  mainwidth);
  var P3  = p(3,  mainwidth);
  var P4  = p(4,  mainwidth);
  var P5  = p(5,  mainwidth);
  var P6  = p(6,  mainwidth);
  var P7  = p(7,  mainwidth);
  var P8  = p(8,  mainwidth);
  var P9  = p(9,  mainwidth);
  var P10 = p(10, mainwidth);
  var P11 = p(11, mainwidth);
  var P12 = p(12, mainwidth);
  $('.Square').css('position', 'absolute'); // this is in JS and not in CSS: in case users have
                                            // JS disabled but CSS not disabled, the position
                                            // should be static

  $('.Spiral > li:nth-child( 1) > .Square').css('left', P2);
  $('.Spiral > li:nth-child( 3) > .Square').css('top', P2);
  $('.Spiral > li:nth-child( 4) > .Square').css('left', P3).css('top', P2 + P5);
  $('.Spiral > li:nth-child( 5) > .Square').css('left', P3 + P6).css('top', P2);
  $('.Spiral > li:nth-child( 6) > .Square').css('left', P3).css('top', P2);
  $('.Spiral > li:nth-child( 7) > .Square').css('left', P3).css('top', P2 + P6);
  $('.Spiral > li:nth-child( 8) > .Square').css('left', P3 + P7).css('top', P2 + P6 + P9);
  $('.Spiral > li:nth-child( 9) > .Square').css('left', P3 + P7 + P10).css('top', P2 + P6);
  $('.Spiral > li:nth-child(10) > .Square').css('left', P3 + P7).css('top', P2 + P6);
  $('.Spiral > li:nth-child(11) > .Square').css('left', P3 + P7).css('top', P2 + P6 + P10);
  $('.Spiral > li:nth-child(12) > .Square').css('left', P3 + P7 + P11).css('top', P2 + P6 + P10);
}
function makepretty() {
  var user_has_CSS_enabled = true;
  if (user_has_CSS_enabled) {
    $('.Square').css('height', function() {
      // * sets the height of the given rectangle to its width
      return $(this).width();
    });
    $('.Text').css('font-size', function () {
      // * sets a proportional font size for each square (dependent on square height)
      return $(this).parents('.Square').height() / 4 + 'px';
    });
    $('.Text').css('top', function () {;
      // * vertically aligns the textbox in each square (depenedent on font-size)
      return ($(this).parents('.Square').height() - $(this).height()) / 2 + 'px';
    });
    $('.Text').css('border-radius', function () {
      // * adjust the border-radius of the textbox proportionally
      return $(this).height() / 2 + 'px';
    });
    positionSquares();
    $('.Spiral').css('top', function () {
      // * centers the group of buttons on the page
      return ($(window).height() - p(1, $('main').width())) * p(2, 1) + 'px';
    });
  }
}

(function d3circles() {
  var svg = d3.select('main').append('svg').attr('xmlns','http://www.w3.org/2000/svg')
                                           .attr('id', 'js-bubbles')
                                           .attr('viewBox', '0 0 960 960')
                                           .attr('preserveAspectRatio', 'xMidYMid')
                                           ;

  var main_links = svg.append('g').attr('id', 'js-main-links').attr('transform', 'translate(480, 480)');
  var side_links = svg.append('g').attr('id', 'js-side-links').attr('transform', 'translate(480, 480)');

  // herebelow, the ORDER of the `transform` attribute's values is RELEVANT!
  // i.e. rotate before translate is different than translate before rotate.
  var main_radius = 240;
  var main_angle = 72;
  main_links.append('g').attr('id', 'js-mth').attr('transform', 'rotate(' + main_angle * 4 + ') translate(0,' + -main_radius + ')');
  main_links.append('g').attr('id', 'js-web').attr('transform', 'rotate(' + main_angle * 0 + ') translate(0,' + -main_radius + ')');
  main_links.append('g').attr('id', 'js-edu').attr('transform', 'rotate(' + main_angle * 3 + ') translate(0,' + -main_radius + ')');
  main_links.append('g').attr('id', 'js-mus').attr('transform', 'rotate(' + main_angle * 1 + ') translate(0,' + -main_radius + ')');
  main_links.append('g').attr('id', 'js-swm').attr('transform', 'rotate(' + main_angle * 2 + ') translate(0,' + -main_radius + ')');

  var side_radius = 100;
  var side_angle = 120;
  side_links.append('g').attr('id', 'js-abt').attr('transform', 'rotate(' + side_angle * 0 + ') translate(0,' + -side_radius + ')');
  side_links.append('g').attr('id', 'js-res').attr('transform', 'rotate(' + side_angle * 2 + ') translate(0,' + -side_radius + ')');
  side_links.append('g').attr('id', 'js-cpr').attr('transform', 'rotate(' + side_angle * 1 + ') translate(0,' + -side_radius + ')');

  main_links.selectAll('g').append('circle').attr('r', 100);
  side_links.selectAll('g').append('circle').attr('r', 50);
  svg.selectAll('g').selectAll('g').append('text');

  main_links.select('#js-mth').select('text').attr('transform', 'rotate(' + main_angle * 1 + ')').attr('dy','0.5em').text('Math');
  main_links.select('#js-web').select('text').attr('transform', 'rotate(' + main_angle * 0 + ')').attr('dy','0.5em').text('Web');
  main_links.select('#js-edu').select('text').attr('transform', 'rotate(' + main_angle * 2 + ')').attr('dy','0.5em').text('Edu');
  main_links.select('#js-mus').select('text').attr('transform', 'rotate(' + main_angle * 4 + ')').attr('dy','0.5em').text('Music');
  main_links.select('#js-swm').select('text').attr('transform', 'rotate(' + main_angle * 3 + ')').attr('dy','0.5em').text('Swim');

  side_links.select('#js-abt').select('text').attr('transform', 'rotate(' + side_angle * 0 + ')').attr('dy','0.5em').text('Chris Harvey');
  side_links.select('#js-res').select('text').attr('transform', 'rotate(' + side_angle * 1 + ')').attr('dy','0.5em').text('Résumé');
  side_links.select('#js-cpr').select('text').attr('transform', 'rotate(' + side_angle * 2 + ')').attr('dy','0.5em').text('©');
})();


$(document).ready(function () {
  // makepretty();
});
$(window).resize(function () {
  // makepretty();
});
