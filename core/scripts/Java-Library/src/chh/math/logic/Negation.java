package chh.math.logic;

/**
 * The Negation of a proposition is a unary operator on that proposition's value.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.26
 */
public class Negation extends Proposition {
	/**
	 * Constructs a new Negation object given a Proposition.
	 * @param p the proposition to negate
	 */
	public Negation(Proposition p) {
		super(p.value()==Proposition.Constant.TRUE ? Proposition.Constant.FALSE : Proposition.Constant.TRUE);
	}
	/**
	 * Constructs a new Negation object.
	 * (a convenience constructor)
	 */
	public Negation() {
		this(new Proposition()); // 
	}
}
