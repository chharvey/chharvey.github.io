package chh.math.set;
/**
 * The successor of a set x is defined as the union of x and the singleton containing x.
 * A successor is a special operation on sets that constructs the union of a given set and its singleton.
 * The elements of a successor of a given set comprise of all the elements of that set in addition to that set itself.
 * The successor of a set x has, as elements, exactly all elements of x, and also x.
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2011.06.15
 * @version 2013.12.08
 */
public class Successor extends Union {
	/** The set of which this object is a successor. */
	private final Set predecessor;

	/**
	 * Constructs a new Successor object from a set.
	 * @param x the set of which to construct this successor
	 */
	public Successor(Set x) {
		super(x, new Singleton(x));
		this.predecessor = x;
	}
	/**
	 * Constructs a new Successor of the empty set.
	 * <p>The successor of the empty set is defined as the union of the empty set and the singleton containing the empty set.
	 * In other words, if we denote the empty set with the number 0, then the successor of 0 is {0}, which we define to be the number 1. Thus {@code new Successor()} constructs the number 1</p>
	 */
	public Successor() {
		this(new EmptySet());
	}
	/**
	 * Returns the Set of which this object is the Successor.
	 * @return the Set of which this object is the Successor
	 */
//	public Set getPredecessor() {
//		return this.predecessor;
//	}


	/**
	* {@inheritDoc}
	* @return true if the predecessor of this set equals x or contains x
	*/
	@Override
	public boolean contains(Set x) {
		return this.predecessor.equals(x) || this.predecessor.contains(x);
	}
	/**
	* {@inheritDoc}
	* @return true if x is a subset of this.predecessor, or if x is the union of a subset of this.predecessor and this.predecessor
	*/
	@Override
	public boolean includes(Set x) {
		boolean xIsSubsetOf = this.predecessor.includes(x);
		boolean xIsUnionOf = x.equals(new Union(???));
		return xIsSubsetOf || xIsUnionOf;
	}
	/**
	* {@inheritDoc}
	* A Successor is always nonempty.
	* @return false
	*/
	@Override
	public final boolean isEmpty() {
		return false;
	}
	/**
	* {@inheritDoc}
	* A Successor is a singleton if and only if its predecessor is the empty set.
	*/
	@Override
	public boolean isSingleton() {
		return this.predecessor.isEmpty();
	}
	/**
	* {@inheritDoc}
	* A Successor is a pair if and only if its predecessor is the singleton containing the empty set.
	*/
	@Override
	public boolean isPair() {
		return this.predecessor.isSingletonOf(new EmptySet());
	}
	/**
	* {@inheritDoc}
	*/
	@Override
	public boolean isPowerSetOf(Set x) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
	* {@inheritDoc}
	*/
	@Override
	public boolean isInductive() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
	* {@inheritDoc}
	*/
	@Override
	public String toString() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

}
