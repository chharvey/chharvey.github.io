/**
  * A rectangular prism is a polyhedron that has 6 faces, each of which is a
  * rectangle and that intersect at right angles.
  * @param l a Length object: the length of this prism
  * @param w a Length object: the width of this prism
  * @param h a Length object: the height of this prism
  */
function RectPrism(l, w, h) {
  this.length = l;
  this.width  = w;
  this.height = h;


  /** The base face of this prism. */
  this.base  = new Rectangle(this.length, this.width);
  /** The front face of this prism. */
  this.front = new Rectangle(this.length, this.height);
  /** The side face of this prism. */
  this.side  = new Rectangle(this.width, this.height);



  /** The surface area of this cylinder. */
  this.surface_area = this.base.area.add(this.front.area).add(this.side.area).scale(2);

  /** The volume of this cylinder. */
  this.volume = this.base.area.multiply(this.height);
}
