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
  * Example: `Length.convert(9, 'cm', 'in')` returns 3.54.
  * @param x        a number to convert
  * @param fromunit string: the unit to convert from
  * @param tounit   string: the unit to convert to
  * @return         the number of ‹tounit›s that x ‹fromunit›s converts to
  */
Length.convert = function (x, fromunit, tounit) {
  return x * Length.conversion[fromunit][tounit];
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
