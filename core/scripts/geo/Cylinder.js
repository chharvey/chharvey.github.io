/**
  * A cylinder is a prism whose base is a circle.
  * @param `r` a Length object: the radius of this cylinder
  * @param `h` a Length object: the height of this cylinder
  */
function Cylinder(r, h) {
  this.radius = r;
  this.height = h;

  /** The base face of this cylinder. */
  this.base = new Circle(this.radius);

  /** The side face of this cylinder. */
  this.side = new Rectangle(this.base.circumference, this.height);

  /** The surface area of this cylinder. */
  this.surface_area = this.base.area.add(this.base.area).add(this.side.area);

  /** The volume of this cylinder. */
  this.volume = this.base.area.multiply(this.height);
}
