/**
  * A wrapper class representing a one-dimensional measurement.
  * @param x this Length object represented as a number
  * @param u optional: a string representing the units of measurement
  */
function Length(x, u) {
  this.value = +x || 0;
  this.units = '' + (u || '');
}

/**
  * Returns a string representation of this object.
  */
Length.prototype.toString = function () {
  return '' + this.value + this.units;
}

/**
  * Adds another Length object to this Length object.
  * @param length the Length object to add to this object
  * @return       a length equal to the sum of both lengths
  */
Length.prototype.add = function (length) {
  if (this.units === length.units) return new Length(this.value + length.value, this.units);
  else                             return '' + this + ' + ' + length;
}
/**
  * Returns a scale factor of this Length object.
  * If the scale factor is <1, returns a new Length "shorter" than this Length.
  * If the scale factor is >1, returns a new Length "longer" than this Length.
  * If the scale factor is 1, returns a new Length equivalent to this Length.
  * @param k the scale factor
  * @return the product of the length and the scale factor
  */
Length.prototype.scale = function (k) {
  return new Length(this.value * k, this.units);
}

/**
  * Multiplies another Length object by this Length object, returning Area.
  * @param length the Length object to multiply to this object
  * @return       an Area equal to the product of both lengths
  */
Length.prototype.multiply = function (length) {
  if (this.units === length.units) return new Area(this.value * length.value, this.units + '²'); // U+00B2
  else                             return '' + this + ' × ' + length;
}

/**
  * Adds two lengths and returns a length. The paramaters may be numbers or Length objects.
  * If both params are numbers, returns a length equivalent to the sum of those numbers.
  * If both params are Length objects with the same unit, returns a length equivalent to the sum
  * of those Length's values, with the correct unit.
  * If one is a number and one is a Length, returns a string concatenating both params.
  * @param a the first length
  * @param b the second length
  * @return  a length equal to the sum of both lengths
  */
Length.add = function (length1, length2) {
  var a, b, u, v;

  if      (length1 instanceof Length)   {a = length1.value; u = length1.units;}
  else if (typeof length1 === 'number') {a = length1;       u = '';}

  if      (length2 instanceof Length)   {b = length2.value; v = length2.units;}
  else if (typeof length2 === 'number') {b = length2;       v = '';}

  if (u === v) return new Length(a + b, u);
  else         return '' + length1 + ' + ' + length2;
}
