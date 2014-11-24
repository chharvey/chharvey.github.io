package chh.math.logic;

/**
 * The Conjunction is a binary operator on two propositions.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.26
 */
public class Conjunction extends Negation {
	/**
	 * Constructs a new Conjunction object.
	 * @param p the first proposition
	 * @param q  the second proposition
	 */
	public Conjunction(Proposition p, Proposition q) {
		super(new Disjunction(new Negation(p), new Negation(q)));
	}
}
