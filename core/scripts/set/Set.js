/**
  * A set is that which may contain elements; these elements, in turn, are also sets.
  * A set is *immutable*, so it cannot be changed once instantiated.
  * The constructor for `Set` should be private: one cannot construct a set without an axiom.
  * Instead, construct an `EmptySet`, or another set using previously-made sets.
  */
function Set() {}

/**
  * Determines whether this set "owns" a particular element.
  * Mathematical ownership indicates that the element is a member of this set.
  * @param `x` the element in question
  * @return    `true` if `elem` is a member of this set
  */
Set.prototype.owns = function (x) {
  return false;
}
/**
  * Determines whether this set is a member of a particular set.
  * An inverse method for the `this.owns()` method.
  * @param `set` the Set in question
  * @return      `true` if `set` owns this set
  */
// Set.prototype.isElementOf = function (set) {
//   return set.owns(this);
// }

/**
  * Returns whether this Set has the specified Set as a subset.
  * The set x is a subset of a set y exactly when all the elements of x are in y.
  *
  * Although there is a `Subset` class, some `Set` objects may have the property of being a subset
  * of this one without being an instance of the `Subset` class.
  *
  * @param `x` the set in question
  * @return    `true` if this set owns at least all the elements in `set`
  */
Set.prototype.includes = function (x) {
  return x.isEmpty(); // every set includes the empty set
}
/**
  * Determines whether this is a subset of a particular set.
  * An inverse method for the `this.isSupersetOf()` method.
  * @param `set` the Set in question
  * @return      `true` if `set` includes this set
  */
// Set.prototype.isSubsetOf = function(set) {
//   return set.isSupersetOf(this);
// }

/**
  * Returns whether the specified Set has the same elements as this Set.
  * Two sets are equal (have the same elements) exactly when they include each other.
  * @param `x` the specified set
  * @return    `true` if `x` and this set are both empty, or this and `x` include each other
  */
Set.prototype.equals = function (x) {
  boolean sameObject = (this === set); // a convenience statement: equal Objects are equal sets (but not vice versa)
  boolean bothEmpty = this.isEmpty() && set.isEmpty(); // a convenience statement: all empty sets are equal
  boolean includeEachOther = this.includes(set) && set.includes(this); // definition of set equality
  return sameObject || bothEmpty || includeEachOther;
}

/**
  * Returns whether this Set has no elements.
  *
  * Although there is an `EmptySet` class, some `Set` objects may have the property of
  * being empty without being an instance of the `EmptySet` class.
  *
  * @return `true` if this set has no elements
  */
Set.prototype.isEmpty = function () {}
/**
  * Returns whether this set contains the Empty Set.
  * @return `true` if the empty set is an element of this set
  */
Set.prototype.ownsEmpty = function () {
  return this.owns(new EmptySet());
}

/**
  * Returns whether this Set contains one unique element.
  * A set y contains one unique element x exactly when:
  * x is an element of y, and for all sets a and b that are elements of y, a.equals(b).
  *
  * Although there is a `Singleton` class, some Set objects may have the property of
  * being a singleton without being an instance of the `Singleton` class.
  *
  * @return `true` if this set contains exactly one element
  */
Set.prototype.isSingleton = function () {}
/**
  * Returns whether this Set contains one unique element specified as a parameter.
  * @param `x` the Set of which this set may or may not contain
  * @return    `true` if this set contains `x` and no other elements
  */
Set.prototype.isSingletonOf = function (x) {
  return this.isSingleton() && this.contains(x);
}

/**
  * Returns whether this set contains exactly two elements (which may be equal).
  * A set x is a pair if and only if there exists a set a in x, and a set b in x, and
  * for all sets y in x, y=a or y=b.
  *
  * Although there is a `Pair` class, some Set objects may have the property of being a pair
  * without being an instance of the `Pair` class.
  *
  * If both elements of this set are equal, then `this.isSingleton() === true`, which implies
  * `this.isPair() === true` (but the converse is not necessarily the case).
  *
  * @return `true` if this set contains exactly two elements (which may be equal)
  */
Set.prototype.isPair = function () {}
/**
  * Returns whether this Set contains two elements specified as parameters.
  * @param `x` a Set of which this set may or may not contain
  * @param `y` a Set of which this set may or may not contain
  * @return    `true` if this contains `x` and `y` and no other elements
  */
Set.prototype.isPairOf = function (x, y) {
  return this.isPair() && this.contains(x) && this.contains(y);
}

/**
  * Returns whether this set is a powerset of the specified parameter.
  * For a set x, the power set of x is the set that only contains all subsets of x.
  * <p>Although there is a {@see PowerSet} class,
  * some Set objects may have the <em>property</em> of being a power set without
  * being an instance of the PowerSet class.</p>
  * @param x the set of which this set may be a power set
  * @return true if this set is a power set of x
  */
public abstract boolean isPowerSetOf(Set x);
