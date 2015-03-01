var Area = require('./Area.js');

/**
  * A wrapper class representing a one-dimensional measurement.
  * @param `x` this object represented as a non-negative number
  * @param `u` optional: a string representing the units of measurement
  */
function Length(x, u) {
  this.value = +x || 0;
  this.units = '' + (u || '');
}

/**
  * Returns a string representation of this object.
  */
Length.prototype.toString = function toString() {
  return '' + this.value + this.units;
}

/**
  * Adds another Length object to this Length object.
  * @param `length` the Length object to add to this object
  * @return         a Length equal to the sum of both Lengths
  */
Length.prototype.add = function add(length) {
  if (this.units === length.units) return new Length(this.value + length.value, this.units);
  else                             return '' + this + ' + ' + length;
}

/**
  * Returns a scale factor of this Length object.
  * If the scale factor is <1, returns a new Length "shorter" than this Length.
  * If the scale factor is >1, returns a new Length "longer" than  this Length.
  * If the scale factor is =1, returns a new Length equivalent to  this Length.
  * @param `k` a non-negative number: the scale factor
  * @return    the product of this Length and the scale factor
  */
Length.prototype.scale = function scale(k) {
  return new Length(this.value * k, this.units);
}

/**
  * Multiplies another Length object by this Length object, returning Area.
  * If needing to multiply this Length by another Area, use the `Area.prototype.multiply(length)`
  * method on that Area object, using this object as the argument.
  * @param `length` the Length object to multiply by this object
  * @return         an Area equal to the product of both Lengths
  */
Length.prototype.multiply = function multiply(length) {
  if (this.units === length.units) return new Area(this.value * length.value, this.units);
  else                             return '' + this + ' × ' + length;
}

/**
  * Returns the product of this Length with itself.
  * Equivalent to `this.multiply(this)`
  * @return an Area equal to the square of this Length
  */
Length.prototype.square = function square() {
  return this.multiply(this);
}

/**
  * Returns the product of the square of this Length, an Area, with itself.
  * Equivalent to `this.square().multiply(this)`
  * @return an Area equal to the cube of this Length
  */
Length.prototype.cube = function cube() {
  return this.square().multiply(this);
}

/**
  * Converts this length to the same length in a different unit.
  * Example:
      var x = new Length(9,'cm');
      x.convert('in'); // returns new Length(3.54,'in')
  * @param `tounit` string: the unit to convert to
  * @return         (nondestructive) a new Length object equivalent to this object
  *                 but measured in a different unit
  */
Length.prototype.convert = function convert(tounit) {
  var val = Length.convert(this.value, this.units, tounit);
  return new Length(val, tounit);
}

/**
  * A conversion table.
  * Use `Length.conversion['‹x›']['‹y›']` to obtain the number by which you need to multiply
  * ‹x› to convert to ‹y›.
  * For example `Length.conversion['cm']['in'] = 0.3937`, so 9cm * 0.3937 = 3.54in.
  */
Length.conversion = {
  mm : { mm:       1,    cm: (1/10),     m: (1/1000),  km: (1/1000000),  in: (1/25.4),  ft: (1/304.8), mi: 6.214e-7, },
  cm : { mm:      10,    cm:      1,     m: (1/100),   km: (1/100000),   in: (1/2.54),  ft: (1/30.48), mi: 6.214e-6, },
  m  : { mm:    1000,    cm:     10,     m: 1,         km: (1/1000),     in:    39.37,  ft: 3.281,     mi: 6.214e-4, },
  km : { mm: 1000000,    cm: 100000,     m: 1000,      km: 1,            in: 39370,     ft: 3281,      mi: 0.6214, },
  in : { mm:      25.4,  cm:      2.54,  m: (1/39.37), km: (1/39370),    in:     1,     ft: (1/12),    mi: (1/63360), },
  ft : { mm:     304.8,  cm: 30.48,      m: (1/3.281), km: (1/3281),     in:    12,     ft: 1,         mi: (1/5280), },
  mi : { mm: 1.60934e6,  cm: 1.60934e5,  m: 1609.34,   km: 1.609,        in: 63360,     ft: 5280,      mi: 1, },
};

/**
  * Converts from one unit to another.
  * Example:
      Length.convert(9, 'cm', 'in'); // returns 3.54
  * @param `x`        a number to convert
  * @param `fromunit` string: the unit to convert from
  * @param `tounit`   string: the unit to convert to
  * @return           the number of ‹tounit›s that x ‹fromunit›s converts to
  */
Length.convert = function convert(x, fromunit, tounit) {
  return x * Length.conversion[fromunit][tounit];
}

module.exports = Length;
