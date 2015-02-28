/**
  * A singleton is a set that owns exactly one element.
  * This class is not to be confused with a "singleton" class in Java,
  * which is a class that can only be instantiated once.
  * For every set x, there exists a set that contains exactly x.
  * `new Singleton(x)` is defined as `new Pair(x,x)`.
  * @extends   Pair
  * @param `a` the element in this set
  */
function Singleton(a) {
  this.element = a || new EmptySet();
  Pair.call(this, this.element, this.element);
}
Util.extend(Singleton, Pair);

Singleton.prototype.owns = function owns(x) {
  return this.element.equals(x);
}

Singleton.prototype.includes = function includes(x) {
  return x.isEmpty() || x.isSingletonOf(this.element);
}

Singleton.prototype.toString = function toString() {
  return '{ ' + this.element + ' }';
}


Singleton.prototype.ownsEmpty = function ownsEmpty() {
  // overrides Set.prototype.ownsEmpty() {return this.owns(new EmptySet());}
  return this.element.isEmpty();
}

Singleton.prototype.isSingleton = function isSingleton() {
  return true;
}
Singleton.prototype.isSingletonOf = function isSingletonOf(x) {
  return this.owns(x);
}

Singleton.prototype.isPairOf = function isPairOf(x, y) {
  return this.owns(x) && x.equals(y);
}

Singleton.prototype.isPowerSetOf = function isPowerSetOf(x) {
  return this.ownsEmpty() && x.isEmpty();
}

Singleton.prototype.isInductive = function isInductive() {
  return false;
}
