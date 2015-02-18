package chh.math.set;
/**
 * The Axiom of Specification:
 * For every set x, and a proposition p, there exists a set y such that:
 * for all sets t, if t is an element of y then t is an element of x and p(t) is true.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.12.08
 */
public abstract class Subset extends Set {
	/** The set from which this subset was constructed. */
	private final Set superset;
	/**
	 * Constructs a new Subset object.
	 * @param x the set from which to construct this set
	 * @param p the proposition that must hold for all elements in this set
	 */
	public Subset(Set x, chh.math.logic.Proposition p) {
		this.superset = x;
		// FIX THIS
	}
	/**
	 *
	 * @param x
	 * @return
	 */
	public boolean isSubsetOf(Set x) {
		return this.superset.equals(x) || x.includes(this);
	}
}
