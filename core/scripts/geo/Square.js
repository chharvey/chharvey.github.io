/**
  * Theorem: A square is a rectangle with four congruent sides.
  * Theorem A square is a rhombus with four right angles.
  * This class uses the first definition: thus class Square extends class Rectangle
  * @extends Rectangle
  * @param a a Length object: the side of this square
  */
function Square(a, ang) {
  Rectangle.call(this, a, a);
}
Util.extend(Square, Rectangle);
