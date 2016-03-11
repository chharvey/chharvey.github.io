function makepretty() {
  var user_has_CSS_enabled = true // it is most likely the case that if users have JS enabled then they also have CSS enabled
  if (user_has_CSS_enabled) {
    /** centers the group of buttons on the page */
    $('.c-Spiral')
      .height($('.c-Spiral').width() * Util.PHI_INV)
      .css('margin-top', ($(window).height() - $('.c-Spiral').height()) * Math.pow(Util.PHI_INV, 2))
      .css('margin-left', 0)

    /** Positions and sizes the squares in a Fibonacci spiral. */
    ;(function spiralSquares() {
      var sq_arr = [] // the array of squares to create the spiral
      /**
        * Creates a fibonacci spiral with one square and a group of other squares, which themselves
        * will be recursively made into a Fibonacci spiral.
        * Note that this function only sets the widths and positions the squares. It does not set
        * the heights, thereby making them geometrically *square*.
        * @param width      the width of this spiral
        * @param pos        the position of this spiral as 2-D array `[x,y]`
        * @param square0    the first square
        * @param square0pos ['right'|'top'|'left'|'bottom'] the position of the first square in this spiral
        * @param others     an array of other squares
        */
      function Spiral(width, coords, square0, square0pos, others) {
        var self = this
        var cases
        this.width = width
        this.x = coords[0]
        this.y = coords[1]

        function phi(n) {
          n = n || 1
          return Math.pow(Util.PHI_INV, n)
        }
        /**
         * Sets the width and position of `$(square0)`
         * @param  {number} w            width of `$(square0)`
         * @param  {[number, number]} ds relative position of `$(square0)` to this spiral (starts at [self.x, self.y])
         */
        function setFirstSquare(w, ds) {
          $(square0)
            .width(w)
            .css('left', self.x + ds[0])
            .css('top',  self.y + ds[1])
        }
        /**
         * a shorthand for recursively creating a new Spiral object
         * @param  {number} width        the width of the new spiral
         * @param  {[number, number]} dr the relative position of the new spiral to this spiral (starts at [self.x, self.y])
         * @param  {string} square0pos   string representing position of first square in the next spiral
         */
        function newSpiralShorthand(width, dr, square0pos) {
          new Spiral(width, [self.x+dr[0], self.y+dr[1]], others[0], square0pos, others.slice(1))
        }
        cases = {
          right: function (spiral) {
            spiral.height = spiral.width * phi()
            setFirstSquare(spiral.width*phi(), [spiral.width*phi(2), 0])
            if (others.length) newSpiralShorthand(spiral.width*phi(2), [0, 0], 'top')
          }
        , top: function (spiral) {
            spiral.height = spiral.width / phi()
            setFirstSquare(spiral.width, [0, 0])
            if (others.length) newSpiralShorthand(spiral.width, [0, spiral.height*phi()], 'left')
          }
        , left: function (spiral) {
            spiral.height = spiral.width * phi()
            setFirstSquare(spiral.width*phi(), [0, 0])
            if (others.length) newSpiralShorthand(spiral.width*phi(2), [spiral.width*phi(), 0], 'bottom')
          }
        , bottom: function (spiral) {
            spiral.height = spiral.width / phi()
            setFirstSquare(spiral.width, [0, spiral.height*phi(2)])
            if (others.length) newSpiralShorthand(spiral.width, [0, 0], 'right')
          }
        }
        $(square0).addClass('js-square--' + square0pos)
        cases[square0pos](this)
      }
      // TODO: create array by using filtered jquery object, instead of pushing
      for (var i = 1; i <= 12; i++) {
        sq_arr.push('.c-Spiral > li:nth-child(' + i + ') > .c-Square')
      }
      new Spiral($('.c-Spiral').width(), [0,0], sq_arr[0], 'right', sq_arr.slice(1))
    })()
    /**
     * 1. makes the squares geometrically square (sets height = width).
     * 2. position absolute
     * 3. adjusts background images
     * note: need this outside of Square() function for those .c-Squares not inside .c-Spiral
     */
    $('.c-Square')
      .height(function () { return $(this).width() })
      .css('position', 'absolute')
      .mouseleave(function() { $(this).addClass('js-square--funnel') })
    /** positions and sizes the devlink square */
    $('.c-Square--dev')
      .height(function () { return $(this).width() })
      .addClass('js-square--bottom')
      .css('top', $('.c-Spiral').height())

    /** sets a proportional font size for each square (dependent on square height) */
    /** vertically aligns the textbox in each square (depenedent on font-size) */
    /** adjusts the border-radius of the textbox proportionally (dependent on square height) */
    $('.c-Square__Text')
      .css('font-size', function () {
        return $(this).parents('.c-Square').height() / 4 + 'px'
      }).css('top', function () {
        return ($(this).parents('.c-Square').height() - $(this).height()) / 2 + 'px'
      }).css('border-radius', function () {
        return $(this).height() / 2 + 'px'
      })
  }
}

function d3circles() {
  var svg_width = 960
    , svg_padding = 24
    , svg = d3.select('main').append('svg')
        .attr('xmlns','http://www.w3.org/2000/svg')
        .attr('viewBox', '0 0 ' + svg_width + ' ' + svg_width)
        .attr('preserveAspectRatio', 'xMidYMid')
        .classed('js-bubbles dark', true)
  var main_link_radius = svg_width/8
    , side_link_radius = main_link_radius/2
  ;(function mainCircles() {
    // adds a group for each main link
    var main_links = svg.append('g').classed('js-main-links', true).attr('transform', 'translate(' + svg_width/2 + ', ' + (svg_width/2 + (side_link_radius+svg_padding)/2) + ')')
    // herebelow, the ORDER of the `transform` attribute's values is RELEVANT!
    // i.e. rotate before translate is different than translate before rotate.
    var main_rotate = {
      mth : 72 * 2
    , web : 72 * 0
    , edu : 72 * 4
    , mus : 72 * 3
    , swm : 72 * 1
    }
    var main_translate = {
      mth : '0,' + (main_link_radius*2)
    , web : '0,' + (main_link_radius*2)
    , edu : '0,' + (main_link_radius*2)
    , mus : '0,' + (main_link_radius*2)
    , swm : '0,' + (main_link_radius*2)
    }
    //transforms each main group
    main_links.append('g').classed('js-mth', true).attr('transform', 'rotate(' + main_rotate.mth + ') translate(' + main_translate.mth + ')')
    main_links.append('g').classed('js-web', true).attr('transform', 'rotate(' + main_rotate.web + ') translate(' + main_translate.web + ')')
    main_links.append('g').classed('js-edu', true).attr('transform', 'rotate(' + main_rotate.edu + ') translate(' + main_translate.edu + ')')
    main_links.append('g').classed('js-mus', true).attr('transform', 'rotate(' + main_rotate.mus + ') translate(' + main_translate.mus + ')')
    main_links.append('g').classed('js-swm', true).attr('transform', 'rotate(' + main_rotate.swm + ') translate(' + main_translate.swm + ')')
    main_links.append('g').classed('center', true)
    // adds a circle and text for each main group
    main_links.selectAll('g').append('circle').attr('r', main_link_radius)
    main_links.selectAll('g').append('text')
    // tranforms each main group text
    main_links.select('.js-mth').select('text').attr('transform', 'rotate(' + (360-main_rotate.mth) + ')').attr('dy','0.5em').text('Math')
    main_links.select('.js-web').select('text').attr('transform', 'rotate(' + (360-main_rotate.web) + ')').attr('dy','0.5em').text('Web')
    main_links.select('.js-edu').select('text').attr('transform', 'rotate(' + (360-main_rotate.edu) + ')').attr('dy','0.5em').text('Edu')
    main_links.select('.js-mus').select('text').attr('transform', 'rotate(' + (360-main_rotate.mus) + ')').attr('dy','0.5em').text('Music')
    main_links.select('.js-swm').select('text').attr('transform', 'rotate(' + (360-main_rotate.swm) + ')').attr('dy','0.5em').text('Swim')
  })()
  ;(function sideCircles() {
    // adds a group for each side link
    var side_links = svg.append('g').classed('js-side-links', true).attr('transform', 'translate(' + svg_width/2 + ',' + (side_link_radius+svg_padding) + ')')
    var side_rotate = {
      abt : 0
    , res : 0
    , cpr : 0
    }
    var side_translate = {
      abt :                           0 + ',0'
    , res : Util.PHI_INV * -svg_width/2 + ',0'
    , cpr : Util.PHI_INV *  svg_width/2 + ',0'
    }
    // transforms each side group
    side_links.append('g').classed('js-abt', true).attr('transform', 'rotate(' + side_rotate.abt + ') translate(' + side_translate.abt + ')')
    side_links.append('g').classed('js-res', true).attr('transform', 'rotate(' + side_rotate.res + ') translate(' + side_translate.res + ')')
    side_links.append('g').classed('js-cpr', true).attr('transform', 'rotate(' + side_rotate.cpr + ') translate(' + side_translate.cpr + ')')
    // adds a circle and text for each side group
    side_links.selectAll('g').append('circle').attr('r', side_link_radius)
    side_links.selectAll('g').append('text')
    // tranforms each side group text
    side_links.select('.js-abt').select('text').attr('transform', 'rotate(' + (360-side_rotate.abt) + ')').attr('dy','0.5em').text('Chris Harvey')
    side_links.select('.js-res').select('text').attr('transform', 'rotate(' + (360-side_rotate.res) + ')').attr('dy','0.5em').text('Résumé')
    side_links.select('.js-cpr').select('text').attr('transform', 'rotate(' + (360-side_rotate.cpr) + ')').attr('dy','0.5em').text('©')
  })()
}


$(document).ready(function () {
  makepretty()
})
$(window).resize(function () {
  makepretty()
})
