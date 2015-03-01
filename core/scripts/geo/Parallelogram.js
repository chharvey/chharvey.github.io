var Util = require('../Util.js');
var Quadrilateral = require('./Quadrilateral.js');

/**
  * A parallelogram is a quadrilateral whose opposite sides are parallel.
  * Theorem: the opposite sides of a parallelogram are congruent.
  * Theorem: the opposite angles of a parallelogram are congruent.
  * @extends     Quadrilateral
  * @param `a`   a Length object: the base of this parallelogram
  * @param `b`   a Length object: the left side of this parallelogram
  * @param `ang` an Angle object: in degrees, between the base and the left side
  */
function Parallelogram(a, b, ang) {
  Quadrilateral.call(this, a, b, a, b);
  this.base = a;
  this.side = b;


  /** The lower-left and upper-right angle (in degrees) of this parallelogram. */
  this.angle1 = ang;
  /** The upper-left and lower-right angle (in degrees) of this parallelogram. */
  this.angle2 = 180 - this.angle1;

  /** The height of this parallelogram. */
  this.height = this.side.scale(Math.sin(this.angle1 * (Math.PI/180)));
  /** The area of this parallelogram. */
  this.area = this.base.multiply(this.height);
}
Util.extend(Parallelogram, Quadrilateral);

module.exports = Parallelogram;
