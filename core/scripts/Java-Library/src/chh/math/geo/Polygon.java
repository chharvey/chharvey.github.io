package chh.math.geo;

/**
 * A polygon is a closed figure with straight sides.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Polygon {
    /** The number of sides of this polygon. */
	private final int sides;
	
	/** 
	 * Creates a new Polygon object.
	 * @param s the number of sides of this polygon.
	 */
	public Polygon(int s) {
		this.sides = s;
	}
	
	/**
	 * Returns the number of sides of this polygon.
	 * @return the number of sides of this polygon.
	 */
	public final int sides() {
		return this.sides;
	}
}
