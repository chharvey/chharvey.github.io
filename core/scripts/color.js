/**
 * Constructs a 256-bit color that can be displayed in a pixel, given three primary color components.
 * @param `red` optional non-negative integer ≤ 255, defaults to 0; the red   component of this color
 * @param `grn` optional non-negative integer ≤ 255, defaults to 0; the green component of this color
 * @param `blu` optional non-negative integer ≤ 255, defaults to 0; the blue  component of this color
 */
function Color(red, grn, blu) {
  var self = this

  self.red   = +red || 0
  self.green = +grn || 0
  self.blue  = +blu || 0

  /**
   * The HSV-space hue of this color, or what "color" this color is.
   */
  self.hsv_hue = (function () {
    return 0 // FIXME
  })()
  /**
   * The vividness of this color. A lower saturation means the color is closer to white,
   * a higher saturation means the color is more true to its hue.
   */
  self.hsv_sat = (function () {
    return 0 // FIXME
  })()
  /**
   * The brightness of this color. A lower value means the color is closer to black, a higher
   * value means the color is more true to its hue.
   * The HSV-space value ("brightness") of this color is equivalent to the ratio of the
   * brightest RGB-component’s value to 255, as a percentage.
   */
  self.hsv_val = (function () {
    return Math.max(self.red, self.green, self.blue) / 255
  })()
  /**
   * The Hue of this color. Identical to `this.hsv_hue`.
   */
  self.hsl_hue = (function () {
    return self.hsv_hue
  })()
  /**
   * The amount of "color" in the color. A lower saturation means the color is more grayer,
   * a higher saturation means the color is more colorful.
   */
  self.hsl_sat = (function () {
    return 0 // FIXME
  })();
  /**
   * How "white" or "black" the color is. A lower luminosity means the color is closer to black,
   * a higher luminosity means the color is closer to white.
   */
  self.hsl_lum = (function () {
    return 0 // FIXME
  })()
}

/**
 * Returns a new color that is the complement of this color.
 * The complement of a color is the difference between that color and white (#fff).
 * @return a new Color object that corresponds to this color’s complement
 */
Color.prototype.complement = function complement() {
  return new Color(255 - this.red, 255 - this.green, 255 - this.blue)
}

/**
 * Returns a new color that is the inverse of this color.
 * The inverse of a color is that color with a hue rotation of 180 degrees.
 * @return a new Color object that corresponds to this color’s inverse
 */
Color.prototype.invert = function invert() {
  var newhue = (this.hsv_hue + 180) % 360
  return Color.newColorHSV(newhue, this.hsv_sat, this.hsv_val)
}

/**
 * Makes a new color that is a brighter version of this color by a percentage.
 * 1.0 corresponds to making it completely white (#fff), and 0% keeps this color the same.
 * A negative parameter will darken this color (see `this.darken(p)`).
 * @param `p` must be between -1.0 and 1.0; the percentage by which to lighten this color
 * @return    a new Color object that corresponds to this color brightened by a percentage `p`
 */
Color.prototype.brighten = function brighten(p) {
  // return Color.newColorHSL(this.hsl_hue, this.hsl_sat, this.hsl_val + p)
}
/**
 * Makes a new color that is a darker version of this color by a percentage.
 * 1.0 corresponds to making it completely black (#000), abd 0% keeps this color the same.
 * A negative parameter will lighten this color (see `this.brighten(p)`).
 * @param `p` must be between -1.0 and 1.0; the percentage by which to darken this color
 * @return    a new Color object that corresponds to this color darkened by a percentage `p`
 */
Color.prototype.darken = function darken(p) {
  // return Color.newColorHSL(this.hsl_hue, this.hsl_sat, this.hsl_val - p)
  // return this.brighten(-p)
}

/**
 * Mixes (averages) another color with this color, with a given weight favoring that color.
 * If `w == 0.0`, this method will return exactly this color.
 * `w == 1.0` will return exactly the other color.
 * `w == 0.5` (default if omitted) will result in a perfectly even mix.
 * @param `color` required Color object; the second color
 * @param `w`     optional number between 0.0 and 1.0, defaults to 0.5; the weight favoring the other color
 * @return        a mix of the two given colors
 */
Color.prototype.mix = function mix(color, w) {
  w = (typeof w === 'number') ? w : 0.5
  var r = Math.round(Util.average(this.red,   color.red,   1-w))
    , g = Math.round(Util.average(this.green, color.green, 1-w))
    , b = Math.round(Util.average(this.blue,  color.blue,  1-w))
  return new Color(r, g, b)
}

/**
 * Returns the *contrast ratio* between two colors.
 * More info can be found at
 * https://www.w3.org/TR/WCAG/#contrast-ratiodef
 * @param `color` required Color object; the second color to check
 * @return        the contrast ratio of this color with the argument
 */
Color.prototype.contrastRatio = function contrastRatio(color) {
  function relLum(c) {
    function coef(p) {
      return (p <= 0.03928) ? p/12.92 : Math.pow((p+0.055)/1.055,2.4)
    }
    return 0.2126*coef(c.red  /255)
         + 0.7152*coef(c.green/255)
         + 0.0722*coef(c.blue /255)
  }
  var lum1 = relLum(this)
    , lum2 = relLum(color)
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)
}

/**
 * Returns a string representation of this color.
 * If `space === 'hsv'`, returns `hsv(h, s, v)`
 * If `space === 'hsl'`, returns `hsl(h, s, l)`
 * If `space === 'hex'`, returns `#rrggbb`
 * If `space === 'rgb'`, or if no param is given, returns `rgb(r, g, b)`
 * @param `space` optional ('rgb'): a string representing the space in which this color exists
 * @return        a string representing this color.
 */
Color.prototype.toString = function toString(space) {
  function toHex(n) {
    n = +n || 0
    // n = Util.bound(n, 0, 255)
    n = Math.max(0, Math.min(n, 255))
    return '0123456789abcdef'.charAt((n - n % 16) / 16) + '0123456789abcdef'.charAt(n % 16)
  }
  if (space === 'hex') return '#' + toHex(this.red) + toHex(this.green) + toHex(this.blue)
  if (space === 'hsv') return 'hsv(' + this.hsv_hue + ', ' + this.hsv_sat + ', ' + this.hsv_val + ')'
  if (space === 'hsl') return 'hsl(' + this.hsl_hue + ', ' + this.hsl_sat + ', ' + this.hsl_lum + ')'
                       return 'rgb(' + this.red     + ', ' + this.green   + ', ' + this.blue    + ')'
}




/**
  * Returns a new Color object, given a string of the form `rgb(r,g,b)` or `rgb(r, g, b)`,
  * where `r`, `g`, and `b` are decimal RGB components (in base 10, out of 255).
  * @param `rgb_string` a string of the form `rgb(r,g,b)` or `rgb(r, g, b)`
  */
Color.newColorRGBString = function newColorRGBString(rgb_string) {
  var splitted = rgb_string.slice(4, -1).split(',')
  return new Color(+splitted[0], +splitted[1], +splitted[2])
}

/**
 * Returns a new Color object, given a string of the form `#rrggbb`,
 * where `rr`, `gg`, and `bb` are hexadecimal RGB components (in base 16, out of ff, lowercase).
 * The `#` must be included.
 * @param `hex_string` a string of the form `#rrggbb` (lowercase)
 */
Color.newColorHexString = function newColorHexString(hex_string) {
  var r_hex = hex_string.slice(1,3)
    , g_hex = hex_string.slice(3,5)
    , b_hex = hex_string.slice(5,7)
  function toDec(x) {
    var tens = 0
      , ones = 0
    for (var i = 0; i < 16; i++) {
      if ('0123456789abcdef'.charAt(i) === x.slice(0,1)) tens = i*16
      if ('0123456789abcdef'.charAt(i) === x.slice(1,2)) ones = i
    }
    return tens + ones
  }
  return new Color(toDec(r_hex), toDec(g_hex), toDec(b_hex))
}

/**
 * Returns a new Color object, given hue, saturation, and value in HSV-space.
 *
 * Takes HSV-components as number arguments and returns a new Color object with
 * RGB-components, each a base-10 number from 0 to 255.
 *
 * Photoshop, etc. represents the saturation and "brightness" (value) values from 0 to 100,
 * however, the saturation and value are calculated from a range of 0 to 1. Make that conversion
 * before calling this method.
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 *
 * @param `hue` must be between 0 and 360; hue in HSV-space
 * @param `sat` must be between 0.0 and 1.0; saturation in HSV-space
 * @param `val` must be between 0.0 and 1.0; brightness in HSV-space
 * @return      a new Color object with hsv(`h`, `s`, `v`)
 */
Color.newColorHSV = function newColorHSV(hue, sat, val) {
  var red, grn, blu
  if (sat === 0) {
    // achromatic (gray)
    red = grn = blu = val
  } else {
    ;(function () {
      var h = hue / 60 // sector 0 to 5
        , i = Math.floor(h)
        , f = h - i // factorial part of h
        , p = val * (1 - sat)
        , q = val * (1 - sat * f)
        , t = val * (1 - sat * (1 - f))
      var cases = {
        0 : function () { red = val; grn = t;   blu = p;   }
      , 1 : function () { red = q;   grn = val; blu = p;   }
      , 2 : function () { red = p;   grn = val; blu = t;   }
      , 3 : function () { red = p;   grn = q;   blu = val; }
      , 4 : function () { red = t;   grn = p;   blu = val; }
      , 5 : function () { red = val; grn = p;   blu = q;   }
      }
      cases[i]()
    })()
  }

  red = Math.round(red * 255)
  grn = Math.round(grn * 255)
  blu = Math.round(blu * 255)

  var returned = new Color(red, grn, blu)
  returned.hsv_hue = hue
  returned.hsv_sat = sat
  returned.hsv_val = val
  return returned
}

/**
 * Returns a new Color object, given hue, saturation, and luminosity.
 * @param `hue` must be between 0 and 360; same as the `hue` in HSV-space
 * @param `sat` must be between 0.0 and 1.0; saturation in HSL-space
 * @param `lum` must be between 0.0 and 1.0; luminosity in HSL-space
 * @return      a new Color object with hsl(`hue`, `sat`, `lum`)
 */
Color.newColorHSL = function newColorHSL(hue, sat, lum) {
  return new Color() // FIXME
}

/**
 * Checks the type of an argument, and converts it to a color.
 */
Color.typeCheck = function typeCheck(param) {
  if (param.red || param.green || param.blue) return param
  if (typeof param === 'string') {
    if (param.slice(0,1) === '#')    return Color.newColorHexString(param)
    if (param.slice(0,4) === 'rgb(') return Color.newColorRGBString(param)
    return new Color()
  }
  if (typeof param === 'number') {
    var graytone = Util.bound(param, 0, 255)
    return new Color(+graytone, +graytone, +graytone)
  }
  return new Color()
}

/**
 * Mixes (averages) two colors, with a given weight favoring the first color.
 * If `w == 1.0`, this method will return `color1`. `w == 0.0`, will return `color2`.
 * `w == 0.5` (default if omitted) will result in a perfectly even mix.
 * CHANGED this function is deprecated. Use `Color.prototype.mix()` instead.
 * @param `color1` required Color object; the first color
 * @param `color2` required Color object; the second color
 * @param `w`      optional number between 0.0 and 1.0, defaults to 0.5; the weight favoring the first color
 * @return         a mix of the two given colors
 */
Color.mix = function mix(color1, color2, w) {
  return color1.mix(color2, 1-w)
}
