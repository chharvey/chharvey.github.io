/**
  * Constructs a 256-bit color that can be displayed in a pixel, given three primary color components.
  * @param `red` optional non-negative integer ≤ 255, defaults to 0; the red   component of this color
  * @param `grn` optional non-negative integer ≤ 255, defaults to 0; the green component of this color
  * @param `blu` optional non-negative integer ≤ 255, defaults to 0; the blue  component of this color
  */
function Color(red, grn, blu) {
  var self = this;

  self.red   = +red || 0;
  self.green = +grn || 0;
  self.blue  = +blu || 0;

  /**
    * The HSV-space hue of this color, or what "color" this color is.
    */
  self.hsv_hue = (function () {
    return 0; // FIX THIS
  })();
  /**
    * The vividness of this color. A lower saturation means the color is closer to white,
    * a higher saturation means the color is more true to its hue.
    */
  self.hsv_sat = (function () {
    return 0; // FIX THIS
  })();
  /**
    * The brightness of this color. A lower value means the color is closer to black, a higher
    * value means the color is more true to its hue.
    * The HSV-space value ("brightness") of this color is equivalent to the ratio of the
    * brightest RGB-component's value to 255, as a percentage.
    */
  self.hsv_val = (function () {
    return Math.max(self.red, self.green, self.blue) / 255;
  })();
  /**
    * The Hue of this color. Identical to `this.hsv_hue`.
    */
  self.hsl_hue = (function () {
    return self.hsv_hue;
  })();
  /**
    * The amount of "color" in the color. A lower saturation means the color is more grayer,
    * a higher saturation means the color is more colorful.
    */
  self.hsl_sat = (function () {
    return 0; // FIX THIS
  })();
  /**
    * How "white" or "black" the color is. A lower luminosity means the color is closer to black,
    * a higher luminosity means the color is closer to white.
    */
  self.hsl_lum = (function () {
    return 0; // FIX THIS
  })();
}

/**
  * Returns a new color that is the complement of this color.
  * The complement of a color is the difference between that color and white (#fff).
  * @return a new Color object that corresponds to this color's complement
  */
Color.prototype.complement = function () {
  return new Color(255 - this.red, 255 - this.green, 255 - this.blue);
}

/**
  * Returns a new color that is the inverse of this color.
  * The inverse of a color is that color with a hue rotation of 180 degrees.
  * @return a new Color object that corresponds to this color's inverse
  */
Color.prototype.invert = function () {
  var newhue = (this.getHSV_hue() + 180) % 360;
  return Color.newColorHSV(newhue, this.hsv_sat, this.hsv_val);
}

/**
  * Makes a new color that is a brighter version of this color by a percentage.
  * 1.0 corresponds to making it completely white (#fff), and 0% keeps this color the same.
  * A negative parameter will darken this color (see `this.darken(p)`).
  * @param `p` must be between -1.0 and 1.0; the percentage by which to lighten this color
  * @return    a new Color object that corresponds to this color brightened by a percentage `p`
  */
Color.prototype.brighten = function (p) {
  // return Color.newColorHSL(this.hsl_hue, this.hsl_sat, this.hsl_val + p);
}
/**
  * Makes a new color that is a darker version of this color by a percentage.
  * 1.0 corresponds to making it completely black (#000), abd 0% keeps this color the same.
  * A negative parameter will lighten this color (see `this.brighten(p)`).
  * @param `p` must be between -1.0 and 1.0; the percentage by which to darken this color
  * @return    a new Color object that corresponds to this color darkened by a percentage `p`
  */
Color.prototype.darken = function (p) {
  // return Color.newColorHSL(this.hsl_hue, this.hsl_sat, this.hsl_val - p);
  // return this.brighten(-p);
}

/**
  * Returns a string representation of this color.
  * If `space === 'hsv'`, returns `hsv(h, s, v)`
  * If `space === 'hsl'`, returns `hsl(h, s, l)`
  * If `space === 'hex'`, returns `#RRGGBB`
  * If `space === 'rgb'`, or if no param is given, returns `rgb(r, g, b)`
  * @param `space` optional ('rgb'): a string representing the space in which this color exists
  * @return        a string representing this color.
  */
Color.prototype.toString = function (space) {
  function toHex(n) {
    n = +n || 0;
    n = Util.bound(n, 0, 255);
    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
  }
  if (space === 'hex') return '#' + toHex(this.red) + toHex(this.green) + toHex(this.blue);
  if (space === 'hsv') return 'hsv(' + this.hsv_hue + ', ' + this.hsv_sat + ', ' + this.hsv_val + ')';
  if (space === 'hsl') return 'hsl(' + this.hsl_hue + ', ' + this.hsl_sat + ', ' + this.hsl_lum + ')';
                       return 'rgb(' + this.red     + ', ' + this.green   + ', ' + this.blue    + ')';
}

/**
  * Returns a new Color object, given a string of the form `rgb(r,g,b)` or `rgb(r, g, b)`,
  * where `r`, `g`, and `b` are decimal RGB components (in base 10, out of 255).
  * @param `rgb_string` a string of the form `rgb(r,g,b)` or `rgb(r, g, b)`
  */
Color.newColorRGBstring = function (rgb_string) {
  var splitted = rgb_string.slice(4, -1).split(',');
  return new Color(+splitted[0], +splitted[1], +splitted[2]);
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
Color.newColorHSV = function (hue, sat, val) {
  var red, grn, blu;
  if (sat === 0) {
    // achromatic (grey)
    red = grn = blu = val;
  } else {
    var h = hue / 60; // sector 0 to 5
    var i = Math.floor(h);
    var f = h - i; // factorial part of h
    var p = val * (1 - sat),
        q = val * (1 - sat * f),
        t = val * (1 - sat * (1 - f));
    switch(i) {
      case 0:  red = val; grn = t;   blu = p;   break;
      case 1:  red = q;   grn = val; blu = p;   break;
      case 2:  red = p;   grn = val; blu = t;   break;
      case 3:  red = p;   grn = q;   blu = val; break;
      case 4:  red = t;   grn = p;   blu = val; break;
      default: red = val; grn = p;   blu = q;   break; // case 5
    }
  }
  red = Math.round(red * 255);
  grn = Math.round(grn * 255);
  blu = Math.round(blu * 255);

  var returned = new Color(red, grn, blu);
  returned.hsv_hue = hue;
  returned.hsv_sat = sat;
  returned.hsv_val = val;
  return returned;
}
/**
  * Returns a new Color object, given hue, saturation, and luminosity.
  * @param `hue` must be between 0 and 360; same as the `hue` in HSV-space
  * @param `sat` must be between 0.0 and 1.0; saturation in HSL-space
  * @param `lum` must be between 0.0 and 1.0; luminosity in HSL-space
  * @return      a new Color object with hsl(`hue`, `sat`, `lum`)
  */
Color.newColorHSL = function (hue, sat, lum) {
  return new Color();// FIX THIS
}

/**
  * Mixes (averages) two colors, with a given weight favoring the first color.
  * If `w == 1.0`, this method will return `color1`. `w == 0.0`, will return `color2`.
  * `w == 0.5` (default if omitted) will result in a perfectly even mix.
  * @param `color1` required Color object; the first color
  * @param `color2` required Color object; the second color
  * @param `w`      optional number between 0.0 and 1.0, defaults to 0.5; the weight favoring the first color
  * @return         a mix of the two given colors
  */
Color.mix = function (color1, color2, w) {
  w = (typeof w === 'number') ? w : 0.5;
  var r = Math.round(Util.average(color1.red,   color2.red,   w));
  var g = Math.round(Util.average(color1.green, color2.green, w));
  var b = Math.round(Util.average(color1.blue,  color2.blue,  w));
  return new Color(r, g, b);
}
