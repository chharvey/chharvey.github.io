/**
  * An OrderedTriple is a set that encodes the order of its three coordinates.
  * An ordered triple is written (a, b, c), where a, b, and c are the coordinates.
  *
  * `new OrderedTriple(a,b,c)` is defined as `new OrderedPair(new OrderedPair(a,b), c)`
  * @extends   OrderedPair
  * @param `a` the first coordinate (abscissa)
  * @param `b` the second coordinate (ordinate)
  * @param `c` the third coordinate (applicate)
  */
function OrderedTriple(a, b) {
  this.abscissa  = a || new EmptySet();
  this.ordinate  = b || new Singleton(this.abscissa);
  this.applicate = c || new Singleton(this.ordinate);
  OrderedPair.call(this, new OrderedPair(this.abcissa, this.ordinate), this.applicate);
}
Util.extend(OrderedTriple, OrderedPair);

OrderedTriple.prototype.equals = function equals(x) {
  return this.abscissa.equals(x.abscissa) && this.ordinate.equals(x.ordinate) && this.applicate.equals(x.applicate);
  // fix this, it's wrong. there may be a set that is an ordered triple that is not an instance of
  // the OrderedTriple class
}

OrderedTriple.prototype.toString = function toString() {
  return '( ' + this.abscissa + ',  ' + this.ordinate + ',  ' + this.applicate + ' )';
}
