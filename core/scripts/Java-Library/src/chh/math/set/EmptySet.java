package chh.math.set;
/**
 * <b>The Axiom of Existence:</b>
 * There exists a set that contains no elements; furthermore, this set is unique.
 * We symbolize this set by {}.
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.12.08
 */
public class EmptySet extends Set {
	/**
	 * Constructs a new EmptySet object.
	 */
	public EmptySet() {}
	
	/**
     * {@inheritDoc}
	 * All EmptySet objects are empty by definition.
	 * @return false
     */
    @Override
	public final boolean contains(Set x) {
		return false;
	}
	/**
     * {@inheritDoc}
	 * The only possible subset of the empty set is itself.
	 * @return true if x is empty
     */
    @Override
	public final boolean includes(Set x) {
		return x.isEmpty();
	}
	/**
     * {@inheritDoc}
	 * All EmptySet objects are empty.
	 * @return true
     */
	@Override
	public final boolean isEmpty() {
		return true;
	}
	/**
	 * {@inheritDoc}
	 * @return false
	 */
	@Override
	public final boolean containsEmpty() {
		return false;
	}
	/**
     * {@inheritDoc}
	 * All EmptySet objects are empty.
	 * @return false
	 */
	@Override
	public final boolean isSingleton() {
		return false;
	}
	/**
     * {@inheritDoc}
	 * All EmptySet objects are empty.
	 * @return false
	 */
	@Override
	public final boolean isPair() {
		return false;
	}
	/**
     * {@inheritDoc}
	 * All EmptySet objects are empty.
	 * @return false
	 */
	@Override
	public final boolean isPowerSetOf(Set x) {
		return false;
	}
//	/**
//	 * {@inheritDoc}
//	 * All EmptySet objects are empty.
//	 * @return false
//	 */
//	@Override
//	public final boolean isSuccessorOf(Set x) {
//		return false;
//	}
	/**
     * {@inheritDoc}
	 * No EmptySet objects are inductive.
	 * @return false
	 */
	@Override
	public final boolean isInductive() {
		return false;
	}
	/**
     * {@inheritDoc}
	 * @return {@code {}} or {@code 0}
	 */
	@Override
	public String toString() {
		//return "{}";
		return "0";
	}
	
}
