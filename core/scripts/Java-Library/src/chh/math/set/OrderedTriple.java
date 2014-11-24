package chh.math.set;

/**
 * An OrderedTriple is an extension (figuratively and literally) on the ordered pair: it has
 * three coordinates rather than two.
 * <p>An OrderedTriple is similar to a {@see Tuple} with 3 components (a 3-tuple),
 * however they are structurally different from a set-theoretic approach:
 * The ordered triple (a,b,c) does not have the same elements as the 3-tuple &lang;a,b,c&rang;
 * and thus they are not equal.</p>
 * <p>{@code OrderedTriple(a,b,c)} is defined as {@code new OrderedPair(new OrderedPair(a,b), c)}.</p>
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.08.03
 */
public class OrderedTriple extends OrderedPair {
	/** The first coordinate. */
	private final Set abscissa;
	/** The second coordinate. */
	private final Set ordinate;
	/** The third coordinate. */
	private final Set applicate;
	
	/**
	 * Constructs a new OrderedTriple object.
	 * @param abscissa the first coordinate
	 * @param ordinate the second coordinate
	 * @param applicate  the third coordinate
	 */
	public OrderedTriple(Set abscissa, Set ordinate, Set applicate) {	
		super(new OrderedPair(abscissa, ordinate), applicate);
		this.abscissa = abscissa;
		this.ordinate = ordinate;
		this.applicate = applicate;
	}
	/**
     * Returns whether the specified OrderedTriple is equal to this OrderedTriple.
	 * @param x the specified OrderedPair
	 * @return true if x has the same coordinates as this OrderedPair
	 */
	public boolean equals(OrderedTriple x) {
		boolean a = this.abscissa.equals(x.abscissa);
		boolean b = this.ordinate.equals(x.ordinate);
		boolean c = this.applicate.equals(x.applicate);
		return a && b;
	}
}
