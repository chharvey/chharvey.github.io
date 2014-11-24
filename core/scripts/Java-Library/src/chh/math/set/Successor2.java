package chh.math.set;

/**
 * The successor of a set x has, as elements, exactly all elements of x, and also x.
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2012.12.23
 */
public class Successor2 extends Set {
	/** The set of which this object is a successor. */
	private final Set predecessor;
	
	/**
	 * Constructs a new Successor2 object.
	 * @param x the set of which to construct this successor
	 */
	public Successor2(Set x) {
		this.predecessor = x;
	}
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
