/**
  * A wrapper class representing a three-dimensional measurement.
  * @param x this Length object represented as a non-negative number
  * @param u optional: a string representing the units of measurement
  */
function Volume(x, u) {
  this.value = +x || 0;
  this.units = '' + (u || '');
}

/**
  * Returns a string representation of this object.
  */
Volume.prototype.toString = function () {
  return '' + this.value + this.units + '³'; // U+00B3
}

/**
  * Adds another Volume object to this Volume object.
  * @param volume the Volume object to add to this object
  * @return       a Volume equal to the sum of both Volumes
  */
Volume.prototype.add = function (volume) {
  if (this.units === volume.units) return new Volume(this.value + volume.value, this.units);
  else                             return '' + this + ' + ' + volume;
}

/**
  * Returns a scale factor of this Volume object.
  * If the scale factor is <1, returns a new Area "smaller" than this Volume.
  * If the scale factor is >1, returns a new Area "bigger"  than this Volume.
  * If the scale factor is =1, returns a new Area equivalent to  this Volume.
  * @param k a non-negative number: the scale factor
  * @return  the product of this Volume and the scale factor
  */
Volume.prototype.scale = function (k) {
  return new Volume(this.value * k, this.units);
}

Volume.prototype.multiply = function (length) { return null; }
