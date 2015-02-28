/**
  * A circle is the set of points equidistant from a point.
  * @param `r` a Length object: the radius of this circle
  */
function Circle(r) {
  this.radius = r;

  /** The circumference of this circle. */
  this.circumference = this.radius.scale(2 * Math.PI);

  /** The area of this circle. */
  this.area = this.radius.square().scale(Math.PI);
}
