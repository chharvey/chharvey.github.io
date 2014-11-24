package chh.math.set;
/**
 * A singleton is a set that owns exactly one element.
 * This class is not to be confused with a "singleton" class,
 *  which is a class that can only be instantiated once.
 * Singleton Theorem:
 * For every set x, there exists a set that contains exactly x. {@code new Singleton(x)} is defined as {@code super(x,x)}.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2011.06.15
 * @version 2013.12.08
 */
public class Singleton extends Pair {
	/** The cardinality of all singletons. */
	//private static final int CARDINALITY = 1;

	/** The element of this set. */
	private final Set element;
	/**
	 * Constructs a new singleton from a given element.
	 * @param s 
	 */
	public Singleton(Set e) {
		super(new Set[] {e});
	}
	/**
	 * Constructs a new Singleton object containing a specified set.
	 * @param x the only element of this set
	 */
	public Singleton(Set x) {
		super(x,x);
		this.element = x;
	}
	/**
	 * Constructs a new Singleton object containing the empty set.
	 * (a convenience constructor)
	 * @see EmptySet
	 */
	public Singleton() {
		this(new EmptySet());
	}
	/**
     * {@inheritDoc}
	 * A singleton contains exactly its element.
     */
    @Override
	public boolean contains(Set x) {
		return x.equals(this.element);
	}
	/**
     * {@inheritDoc}
	 * The only possible subsets of a singleton are the empty set and itself.
     */
	@Override
	public boolean includes(Set x) {
		return x.isEmpty() || x.equals(this);
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean containsEmpty() {
		return this.element.isEmpty();
	}
	/**
     * {@inheritDoc}
	 * All Singleton objects are singletons.
	 * @return true
	 */
	@Override
	public final boolean isSingleton() {
		return true;
	}
	/**
     * {@inheritDoc}
	 * The power set of x is a singleton if and only if x is empty.
	 * If so, this singleton contains the empty set.
	 * @return true if x is empty and this set contains x
	 */
	@Override
	public boolean isPowerSetOf(Set x) {
		return x.isEmpty() && this.contains(x);
	}
	/**
     * {@inheritDoc}
	 * @return {@code { element }}
	 */
	@Override
	public String toString() {
		return "{ " + this.element + " }";
	}
}
