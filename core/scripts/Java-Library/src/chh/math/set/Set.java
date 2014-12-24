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
