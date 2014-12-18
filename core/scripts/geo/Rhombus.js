/**
  * A rhombus is a quadrilateral with four congruent sides.
  * Theorem: a rhombus is a parallelogram.
  * @param a   a Length object: the base of this rhombus
  * @param ang an Angle object: in degrees, between the base and the left side
  */
function Rhombus(a, ang) {
  Parallelogram.call(this, a, a, ang);
}
Util.extend(Rhombus, Parallelogram);
