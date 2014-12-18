/**
  * A circle is the set of points equidistant from a point. That distance is called the radius
  * @param r a Length: the radius of this circle
  * @param u optional: a string representing the units of measurement
  */
function Circle(r) {
  this.radius = r;
  this.circumference = this.radius.scale(2 * Math.PI);
  this.area = this.radius.square().scale(Math.PI);
}
