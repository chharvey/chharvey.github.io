package chh.math.geo;

/**
 * A rhombus is a quadrilateral with four congruent sides.
 * Theorem: a rhombus is a parallelogram.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Rhombus extends Parallelogram {
	/** 
	 * Creates a new Rhombus object.
	 * @param a the side of this rhombus
	 * @param ang the angle, in degrees, between sides a and b
	 */
	public Rhombus(Length a, double ang) {
		super(a, a, ang);
	}	
}
