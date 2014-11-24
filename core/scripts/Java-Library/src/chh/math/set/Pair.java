package chh.math.set;
/**
 * The Axiom of Pair:
 * Given two sets, there exists a set that contains exactly them both.
 * <p>The order of these elements is <strong>not relevant</strong>; that is,
 * {@code (new Pair(a,b)).equals(new Pair(b,a))==true}.</p>
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.12.08
 */
public class Pair extends Set {
	/** One element of this Pair. */
	private final Set element1;
	/** Another element of this Pair. */
	private final Set element2;
	/**
     * Constructs a new Pair object.
	 * 
	 * The order of parameters is irrelevant.
	 * @param x one element of this set
	 * @param y another element of this set
	 */
    public Pair(Set x, Set y) {
		this.element1 = x;
		this.element2 = y;
	}
	/**
	 * Constructs a new Pair object containing two equal sets.
	 * (a convenience constructor)
	 * @see Singleton
	 * @param x an element of this set (equal to the other element)
	 */
	public Pair(Set x) {
		this(x,x);
	}
	/**
	 * Constructs a new Pair object containing two empty sets.
	 * (a convenience constructor)
	 * @see Singleton
	 * @see EmptySet
	 */
	public Pair() {
		this(new EmptySet());
	}
	/**
     * {@inheritDoc}
	 * A pair contains exactly its elements.
     */
    @Override
	public boolean contains(Set x) {
		return x.equals(this.element1) || x.equals(this.element2);
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean includes(Set x) {
		return x.isEmpty() || x.isSingletonOf(this.element1) || x.isSingletonOf(this.element2) || x.equals(this);
	}
	/**
     * {@inheritDoc}
	 * A Pair is always nonempty.
	 * @return false
     */
	@Override
	public final boolean isEmpty() {
		return false;
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean containsEmpty() {
		return this.element1.isEmpty() || this.element2.isEmpty();
	}
	/**
     * {@inheritDoc}
	 * @return true if this Pair's elements are equal
	 */
	@Override
	public boolean isSingleton() {
		return this.element1.equals(this.element2);
	}
	/**
     * {@inheritDoc}
	 * All Pair objects are pairs.
	 * @return true
	 */
	@Override
	public final boolean isPair() {
		return true;
	}
	/**
     * {@inheritDoc}
	 * The power set of x is a pair if x is a singleton or if x is empty.
	 * If so, this pair contains the empty set and x.
	 * @return true if x is a singleton or is empty, and this set contains x and the empty set
	 */
	@Override
	public boolean isPowerSetOf(Set x) {
		boolean p = this.containsEmpty() && this.contains(x); // a fact about all power sets
		boolean e = x.isSingleton() || x.isEmpty();
		return p && e;
	}
	/**
     * {@inheritDoc}
	 * No Pair objects are inductive.
	 * @return false
	 */
	@Override
	public boolean isInductive() {
		return false;
	}
	/**
     * {@inheritDoc}
	 * @return {@code { element1, element2 }}
	 */
	@Override
	public String toString() {
		String s = "{ " + this.element1;
		if (!this.isSingleton()) {
			s += ",  " + this.element2;
		}
		s += " }";
		return s;
	}
}
