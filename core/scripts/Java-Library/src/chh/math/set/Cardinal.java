package chh.elmnts;

/**
 * A cardinal number (or a cardinal) is an object that describes the size of, or number of elements in, a set.
 * By definition, a cardinal number is a set that has the exact size it describes
 *  (e.g., a cardinal of 3 describes all sets with 3 elements, and it itself has 3 elements).
 * A {@code Cardinal} object refers to an actual set size.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2011.06.15
 */
public class Cardinal extends Natural {
    
    /**
     * Constructs a new Cardinal object with given size.
     * @param n the given size
     */
    public Cardinal(int n) {
        super(n);
    }
    /**
     * Constructs a new Cardinal object corresponding to a given set's size.
     * @param set   the given set
     */
    public Cardinal(Set set) {
        this(set.toArray().length);
    }
    /**
     * Constructs a new empty Cardinal number.
     */
    public Cardinal() {
        this(0);
    }
    
}
