/**
  * A quadrilateral is a four-sided polygon.
  * @param a a Length object: one of the four sides of this quadrilateral
  * @param b a Length object: one of the four sides of this quadrilateral
  * @param c a Length object: one of the four sides of this quadrilateral
  * @param d a Length object: one of the four sides of this quadrilateral
  */
function Quadrilateral(a, b, c, d) {
  Polygon.call(this, 4);
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;

  /** The perimeter of this quadrilateral. */
  this.perimeter = this.a.add(this.b).add(this.c).add(this.d);
}
