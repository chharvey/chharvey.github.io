function makepretty() {
  var user_has_CSS_enabled = true; // it is most likely the case that if users have JS enabled then they also have CSS enabled
  if (user_has_CSS_enabled) {
    /** sets the height of the given rectangle to its width */
    $('.Square').css('height', function() {
      return $(this).width();
    });
    /** sets a proportional font size for each square (dependent on square height) */
    $('.Square__Text').css('font-size', function () {
      return $(this).parents('.Square').height() / 4 + 'px';
    });
    /** vertically aligns the textbox in each square (depenedent on font-size) */
    $('.Square__Text').css('top', function () {;
      return ($(this).parents('.Square').height() - $(this).height()) / 2 + 'px';
    });
    /** adjust the border-radius of the textbox proportionally */
    $('.Square__Text').css('border-radius', function () {
      return $(this).height() / 2 + 'px';
    });
    /** Positions the squares in a Fibonacci spiral. */
    (function () {
      /**
        * Creates a fibonacci spiral with one square and a group of other squares, which themselves
        * will be recursively made into a Fibonacci spiral.
        * @param `width`      the width of this spiral
        * @param `pos`        the position of this spiral as 2-D array `[x,y]`
        * @param `square0`    the first square
        * @param `square0pos` ['right'|'top'|'left'|'bottom'] the position of the first square in this spiral
        * @param `others`     an array of other squares
        */
      function Spiral(width, pos, square0, square0pos, others) {
        function phi(n) {
          n = n || 1;
          return Math.pow(Util.PHI_INV, n);
        }
        function shorthand(width, pos, square0pos) {
          return Spiral(width, pos, others[0], square0pos, others.slice(1, others.length));
        }
        switch (square0pos) {
          case 'right':
            var height = width * phi();
            $(square0).css('left',pos[0] + width*phi(2));
            $(square0).css('top', pos[1] + 0);
            if (others) shorthand(width*phi(2), [0,0], 'top');
            break;
          case 'top':
            var height = width / phi();
            $(square0).css('left',pos[0] + 0);
            $(square0).css('top', pos[1] + 0);
            if (others) shorthand(width, [0,height*phi()], 'left');
            break;
          case 'left':
            var height = width * phi();
            $(square0).css('left',pos[0] + 0);
            $(square0).css('top', pos[1] + 0);
            if (others) shorthand(width*phi(2), [width*phi(),0], 'bottom');
            break;
          case 'bottom':
            var height = width / phi();
            $(square0).css('left',pos[0] + 0);
            $(square0).css('top', pos[1] + height*phi(2));
            if (others) shorthand(width, [0,0], 'right');
            break;
          default:
            break;
        }
      }
      // Spiral($('.Spiral').width(), [0,0], )
      /**
        * Returns the product of Phi^n and $('main').width(), where Phi ≈ 0.618034
        * @param n      the power of phi
        * @return       Phi^n * length
        */
      function p(n) {
        return ($('.Spiral').width() * Math.pow(Util.PHI_INV, n));
      }
      var spiral_height = p(1);
      /* this is in JS and not in CSS: in case users have
      JS disabled but CSS not disabled, the position
      should be static (as specified in css file) */
      $('.Square').css('position', 'absolute');

      $('.Spiral > li:nth-child( 1) > .Square').css('left', p(2));
      $('.Spiral > li:nth-child( 3) > .Square').css('top', p(2));
      $('.Spiral > li:nth-child( 4) > .Square').css('left', p(3)).css('top', p(2) + p(5));
      $('.Spiral > li:nth-child( 5) > .Square').css('left', p(3) + p(6)).css('top', p(2));
      $('.Spiral > li:nth-child( 6) > .Square').css('left', p(3)).css('top', p(2));
      $('.Spiral > li:nth-child( 7) > .Square').css('left', p(3)).css('top', p(2) + p(6));
      $('.Spiral > li:nth-child( 8) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6) + p(9));
      $('.Spiral > li:nth-child( 9) > .Square').css('left', p(3) + p(7) + p(10)).css('top', p(2) + p(6));
      $('.Spiral > li:nth-child(10) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6));
      $('.Spiral > li:nth-child(11) > .Square').css('left', p(3) + p(7)).css('top', p(2) + p(6) + p(10));
      $('.Spiral > li:nth-child(12) > .Square').css('left', p(3) + p(7) + p(11)).css('top', p(2) + p(6) + p(10));

      // * positions the devlink square
      $('.Square--Dev').css('top', ($(window).height() - spiral_height) * Math.pow(Util.PHI_INV, 2)  +  p(1)  +  'px');
    })();
    /** centers the group of buttons on the page */
    $('.Spiral')
      .height($('.Spiral').width() * Util.PHI_INV)
      .css('margin-top', ($(window).height() - $('.Spiral').height()) * Math.pow(Util.PHI_INV, 2))
      .css('margin-left', 0);
  }
}

function d3circles() {
  var svg_width = 960;
  var svg_padding = 24;
  var svg = d3.select('main').append('svg').attr('xmlns','http://www.w3.org/2000/svg')
                                           .classed('js-bubbles dark', true)
                                           .attr('viewBox', '0 0 ' + svg_width + ' ' + svg_width)
                                           .attr('preserveAspectRatio', 'xMidYMid');
  var main_link_radius = svg_width/8;
  var side_link_radius = main_link_radius/2;
  (function mainCircles() {
    // adds a group for each main link
    var main_links = svg.append('g').classed('js-main-links', true).attr('transform', 'translate(' + svg_width/2 + ', ' + (svg_width/2 + (side_link_radius+svg_padding)/2) + ')');
    // herebelow, the ORDER of the `transform` attribute's values is RELEVANT!
    // i.e. rotate before translate is different than translate before rotate.
    var main_rotate = {
      mth : 72 * 2,
      web : 72 * 0,
      edu : 72 * 4,
      mus : 72 * 3,
      swm : 72 * 1,
    };
    var main_translate = {
      mth : '0,' + (main_link_radius*2),
      web : '0,' + (main_link_radius*2),
      edu : '0,' + (main_link_radius*2),
      mus : '0,' + (main_link_radius*2),
      swm : '0,' + (main_link_radius*2),
    };
    //transforms each main group
    main_links.append('g').classed('js-mth', true).attr('transform', 'rotate(' + main_rotate.mth + ') translate(' + main_translate.mth + ')');
    main_links.append('g').classed('js-web', true).attr('transform', 'rotate(' + main_rotate.web + ') translate(' + main_translate.web + ')');
    main_links.append('g').classed('js-edu', true).attr('transform', 'rotate(' + main_rotate.edu + ') translate(' + main_translate.edu + ')');
    main_links.append('g').classed('js-mus', true).attr('transform', 'rotate(' + main_rotate.mus + ') translate(' + main_translate.mus + ')');
    main_links.append('g').classed('js-swm', true).attr('transform', 'rotate(' + main_rotate.swm + ') translate(' + main_translate.swm + ')');
    main_links.append('g').classed('center', true);
    // adds a circle and text for each main group
    main_links.selectAll('g').append('circle').attr('r', main_link_radius);
    main_links.selectAll('g').append('text');
    // tranforms each main group text
    main_links.select('.js-mth').select('text').attr('transform', 'rotate(' + (360-main_rotate.mth) + ')').attr('dy','0.5em').text('Math');
    main_links.select('.js-web').select('text').attr('transform', 'rotate(' + (360-main_rotate.web) + ')').attr('dy','0.5em').text('Web');
    main_links.select('.js-edu').select('text').attr('transform', 'rotate(' + (360-main_rotate.edu) + ')').attr('dy','0.5em').text('Edu');
    main_links.select('.js-mus').select('text').attr('transform', 'rotate(' + (360-main_rotate.mus) + ')').attr('dy','0.5em').text('Music');
    main_links.select('.js-swm').select('text').attr('transform', 'rotate(' + (360-main_rotate.swm) + ')').attr('dy','0.5em').text('Swim');
  })();
  (function sideCircles() {
    // adds a group for each side link
    var PHI = (Math.sqrt(5)-1)/2;
    var side_links = svg.append('g').classed('js-side-links', true).attr('transform', 'translate(' + svg_width/2 + ',' + (side_link_radius+svg_padding) + ')');
    var side_rotate = {
      abt : 0,
      res : 0,
      cpr : 0,
    };
    var side_translate = {
      abt :                  0 + ',0',
      res : PHI * -svg_width/2 + ',0',
      cpr : PHI *  svg_width/2 + ',0',
    };
    // transforms each side group
    side_links.append('g').classed('js-abt', true).attr('transform', 'rotate(' + side_rotate.abt + ') translate(' + side_translate.abt + ')');
    side_links.append('g').classed('js-res', true).attr('transform', 'rotate(' + side_rotate.res + ') translate(' + side_translate.res + ')');
    side_links.append('g').classed('js-cpr', true).attr('transform', 'rotate(' + side_rotate.cpr + ') translate(' + side_translate.cpr + ')');
    // adds a circle and text for each side group
    side_links.selectAll('g').append('circle').attr('r', side_link_radius);
    side_links.selectAll('g').append('text');
    // tranforms each side group text
    side_links.select('.js-abt').select('text').attr('transform', 'rotate(' + (360-side_rotate.abt) + ')').attr('dy','0.5em').text('Chris Harvey');
    side_links.select('.js-res').select('text').attr('transform', 'rotate(' + (360-side_rotate.res) + ')').attr('dy','0.5em').text('Résumé');
    side_links.select('.js-cpr').select('text').attr('transform', 'rotate(' + (360-side_rotate.cpr) + ')').attr('dy','0.5em').text('©');
  })();
};


$(document).ready(function () {
  makepretty();
});
$(window).resize(function () {
  makepretty();
});
