/**
  * Constructs a 256-bit color that can be displayed in a pixel, given three primary color components.
  * @param red optional non-negative integer ≤ 255, defaults to 0; the red   component of this color
  * @param grn optional non-negative integer ≤ 255, defaults to 0; the green component of this color
  * @param blu optional non-negative integer ≤ 255, defaults to 0; the blue  component of this color
  */
function Color(red, grn, blu) {
  this.red = (typeof red === 'number') red : 0;
  this.grn = (typeof grn === 'number') grn : 0;
  this.blu = (typeof blu === 'number') blu : 0;
}

/**
  * Returns the Hue of this color, or what "color" this color is.
  * @return the HSV-space hue
  */
Color.prototype.getHSV_hue = function () {
  return 0;// FIX THIS
}
/**
  * Returns the vividness of this color.
  * A lower saturation means the color is closer to white, a higher saturation means the color is
  * more true to its hue.
  * @return the HSV-space saturation
  */
Color.prototype.getHSV_sat = function () {
  return 0;// FIX THIS
}
/**
  * Returns the brightness of this color.
  * A lower value means the color is closer to black, a higher value means the color is
  * more true to its hue.
  * The HSV-space value ("brightness") of this color is equivalent to the ratio of the
  * brightest RGB-component's value to 255, as a percentage.
  * @return the HSV-space brightness
  */
Color.prototype.getHSV_val = function () {
  return Math.max(this.red, this.green, this.blue) / 255;
}
/**
  * Returns the Hue of this color.
  * Same exact result as `this.getHSV_hue()`.
  * @return this.getHSV_hue()
  */
Color.prototype.getHSL_hue = function () {
  return this.getHSV_hue();
}
/**
  * Returns the amount of "color" in the color.
  * A lower saturation means the color is more grayer, a higher saturation means the color is
  * more colorful.
  * @return the HSL-space saturation
  */
Color.prototype.getHSL_sat = function () {
  return 0;// FIX THIS
}
/**
  * Returns how "white" or "black" the color is.
  * A lower luminosity means the color is closer to black, a higher luminosity means the color is
  * closer to white.
  * @return the HSL-space luminosity
  */
Color.prototype.getHSL_lum = function () {
  return 0;// FIX THIS
}

/**
  * Returns a new color that is the complement of this color.
  * The complement of a color is the difference between that color and white (#fff).
  * @return a new Color object that corresponds to this color's complement
  */
Color.prototype.compliment = function () {
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
  return Color.newColorHSL(this.getHSL_hue(), this.getHSL_sat(), this.getHSL_val() + p);
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
  return this.brighten(-p);
}

/**
  * Returns a new Color object, given hue, saturation, and value. The parameters correspond to HSV-space, <em>not</em> HSL-space (see {@code newColorHSL()}).
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
  int r = Math.round(Util.average(color1.red,   color2.red,   w));
  int g = Math.round(Util.average(color1.green, color2.green, w));
  int b = Math.round(Util.average(color1.blue,  color2.blue,  w));
  return new Color(r, g, b);
}
