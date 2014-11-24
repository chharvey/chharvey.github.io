package chh.math.geo;

/**
 * A rectangle is a quadrilateral with four congruent angles.
 * Theorem: a rectangle is a parallelogram.
 * Theorem: a rectangle has four right angles.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Rectangle extends Parallelogram {
	/** The height of this rectangle. */
	private final Length height;

	/** 
	 * Creates a new Rectangle object.
	 * @param a the base of this rectangle
	 * @param b the height of this rectangle
	 */
	public Rectangle(Length a, Length b) {
		super(a, b, 90);
		this.height = b;
	}
	
	/**
	 * Returns the height of this rectangle.
	 * An efficiency class.
	 * @return the height of this rectangle
	 */
	public Length getHeight() {
		return this.height;
	}
}
