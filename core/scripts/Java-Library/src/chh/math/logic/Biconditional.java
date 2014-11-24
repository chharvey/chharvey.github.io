package chh.math.logic;

/**
 * The Biconditional is a binary operator on two propositions.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.26
 */
public class Biconditional extends Conjunction {
	/**
	 * Constructs a new Biconditional object.
	 * @param p the first proposition
	 * @param q  the second proposition
	 */
	public Biconditional(Proposition p, Proposition q) {
		super(new Implication(p, q), new Implication(q, p));
	}
}
