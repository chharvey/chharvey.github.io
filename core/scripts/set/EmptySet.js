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

EmptySet.prototype.toString = function () {
  // return '{}';
  return '0';
}


EmptySet.prototype.isEmpty = function () {
  return true;
}
EmptySet.prototype.ownsEmpty = function () {
  return false;
}

EmptySet.prototype.isSingleton = function () {
  return false;
}
EmptySet.prototype.isSingletonOf = function (x) {
  return false;
}

EmptySet.prototype.isPair = function () {
  return false;
}
EmptySet.prototype.isPairOf = function (x, y) {
  return false;
}

EmptySet.prototype.isPowerSetOf = function (x) {
  return false;
}

EmptySet.prototype.isSuccessorOf = function (x) {
  return false;
}

EmptySet.prototype.isInductive = function () {
  return false;
}
