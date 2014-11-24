package chh.math.set;
/**
 * An OrderedPair is a set that encodes the order of its two coordinates.
 * <p>An ordered pair is written (a,b), where a and b are the coordinates.
 * The order of these coordinates <strong>is relevant</strong>; that is,
 * {@code (new OrderedPair(a,b)).equals(new OrderedPair(b,a))==false} (unless of course {@code a.equals(b)}), in which case
 * {@code (new OrderedPair(a,b)).equals(new OrderedPair(b,a))==true}.</p>
 * <p>An OrderedPair is similar to a {@see Tuple} with 2 components (a 2-tuple),
 * however they are structurally different from a set-theoretic approach:
 * The ordered pair (a,b) does not have the same elements as the 2-tuple &lang;a,b&rang;
 * and thus they are not equal.</p>
 * <p>{@code new OrderedPair(a,b)} is defined by {@code super(new Singleton(a), b)}</p>
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.08.03
 */
public class OrderedPair extends Pair {
	/** The first coordinate. */
	private final Set abscissa;
	/** The second coordinate. */
	private final Set ordinate;
	
	/**
	 * Constructs a new OrderedPair object.
	 * @param abscissa the first coordinate
	 * @param ordinate the second coordinate
	 */
	public OrderedPair(Set abscissa, Set ordinate) {
		super(new Singleton(abscissa), ordinate);
		this.abscissa = abscissa;
		this.ordinate = ordinate;
	}
	/**
     * Returns whether the specified OrderedPair is equal to this OrderedPair.
	 * @param x the specified OrderedPair
	 * @return true if x has the same coordinates as this OrderedPair
	 */
	public boolean equals(OrderedPair x) {
		boolean a = this.abscissa.equals(x.abscissa);
		boolean b = this.ordinate.equals(x.ordinate);
		return a && b;
	}
}
