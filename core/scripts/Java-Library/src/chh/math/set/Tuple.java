package chh.math.set;

/**
 * A Tuple (an ordered n-tuple) is the generalized concept of an ordered pair.
 * <p>An ordered n-tuple is written &lang;a,b,c,&hellip;&rang;, 
 * where a, b, and c are called the coordinates. n is the number of coordinates.</p>
 * <p>An ordered n-tuple is a set that encodes the order of its coordinates (which is only non-trivial for n &gt; 1).
 * For example, {@code (new Tuple(a,b)).equals(new Tuple(b,a))==false} (unless of course {@code a.equals(b)}), while
 * {@code (new Pair(a,b)).equals(new Pair(b,a))==true}.</p>
 * <p>{@code new Tuple(a,b,c,d,...,y,z)} is defined <b>recursively</b> by {@code super(new Tuple(a,b,c,d,...,y), z)},
 * where the <b>basis</b> {@code new Tuple()} is defined by {@code super(new EmptySet())}.</p>
 * <p>Only Tuples of arity 4 and lower have been defined (have constructors).
 * For higher-arity Tuples, must create new constructors, coordinates, and insert them into {@see equals(Tuple)} method.</p>
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.27
 */
public class Tuple extends Pair {
	/** The first coordinate. */
	private final Set coord1;
	/** The second coordinate. */
	private final Set coord2;
	/** The third coordinate. */
	private final Set coord3;
	/** The fourth coordinate. */
	private final Set coord4;
	/**
	 * Constructs a new Tuple object with no coordinates (an ordered 0-tuple).
	 * An ordered 0-tuple &lang;&rang; is (a set) equal to the {@see Singleton} {{}}.
	 * Note that this is <em>not</em> equal to the {@see EmptySet} {}.
	 * The union of &lang;&rang; is the set that contains elements of {}
	 * (that is, the union of &lang;&rang; is empty).
	 */
	public Tuple() {
		super(new EmptySet());
		this.coord1 = new EmptySet();
		this.coord2 = new EmptySet();
		this.coord3 = new EmptySet();
		this.coord4 = new EmptySet();
	}
	/**
	 * Constructs a new Tuple object with one coordinate (an ordered 1-tuple).
	 * The ordered 1-tuple &lang;a&rang; is defined by the pair {&lang;&rang;, a}, which is equal to {{{}},a}.
	 * Note that this is <em>not</em> equal to the {@see Singleton} {a}.
	 * The union of &lang;a&rang; is the set that contains the set {}, and elements of a.
	 * @param a the only coordinate
	 */
	public Tuple(Set a) {
		super(new Tuple(), a);
		this.coord1 = a;
		this.coord2 = new EmptySet();
		this.coord3 = new EmptySet();
		this.coord4 = new EmptySet();
	}
	/**
	 * Constructs a new Tuple object with two coordinates (an ordered 2-tuple).
	 * The ordered 2-tuple &lang;a,b&rang; is defined by the pair {&lang;a&rang;,b}, which is equal to {{{{}},a},b}.
	 * Note that this is <em>not</em> equal to the {@see OrderedPair} (a,b).
	 * The union of &lang;a,b&rang; is the set that contains the tuple &lang;&rang;, the set a, and elements of b.
	 * @param a the x-coordinate (the abscissa)
	 * @param b the y-coordinate (the ordinate)
	 */
	public Tuple(Set a, Set b) {
		super(new Tuple(a), b);
		this.coord1 = a;
		this.coord2 = b;
		this.coord3 = new EmptySet();
		this.coord4 = new EmptySet();
	}
	/**
	 * Constructs a new Tuple object with three coordinates (an ordered 3-tuple).
	 * The ordered 3-tuple &lang;a,b,c&rang; is defined by the pair {&lang;a,b&rang;,c}, which is equal to  {{{{{}},a},b},c}.
	 * Note that this is <em>not</em> equal to the {@see OrderedTriple} (a,b,c).
	 * The union of &lang;a,b,c&rang; is the set that contains the tuple &lang;a&rang;, the set b, and elements of c.
	 * @param a the x-coordinate (the abscissa)
	 * @param b the y-coordinate (the ordinate)
	 * @param c the z-coordinate (the applicate)
	 */
	public Tuple(Set a, Set b, Set c) {
		super(new Tuple(a,b), c);
		this.coord1 = a;
		this.coord2 = b;
		this.coord3 = c;
		this.coord4 = new EmptySet();
	}
	/**
	 * Constructs a new Tuple object with four coordinates (an ordered 4-tuple).
	 * The ordered 4-tuple &lang;a,b,c,d&rang; is defined by the pair {&lang;a,b,c&rang;,d}, which is equal to  {{{{{{}},a},b},c},d}.
	 * The union of &lang;a,b,c,d&rang; is the set that contains the tuple &lang;a,b&rang;, the set c, and elements of d)
	 * @param a the x-coordinate
	 * @param b the y-coordinate
	 * @param c the z-coordinate
	 * @param d the w- or t- coordinate
	 */
	public Tuple(Set a, Set b, Set c, Set d) {
		super(new Tuple(a,b,c), d);
		this.coord1 = a;
		this.coord2 = b;
		this.coord3 = c;
		this.coord4 = d;
	}
	
	/**
	 * Returns whether this Tuple contains both coordinates of the specified Tuple.
	 * (a convenience method to speed computation)
	 * @param x the specified Tuple
	 * @return true if corresponding coordinates are equal
	 */
	public boolean equals(Tuple x) {
		boolean a = this.coord1==x.coord1;
		boolean b = this.coord2==x.coord2;
		boolean c = this.coord3==x.coord3;
		boolean d = this.coord4==x.coord4;
		return a && b && c && d;
	}
}
