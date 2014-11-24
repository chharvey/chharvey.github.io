package chh.math.logic;

/**
 * A proposition represents a mathematical statement about sets.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.26
 */
public class Proposition {
	/** The boolean value of this proposition. */
	private final Constant value;
	/**
	 * Constructs a new Proposition object.
	 * @param b one of the {@see Proposition.Constant} types
	 */
	Proposition(Constant b) {
		this.value = b;
	}
	/**
     * Constructs a new Proposition object.
	 * @param b a boolean primitive type
	 */
//	Proposition(boolean b) {
//		if (b) {this.value = Constant.TRUE;}
//		else {this.value = Constant.FALSE;}
//	}
	/**
	 * Constructs a new Proposition object whose value is that of the parameter's.
	 * @param p another proposition whose value determines this one
	 */
	public Proposition(Proposition p) {
		this(p.value);
	}
	/**
	 * Constructs a new Proposition object.
	 * (a convenience constructor)
	 */
	public Proposition() {
		this(Constant.TRUE);
	}
	/**
	 * Gives the value of this proposition.
	 * @return one of the {@see Proposition.Constant} types
	 */
	Constant value() {return this.value;}
	
	/**
	 * A set of logical constants that a proposition may hold.
	 * 99% of the time, logic will use TRUE and FALSE as constants, and thus
	 * this enum serves simply as an abstraction of the Boolean values.
	 * However, there are some logical systems that may have more
	 * (and trivially, less).
	 */
	enum Constant {
		/**
		 * The boolean value true.
		 */
		TRUE,
		/**
		 * The boolean value false.
		 */
		FALSE,
		/**
		 * An extra value just to show the possibility of more than two logical values.
		 */
		NULL
	}
}
