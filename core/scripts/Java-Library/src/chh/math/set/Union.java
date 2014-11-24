package chh.math.set;
/**
 * The union of a cluster of sets (a set whose members are sets that have relevant elements)
 * owns the all elements of all of the sets in that cluster.
 * The Axiom of Union:
 * 
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2011.06.14
 * @version 2013.12.08
 */
public class Union extends Set {
	/** */
	private final Set baseset;
    /**
     * Constructs a new Union object from one collection of sets. (The collection is itself a set).
     * @param cluster   the collection of sets to create the union from
     */
    public Union(Set cluster) {
        super(union(cluster));
    }
	/**
	 * Constructs a new Union object from one set.
	 * @param x 
	 */
	public Union(Set x) {
		this.baseset = x;
	}
    /**
     * Constructs a new Union object from two distinct sets.
     * @param s the first set
     * @param t the second set
     */
    public Union(Set s, Set t) {
        this(new Set(new Set[] {s,t}));
    }
	/**
	 * Constructs a new Union object from two sets.
	 * @param x
	 * @param y
	 */
	public Union(Set x, Set y) {
		this(new Pair(x, y));
	}
	/**
	 * Constructs a new Union object from a singleton containing an EmptySet.
	 */
	public Union() {
		this(new Singleton(new EmptySet()));
	}
	
    /**
     * Transfers entries from a two-dimensional array into a one-dimensional array, one by one.
     * @param cluster   the outer set with members that are other sets whose members are to be copied
     * @return          a one-dimensional array
     */
    private static final Set[] union(Set cluster) {
        /* Adds the cardinalities of each set in the collection */
        int cells = 0;
        //for (Set element : cluster) {} // can't do a for-each loop unless it is a 'Collection'
        for (int i = 0; i < cluster.cardinality().getValue(); i++) {
            cells += cluster.toArray()[i].cardinality().getValue();
        }
        Set[] union = new Set[cells]; // creates the new blank array with the correct number of cells
        
        /* copies the elements from the collection's sets into the new array */
        int nCell = 0; // an index for the new array
        for (int i = 0; i < cluster.cardinality().getValue(); i++) {
            for (int j = 0; j < cluster.toArray()[i].cardinality().getValue(); j++) {
                union[nCell] = cluster.toArray()[i].toArray()[j];
                nCell++;
            }
        }
        return union;
    }

	/**
     * {@inheritDoc}
	 * {@code this.contains(x)} if and only if there exists an element of {@code this.baseset} of which x is a member.
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
		/*
		 * consider baseSet as the collection of sets A, B, C, and so on.
		 * then A, B, C, etc. are elements of baseSet. The Union of baseSet, by dfn, is
		 * the collection of all elements in A, B, C, etc. So A, B, C, etc.
		 * are all subsets of the Union (not baseSet).
		 * Therefore any element of baseSet is a subset of Union.
		 * However, these are not the only subsets...
		 */
		/*
		 * if t is an element of x then t is an element of either of 
		 * A, B, C, or any other element of baseSet
		 * this does NOT mean that x is a subset of either of A, B, C, etc,
		 * because t1 could be in A and t2 could be in B.
		 */		
		return x.isEmpty() || this.baseset.contains(x);
	}
	/**
     * {@inheritDoc}
	 * A Union is empty if and only if:
	 * its base set is a singleton of the empty set, or
	 * its base set is the empty set itself.
     */
	@Override
	public boolean isEmpty() {
		return this.baseset.isEmpty() || this.baseset.isSingletonOf(new EmptySet());
	}
	/**
     * {@inheritDoc}
	 * <p>A Union is a singleton if and only if:
	 * its base set is a singleton containing a singleton, or
	 * its base set is a pair containing the empty set and another singleton.</p>
     */
	@Override
	public boolean isSingleton() {
		boolean a = this.baseset.isSingleton() && this.baseset.containsSingleton();
		boolean b = this.baseset.isPair() && this.baseset.containsEmpty() && this.baseset.containsSingleton();
		return a || b;
	}
	/**
     * {@inheritDoc}
	 * <p>A Union is a pair if and only if:
	 * this Union is a singleton, or
	 * its base set is a singleton containing a pair, or
	 * its base set is a pair containing two unequal singletons, or
	 * its base set is a pair containing an empty set and a pair (with unequal elements),
	 * its base set has exactly three unequal elements, containing an empty set and two unequal singletons.</p>
     */
	@Override
	public boolean isPair() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean isPowerSetOf(Set x) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
     */
	@Override
	public boolean isInductive() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	/**
     * {@inheritDoc}
	 * @return {@code U(`baseset`)}
     */
	@Override
	public String toString() {
		return "U(" + this.baseset.toString() + ")";
	}
}
