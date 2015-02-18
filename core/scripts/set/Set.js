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
  *
  * Ownership has the following relational properties for any Sets `a`, `b`, and `c`:
  * - antireflxive:      `a.owns(a) === false` always
  * - nowhere-symmetric: if `a.owns(b) === true` then `b.owns(a) === false`
  * - "antisymmetric":   if `a.owns(b) === true` and `b.owns(a) === true`, then (vacuously) `a.owns(b) === true`
  * - intransitive:      if `a.owns(b) === true` and `b.owns(c) === true`, then
  *                        it might or might not be the case that `a.owns(c) === true`
  *
  * @param `x` the element in question
  * @return    `true` if `elem` is a member of this set
  */
Set.prototype.owns = function (x) {}

/**
  * Returns whether this Set has the specified Set as a subset.
  * The set x is a subset of a set y exactly when all the elements of x are in y.
  *
  * Although there is a `Subset` class, some `Set` objects may have the property of being a subset
  * of this one without being an instance of the `Subset` class.
  *
  * Inclusion has the following relational properties for any Sets `a`, `b`, and `c`:
  * - reflxive:        `a.includes(a) === true`
  * - "antisymmetric": if `a.includes(b) === true` and `b.includes(a) === true`, then `a.equals(b) === true`
  * - transitive:      if `a.includes(b) === true` and `b.includes(c) === true`, then `a.includes(c) === true`
  *
  * @param `x` the set in question
  * @return    `true` if this set owns at least all the elements in `x`
  */
Set.prototype.includes = function (x) {}

/**
  * Returns whether the specified Set has the same elements as this Set.
  * Two sets are equal (have the same elements) exactly when they include each other.
  *
  * Equality has the following relational properties for any Sets `a`, `b`, and `c`:
  * - reflxive:        `a.equals(a) === true`
  * - symmetric:       if `a.equals(b) === true`, then `b.equals(a) === true`
  * - "antisymmetric": if `a.equals(b) === true` and `b.equals(a) === true`, then `a.equals(b) === true`
  * - transitive:      if `a.equals(b) === true` and `b.equals(c) === true`, then `a.equals(c) === true`
  *
  * @param `x` the specified set
  * @return    `true` if `this` and `x` include each other
  */
Set.prototype.equals = function (x) {
  return (this === x) // convenience statement: equal Objects are equal sets (but not vice versa)
    || (this.isEmpty() && x.isEmpty()) // convenience statement: all empty sets are equal
    || (this.includes(x) && x.includes(this)); // definition of set equality
}

/**
  * Returns the set-theoretic representation of this object as a string.
  */
Set.prototype.toString = function () {}


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
  return this.isSingleton() && this.owns(x);
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
  return this.isPair() && this.owns(x) && this.owns(y);
}

/**
  * Returns whether this set is a power set of the specified parameter.
  * For a set x, the power set of x is the set that only contains all subsets of x.
  *
  * Although there is a `PowerSet` class, some Set objects may have the property of being
  * a power set without being an instance of the `PowerSet` class.
  *
  * @param `x` the set of which this set may be a power set
  * @return    `true` if this set owns only and all subsets of `x`
  */
Set.prototype.isPowerSetOf = function (x) {}

/**
  * Returns whether this Set is the successor of the specified Set.
  * The `Successor` of a set is constructed by taking the `Union` of:
  * - that set, and
  * - the `Singleton` of that set
  * Consequently, a set `y` is the successor of a set `x` if and only if
  * `y` contains `x` (as an element), and `y` includes `x` (as a subset).
  *
  * Although there is a `Successor` class, some Set objects may have the property of being
  * a successor without being an instance of the `Successor` class.
  *
  * @param `x` the Set of which this Set may or may not be the successor
  * @return    `true` if this set is the successor of `x`
  */
Set.prototype.isSuccessorOf = function (x) {
  return (this.contains(x) && this.includes(x));
}

/**
  * Returns whether this set is inductive.
  * A set y is inductive iff:
  * - `y.ownsEmpty()` and
  * - for any Set `t`, if `y.owns(t)` then `y.owns(new SuccessorSet(t))`
  *
  * Although there is a `InductiveSet` class, some Set objects may have the property of being
  * inductive without being an instance of the `InductiveSet` class.
  * @return `true` if this set is inductive
  */
Set.prototype.isInductive = function () {}

/**
  * Returns whether this set is a cardinal number.
  *
  * Although there is a `Cardinal` class, some Set objects may have the property of being
  * a cardinal number without being an instance of the `Cardinal` class.
  * @return `true` if this set is a cardinal number
  */
Set.prototype.isCardinal = function () {}
/**
  * Returns whether this set is an ordinal number.
  *
  * Although there is an `Ordinal` class, some Set objects may have the property of being
  * an ordinal number without being an instance of the `Ordinal` class.
  * @return `true` if this set is an ordinal number
  */
Set.prototype.isOrdinal = function () {}

/**
  * Returns a Cardinal number representing this set's "size" (referring to the number of
  * elements in this set).
  * @return a `Cardinal` object representing the size of this set
  */
Set.prototype.cardinality = function () {}
/**
  * Returns an Ordinal number representing this set's "order type" (referring to the ...).
  * @return an `Ordinal` object representing the order type of this set
  */
Set.prototype.ordinality = function () {}

/**
  * Returns whether this set and the given set are equinumerous, that is, they "have the same
  * number of elements."
  * Mathematical sets are equinumerous if and only if there exists a bijection between them.
  * A consequence of that fact is that their cardinalities, or "set sizes" are equal.
  * @param `x` the set to test equinumerosity with
  * @return    `true` if `x` and this set have equal cardinalities
  */
Set.prototype.isEquinumerousTo = function (x) {
  return this.cardinality().equals(x.cardinality());
}
/**
  * Returns whether this set and the given set are order-isomorphis, that is,
  * there exists a bijection between them that preserves order.
  * A consequence of that fact is that their ordinalities, or "order types" are equal.
  * @param `x` the set to test order isomorphism with
  * @return    `true` if `x` and this set have equal ordinalities
  */
Set.prototype.isOrderIsomorphicWith = function (x) {
  return this.ordinality().equals(x.ordinality());
}
