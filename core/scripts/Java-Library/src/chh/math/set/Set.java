package chh.math.set;
/**
 * A set is that which may contain elements; these elements, in turn, are also sets.
 * An unordered finite collection of other Sets.
 * In mathematics, a set is an object that "owns" other sets. A set is <i>immutable</i>, so it cannot be changed once instantiated.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2010.12.07
 * @version 2013.12.08
 */
public abstract class Set {
    /**
     * An array that holds this object's elements.
     * Even though arrays are ordered, the order of items in this array is irrelevant
     * because sets are unordered.
     */
    private final Set[] elements; // final because it is immutable    

    /**
     * Constructs a new Set with given elements.
     * @param elems    an array of Set objects
     */
    public Set(Set[] elems) {
        this.elements = Set.removeDuplicates(elems);
    }
    /**
     * Constructs a copy of the given Set (A "copy constructor").
     * @param s the Set object to be copied.
     */
    public Set(Set s) {
        this(s.toArray());
    }
    /**
     * Constructs an empty set.
     */
    public Set() {
        this(new Set[0]);
    }
	/**
	 * Constructs a new Set object.
	 * Abstract classes shouldn't have constructors.
	 */
//	private Set() {}
    /**
     * Removes duplicates from an array of Set objects.
     * And returns a new array with {@code null} objects replaced for the duplicates.
     * @param oldArray 
     * @return a new array with duplicates removed and replaced with {@code null} objects
     */
    private static Set[] removeDuplicates(Set[] oldArray) {
        int cells = 0; // the number of needed cells in the new array
        for (int i = 0; i < oldArray.length; i++) {
            /* Loops through old array and nullifies all non-null Set objects that are equal to the current Set object. */
            if (oldArray[i] != null) {
                cells++;
                for (int j = i + 1; j < oldArray.length; j++) {
                    if (oldArray[i].equals(oldArray[j])) oldArray[j] = null;
                }
            }
        }
        Set[] newArray = new Set[cells]; // the new array without any duplicates or empty spaces
        int nCell = 0; // an index for the new array
        for (int i = 0; i < oldArray.length; i++) {
            /* loops through old array and copies entries to new array only if they are non-null */
            if (oldArray[i] != null) {
                newArray[nCell] = oldArray[i];
                nCell++;        
            }
        }
        return newArray;
    }
    /**
     * Determines whether this set 'owns' a particular element.
     * Mathematical ownership indicates that the element is a member of this set.
     * @param elem  the element in question
     * @return      {@code true} if {@code elem} is a member of this set
     */
    public final boolean owns(Set elem) {
        /* Assume false, and if just one element in this set is equal to the given, set true. */
        boolean predicate = false; 
        for (int i = 0; i < this.elements.length; i++) {
            predicate = predicate || this.elements[i].equals(elem);
        }
        return predicate;
    }
    /**
     * Determines whether this set is a member of a particular set.
     * An inverse method for the {@code owns(Set)} method.
     * @param set   the set in question
     * @return      {@code true} if {@code set} owns this set
     */
    public final boolean isElementOf(Set set) {
        return set.owns(this);
    }
	/**
	 * Returns whether this set owns the specified set as an element.
	 * @param x the specified set
	 * @return true if x is an element of this set
	 */
	public abstract boolean contains(Set x);
    /**
     * Determines whether this set is a superset of a particular set.
     * 'B' is a superset of 'A' if and only if 'B' owns at least all the elements in 'A'.
     * @param set   the set in question
     * @return      {@code true} if this set owns at least all the elements in {@code set}
     */
    public final boolean isSupersetOf(Set set) {
        /* Assume true, and if just one element in {@code set} is not in this, set false. */
        boolean predicate = true;
        for (int i = 0; i < set.elements.length; i++) {
            predicate = predicate && this.owns(set.elements[i]);
        }
        return predicate;
    }
	/**
	 * Returns whether this Set has the specified Set as a subset.
	 * The set x is a subset of a set y exactly when "all the elements of x are in y", that is:
	 * for all sets t, if t is an element of x then t is an element of y.
	 * <p>Although there is a {@see Subset} class,
	 * some Set objects may have the <em>property</em> of being a subset of this one without 
	 * being an instance of the Subset class.</p>
	 * @see Subset
	 * @param x the Set that this Set includes or not
	 * @return true if this set contains all the elements of x
	 */
	public abstract boolean includes(Set x);
    /**
     * Determines whether this is a subset of a particular set.
     * An inverse method for the {@code isSupersetOf(Set)} method.
     * @param set 
     * @return  {@code true} if {@code set} is a superset of this set
     */
    public final boolean isSubsetOf(Set set) {
        return set.isSupersetOf(this);
    }
    /**
     * Returns whether this set is 'equal' to the given set.
     * Set equality is defined by the Axiom of Extensionality:
     *  Two sets are equal if and only if they own exactly the same elements,
     *  (ignoring the fact that "the same" means "equal":
     *      this method is recursive in that it tests the elements the same way as it does sets).
     *  In other words, they are supersets of each other (equivalently, they are subsets of each other).
     * @param set 
     * @return {@code true} if these sets have exactly the same elements
     */
    public boolean equals(Set set) {
        boolean predicate;
        if (this == null || set == null || !(this.isEquinumerousTo(set))) {
            // if either set is null (not the same as mathematically "null")
            // or if the sets are not equinumerous
            predicate = false;
        } else if (this.isEmpty() && set.isEmpty()) {
            // if both sets are empty //BASIS for the recursive nature of equals(Set) and owns(Set)
            predicate = true;
        } else {
            predicate = this.isSupersetOf(set) && this.isSubsetOf(set);
        }
        return predicate;
    }
	/**
	 * Returns whether the specified Set has the same elements as this Set.
	 * Two sets x and y are equal (have the same elements) exactly when they include each other:
	 * for all sets t, t is an element of x if and only if t is an element of y.
	 * If x is empty, and this set is empty, they are equal.
	 * @see includes(Set)
	 * @param x the specified set
	 * @return true if x and this set are both empty, or this set and x include each other
	 */
	public boolean equals(Set x) {
		boolean sameObject = (this == x); // a convenience statement: equal Java Objects are equal sets (but not vice versa)
		boolean bothEmpty = x.isEmpty() && this.isEmpty(); // a convenience statement: all empty sets are equal
		boolean includeEachOther = this.includes(x) && x.includes(this); // definition of set equality
		return sameObject || bothEmpty || includeEachOther;
	}
    /**
     * Verifies whether this set is 'empty'. Mathematical empty sets own no elements.
     * @return  {@code true} if the set has zero elements.
     */
    public final boolean isEmpty() {
        return (this != null && this.cardinality().getValue() == 0);
    }
	/**
	 * Returns whether this Set has no elements.
	 * A set y is empty exactly when:
	 * for all sets t, t is not an element of y.
	 * <p>Although there is an {@see EmptySet} class,
	 * some Set objects may have the <em>property</em> of being empty without 
	 * being an instance of the EmptySet class.</p>
	 * @see EmptySet
	 * @return true if this set has no elements
	 */
	public abstract boolean isEmpty();
	/**
	 * Returns whether this Set contains the empty set.
	 * @see EmptySet
	 * @return true if the empty set is an element of this set
	 */
	public boolean containsEmpty() {
		return this.contains(new EmptySet());
	}
	/**
	 * Returns whether this Set contains one unique element.
	 * A set y contains one unique element x exactly when:
	 * x is an element of y, and for all sets a and b that are elements of y, a.equals(b).
	 * <p>Although there is a {@see Singleton} class,
	 * some Set objects may have the <em>property</em> of being a singleton without 
	 * being an instance of the Singleton class.</p>
	 * @see Singleton
	 * @return true if this set contains exactly one element
	 */
	public abstract boolean isSingleton();
	/**
	 * Returns whether this Set contains one unique element specified as a parameter.
	 * @see Singleton
	 * @see isSingleton()
	 * @param x the Set of which this set may or may not contain
	 * @return true if this set contains x and no other elements
	 */
	public final boolean isSingletonOf(Set x) {
		return this.isSingleton() && this.contains(x);
	}
	/**
	 * Returns whether this set contains exactly two elements (which may be equal).
	 * A set x is a pair if and only if there exists a set a in x, and a set b in x, and for all sets y in x, y=a or y=b.
	 * <p>Although there is a {@see Pair} class,
	 * some Set objects may have the <em>property</em> of being a pair without
	 * being an instance of the Pair class.</p>
	 * <p>If both elements of this set are equal, then {@code this.isSingleton()==true}.
	 * If {@code this.isSingleton()==true} then {@code this.isPair()==true}
	 * (but the converse is not necessarily the case).</p>
	 * @see Pair
	 * @see isSingleton()
	 * @return true if this set contains exactly two elements (which may be equal).
	 */
	public abstract boolean isPair();
	/**
	 * Returns whether this Set contains two elements specified as parameters.
	 * @see Pair
	 * @see isPair()
	 * @param x a Set of which this set may or may not contain
	 * @param y a Set of which this set may or may not contain
	 * @return true if this contains x and y and no other elements
	 */
	public final boolean isPairOf(Set x, Set y) {
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
	/**
	 * Returns whether this Set is the successor of the specified Set.
	 * The {@see Successor} of a set is constructed by taking the {@see Union} of:
	 * <ol>
	 * <li>that set, and</li>
	 * <li>the {@see Singleton} of that set</li>
	 * </ol>
	 * Consequently, this set is the successor of a set x if and only if:
	 * this set contains x, and this set includes x.
	 * <p>Although there is a {@see Successor} class,
	 * some Set objects may have the <em>property</em> of being a successor without 
	 * being an instance of the Successor class.</p>
	 * @param x the Set of which this Set is or is not the successor
	 * @return true if this set is the successor of x
	 */
	public boolean isSuccessorOf(Set x) {
		return (this.contains(x) && this.includes(x));
	}
	/**
	 * Returns whether this set is inductive.
	 * A set y is inductive iff:
	 * <ol>
	 *	<li>{@code y.contains(new EmptySet())}</li>
	 *  <li>for all sets t, if {@code y.contains(t)} then {@code y.contains(new SuccessorSet(t))}</li>
	 * </ol>
	 * Although there is a {@see InductiveSet} class,
	 * some Set objects may have the <em>property</em> of being inductive without 
	 * being an instance of the InductiveSet class.
	 * @see EmptySet
	 * @see Successor
	 * @return true if this set is inductive
	 */
	public abstract boolean isInductive();
	/**
     * {@inheritDoc}
	 * @return the set-theoretic representation of this object
     */
    @Override
	public abstract String toString();
    /**
     * Returns a list of elements in this set. This list is an array of other sets.
     * @return 
     */
    public final Set[] toArray() {
        return this.elements;
    }
    /**
     * Returns a Cardinal number representing this set's size.
     * @return  a {@code Cardinal} object that corresponds to this set's size.
     */
	public final Cardinal getCardinality() {
        return new Cardinal(this.elements.length);
    }
    /**
     * Returns the equinumerosity of this set compared to the given set.
     * Mathematical sets are equinumerous if and only if their cardinalities are equal.
     * (Technically, mathematical sets are equinumerous defined by there exists a bijection between them,
     *  but this is equivalent to saying their cardinalities are equal.)
     * @param set 
     * @return  {@code true} if the sets are equinumerous.
     */
    public final boolean isEquinumerousTo(Set set) {
        return this.cardinality().equals(set.cardinality());
    }
}
