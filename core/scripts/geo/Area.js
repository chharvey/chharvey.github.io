/**
  * A wrapper class representing a two-dimensional measurement.
  * @param `x` this object represented as a non-negative number
  * @param `u` optional: a string representing the units of measurement
  */
function Area(x, u) {
  this.value = +x || 0;
  this.units = '' + (u || '');
}

/**
  * Returns a string representation of this object.
  */
Area.prototype.toString = function toString() {
  return '' + this.value + (this.units ? this.units + '²' : ''); // U+00B2
}

/**
  * Adds another Area object to this Area object.
  * @param `area` the Area object to add to this object
  * @return       an Area equal to the sum of both Areas
  */
Area.prototype.add = function add(area) {
  if (this.units === area.units) return new Area(this.value + area.value, this.units);
  else                           return '' + this + ' + ' + area;
}

/**
  * Returns a scale factor of this Area object.
  * If the scale factor is <1, returns a new Area "smaller" than this Area.
  * If the scale factor is >1, returns a new Area "bigger"  than this Area.
  * If the scale factor is =1, returns a new Area equivalent to  this Area.
  * @param `k` a non-negative number: the scale factor
  * @return    the product of this Area and the scale factor
  */
Area.prototype.scale = function scale(k) {
  return new Area(this.value * k, this.units);
}

/**
  * Multiplies another Length object by this Area object, returning Volume.
  * @param `length` the Length object to multiply by this object
  * @return         a Volume equal to the product of this Area and the given Length
  */
Area.prototype.multiply = function multiply(length) {
  if (this.units === length.units) return new Volume(this.value * length.value, this.units);
  else                             return '' + this + ' × ' + length;
}
