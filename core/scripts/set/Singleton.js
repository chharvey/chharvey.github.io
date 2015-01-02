/**
  * A singleton is a set that owns exactly one element.
  * This class is not to be confused with a "singleton" class in Java,
  * which is a class that can only be instantiated once.
  * For every set x, there exists a set that contains exactly x.
  * `new Singleton(x)` is defined as new Pair(x,x).
  * @extends   Pair
  * @param `a` the element in this set
  */
function Singleton(a, b) {
  Pair.call(this, a, a);
  this.element = a || new EmptySet();
}
Util.extend(Singleton, Pair);

Singleton.prototype.owns = function (x) {
  return this.element.equals(x);
}

Singleton.prototype.includes = function (x) {
  return x.isEmpty() || x.equals(this);
}

Singleton.prototype.toString = function () {
  return '{ ' + this.element + ' }';
}


Singleton.prototype.isEmpty = function () {
  return false;
}

Singleton.prototype.ownsEmpty = function () {
  // overrides Set.prototype.ownsEmpty() {return this.owns(new EmptySet());}
  return this.element.isEmpty();
}

Singleton.prototype.isSingleton = function () {
  return true;
}
Singleton.prototype.isSingletonOf = function (x) {
  return this.owns(x);
}

Pair.prototype.isPairOf = function (x, y) {
  return this.owns(x) && x.equals(y);
}

Singleton.prototype.isPowerSetOf = function (x) {
  return this.ownsEmpty() && x.isEmpty();
}

Singleton.prototype.isInductive = function () {
  return false;
}
