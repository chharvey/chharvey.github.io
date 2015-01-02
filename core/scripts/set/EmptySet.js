/**
  * There exists a set that contains no elements; furthermore, this set is unique.
  * We symbolize this set by '{}' or the symbol '0'.
  */
function EmptySet() {
  Set.call(this);
}
Util.extend(EmptySet, Set);

EmptySet.prototype.owns = function (x) {
  return false; // All EmptySet objects are empty by definition.
}

EmptySet.prototype.includes = function (x) {
  return x.isEmpty(); // The only possible subset of the empty set is itself.
}

EmptySet.prototype.equals = function (x) {
  return x.isEmpty(); // a convenience statement: all empty sets are equal
}

/**
  * Returns the set-theoretic representation of this object as a string.
  */
EmptySet.prototype.toString = function () {
  // return '{}';
  return '0';
}


EmptySet.prototype.isEmpty = function () {
  return true; // All EmptySet objects are empty.
}
EmptySet.prototype.ownsEmpty = function () {
  return false;
}

EmptySet.prototype.isSingleton = function () {
  return false; // All EmptySet objects are empty.
}
EmptySet.prototype.isSingletonOf = function (x) {
  return false; // All EmptySet objects are empty.
}

EmptySet.prototype.isPair = function () {
  return false; // All EmptySet objects are empty.
}
EmptySet.prototype.isPairOf = function (x, y) {
  return false; // All EmptySet objects are empty.
}

EmptySet.prototype.isPowerSetOf = function (x) {
  return false; // All EmptySet objects are empty.
}

EmptySet.prototype.isSuccessorOf = function (x) {
  return false; // All EmptySet objects are empty.
}

EmptySet.prototype.isInductive = function () {
  return false; // All EmptySet objects are empty.
}

EmptySet.prototype.isCardinal = function () {}
EmptySet.prototype.isOrdinal = function () {}

EmptySet.prototype.cardinality = function () {}
EmptySet.prototype.ordinality = function () {}

EmptySet.prototype.isEquinumerousTo = function (x) {
  return x.isEmpty();
}
EmptySet.prototype.isOrderIsomorphicWith = function (x) {
  return x.isEmpty();
}
