/**
  * Constructs a 256-bit color that can be displayed in a pixel, given three primary color components.
  * @param r optional non-negative integer ≤ 255, defaults to 0; the red   component of this color
  * @param g optional non-negative integer ≤ 255, defaults to 0; the green component of this color
  * @param b optional non-negative integer ≤ 255, defaults to 0; the blue  component of this color
  */
function Color(r, g, b) {
  var self = this;

  self.red   = (typeof r === 'number') ? r : 0;
  self.green = (typeof g === 'number') ? g : 0;
  self.blue  = (typeof b === 'number') ? b : 0;

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
    return self.hsv_hue; // FIX THIS
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
  return Color.newColorHSV(newhue, this.getHSV_sat(), this.getHSV_val());
}

/**
  * Makes a new color that is a brighter version of this color by a percentage.
  * 1.0 corresponds to making it completely white (#fff), and 0% keeps this color the same.
  * A negative parameter will darken this color (see `this.darken(p)`).
  * @param p must be between -1.0 and 1.0; the percentage by which to lighten this color
  * @return  a new Color object that corresponds to this color brightened by a percentage `p`
  */
Color.prototype.brighten = function (p) {
  // return Color.newColorHSL(this.getHSL_hue(), this.getHSL_sat(), this.getHSL_val() + p);
}
/**
  * Makes a new color that is a darker version of this color by a percentage.
  * 1.0 corresponds to making it completely black (#000), abd 0% keeps this color the same.
  * A negative parameter will lighten this color (see `this.brighten(p)`).
  * @param p must be between -1.0 and 1.0; the percentage by which to darken this color
  * @return  a new Color object that corresponds to this color darkened by a percentage `p`
  */
Color.prototype.darken = function (p) {
  // return Color.newColorHSL(this.getHSL_hue(), this.getHSL_sat(), this.getHSL_val() - p);
  // return this.brighten(-p);
}

/**
  * Returns a new Color object, given hue, saturation, and value.
  * @param hue must be between 0 and 360; hue in HSV-space
  * @param sat must be between 0.0 and 1.0; saturation in HSV-space
  * @param val must be between 0.0 and 1.0; brightness in HSV-space
  * @return    a new Color object with hsv(`hue`, `sat`, `val`)
  */
Color.newColorHSV = function (hue, sat, val) {
  return new Color();// FIX THIS
}
/**
  * Returns a new Color object, given hue, saturation, and luminosity.
  * @param hue must be between 0 and 360; same as the `hue` in HSV-space
  * @param sat must be between 0.0 and 1.0; saturation in HSL-space
  * @param lum must be between 0.0 and 1.0; luminosity in HSL-space
  * @return    a new Color object with hsl(`hue`, `sat`, `lum`)
  */
Color.newColorHSL = function (hue, sat, lum) {
  return new Color();// FIX THIS
}

/**
  * Mixes (averages) two colors, with a given weight favoring the first color.
  * If `w == 1.0`, this method will return `color1`. `w == 0.0`, will return `color2`.
  * `w == 0.5` (default if omitted) will result in a perfectly even mix.
  * @param color1 required Color object; the first color
  * @param color2 required Color object; the second color
  * @param w      optional number between 0.0 and 1.0, defaults to 0.5; the weight favoring the first color
  * @return       a mix of the two given colors
  */
Color.mix = function (color1, color2, w) {
  w = (typeof w === 'number') ? w : 0.5;
  var r = Math.round(Util.average(color1.red,   color2.red,   w));
  var g = Math.round(Util.average(color1.green, color2.green, w));
  var b = Math.round(Util.average(color1.blue,  color2.blue,  w));
  return new Color(r, g, b);
}

/**
  * Converts an rgb string, of the form `rgb(r, g, b)`, where `r`, `g`, and `b` are the
  * decimal components (in base 10, out of 255), into a hex string, of the form `#RRGGBB`, where
  * `RR`, `GG`, and `BB` are the hexadecimal components (base 16, out of FF). */
Color.rgbToHex = function (rgb_string) {
  var splitted = rgb_string.slice(4, -1).split(',');
  function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return '00';
    n = Util.bound(n, 0, 255);
    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
  }
  return '#' + toHex(splitted[0]) + toHex(splitted[1]) + toHex(splitted[2]);
}

/**
  * HSV to RGB color conversion. Takes h, s, and v as number arguments and returns
  * an array [r, g, b], where each component is a base-10 number from 0 to 255.
  * The inputs are hue, sat, and val in HSV-space.
  *
  * Ported from the excellent java algorithm by Eugene Vishnevsky at:
  * http://www.cs.rit.edu/~ncs/color/t_convert.html
  * @param h a number representing hue from 0 to 360 degrees
  * @param s a number representing saturation from 0 to 100 percent
  * @param v a number representing value from 0 to 100 percent
  */
Color.hsvToRgb = function (h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;
  // Make sure our arguments stay in-range
  h = Util.bound(h, 0, 360);
  s = Util.bound(s, 0, 100);
  v = Util.bound(v, 0, 100);
  /*
   * We accept saturation and value arguments from 0 to 100 because that's how Photoshop
   * represents those values. Internally, however, the saturation and value are calculated from
   * a range of 0 to 1. We make that conversion here.
   */
  s /= 100;
  v /= 100;
  if(s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
  switch(i) {
    case 0:  r = v; g = t; b = p; break;
    case 1:  r = q; g = v; b = p; break;
    case 2:  r = p; g = v; b = t; break;
    case 3:  r = p; g = q; b = v; break;
    case 4:  r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break; // case 5
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
