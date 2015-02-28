/**
  * There exists a set that contains no elements; furthermore, this set is unique.
  * We symbolize this set by '{}' or the symbol '0'.
  */
function EmptySet() {
  Set.call(this);
}
Util.extend(EmptySet, Set);

EmptySet.prototype.owns = function owns(x) {
  return false; // All EmptySet objects are empty by definition.
}

EmptySet.prototype.includes = function includes(x) {
  return x.isEmpty(); // The only possible subset of the empty set is itself.
}

EmptySet.prototype.equals = function equals(x) {
  return x.isEmpty(); // a convenience statement: all empty sets are equal
}

EmptySet.prototype.toString = function toString() {
  // return '{}';
  return '0';
}


EmptySet.prototype.isEmpty = function isEmpty() {
  return true;
}
EmptySet.prototype.ownsEmpty = function ownsEmpty() {
  return false;
}

EmptySet.prototype.isSingleton = function isSingleton() {
  return false;
}
EmptySet.prototype.isSingletonOf = function isSingletonOf(x) {
  return false;
}

EmptySet.prototype.isPair = function isPair() {
  return false;
}
EmptySet.prototype.isPairOf = function isPairOf(x, y) {
  return false;
}

EmptySet.prototype.isPowerSetOf = function isPowerSetOf(x) {
  return false;
}

EmptySet.prototype.isSuccessorOf = function isSuccessorOf(x) {
  return false;
}

EmptySet.prototype.isInductive = function isInductive() {
  return false;
}
