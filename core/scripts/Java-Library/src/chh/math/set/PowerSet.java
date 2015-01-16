package chh.math.set;
/**
 * The Axiom of Power:
 * Given a set x, there exists a set that contains exactly all subsets of x.
 * <p>Given a set x, the power set P(x) contains, as elements,
 * the empty set (a subset of x), x itself (another subset of x), and possibly 
 * other elements iff they are subsets of x.</p>
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.12.23
 */
public class PowerSet extends Set {
	/** The set of which this object is a PowerSet. */
	private final Set baseset;
	/**
	 * Constructs a new PowerSet object.
	 * @param x 
	 */
	public PowerSet(Set x) {
		this.baseset = x;
	}
	/**
	 * Constructs a new PowerSet of the empty set.
	 * (a convenience constructor)
	 * @see EmptySet
	 */
	public PowerSet() {
		this(new EmptySet());
	}
	/**
     * {@inheritDoc}
	 * If a is a set then the power set P(a) will, by definition, contain all subsets of a.
     */
    @Override
	public boolean contains(Set x) {
		return this.baseset.includes(x);
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean includes(Set x) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
	 * The power set of any set is nonempty.
     */
	@Override
	public boolean isEmpty() {
		return false;
	}
	/**
	 * {@inheritDoc}
	 * All power sets contain the empty set.
	 * @return true
	 */
	@Override
	public boolean containsEmpty() {
		return true;
	}
	/**
     * {@inheritDoc}
	 * A power set P(a) is a singleton if and only if a is empty.
	 * @return true if this object is the power set of the empty set
     */
	@Override
	public boolean isSingleton() {
		return this.baseset.isEmpty();
	}
	/**
	 * {@inheritDoc}
	 * A power set P(a) is a pair if and only if P(a) is a singleton or a is a singleton.
	 * @return true if this object is a singleton or if it is the power set of a singleton
	 */
	@Override
	public boolean isPair() {
		return this.isSingleton() || this.baseset.isSingleton();
	}
	/**
     * {@inheritDoc}
	 */
	@Override
	public boolean isPowerSetOf(Set x) {
		return x.equals(this.baseset);
	}
	/**
     * {@inheritDoc}
	 * No power set is inductive.
	 * @return false
     */
	@Override
	public boolean isInductive() {
		return false;
	}
	
	/**
     * {@inheritDoc}
//	 * @return {@code { 0, ..., `baseset` }}
	 * @return {@code P(`baseset`)}
     */
	@Override
	public String toString() {
//		return "{ 0, ..., " + this.baseset.toString() + " }";
		return "P(" + this.baseset.toString() + ")";
	}

}
