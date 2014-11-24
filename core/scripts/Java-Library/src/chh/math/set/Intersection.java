package chh.math.set;
/**
 *
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.26
 */
public class Intersection extends Subset {
	/**
	 * Constructs a new Intersection object.
	 * @param x 
	 */
	public Intersection(Set x) {
		super(new Union(x), new chh.math.logic.Proposition()); // FIX THIS
	}
	/**
	 *
	 * @param x
	 * @param y
	 */
	public Intersection(Set x, Set y) {
		this(new Pair(x, y));
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean contains(Set x) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean includes(Set x) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean isEmpty() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean isInductive() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
}
