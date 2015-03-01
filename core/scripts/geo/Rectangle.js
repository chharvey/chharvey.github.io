var Util = require('../Util.js');
var Parallelogram = require('./Parallelogram.js');

/**
  * A rectangle is a quadrilateral with four congruent angles.
  * Theorem: a rectangle is a parallelogram.
  * Theorem: a rectangle has four right angles.
  * @extends   Parallelogram
  * @param `a` a Length object: the base of this rectangle
  * @param `b` a Length object: the height of this rectangle
  */
function Rectangle(a, b) {
  Parallelogram.call(this, a, b, 90);

  /** The height of this rectangle. */
  this.height = b;
}
Util.extend(Rectangle, Parallelogram);

module.exports = Rectangle;
