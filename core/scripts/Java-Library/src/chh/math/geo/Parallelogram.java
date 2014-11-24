package chh.math.geo;

/**
 * A parallelogram is a quadrilateral whose opposite sides are parallel.
 * Theorem: the opposite sides of a parallelogram are congruent.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Parallelogram extends Quadrilateral {
	/** The base of this parallelogram. */
	private final Length base;
	/** The side of this parallelogram. */
	private final Length side;
	/** The angle between the base and the left side. */
	private final double angle;

	/** 
	 * Creates a new Parallelogram object.
	 * @param a the base of this parallelogram
	 * @param b the left side of this parallelogram
	 * @param ang the angle, in degrees, between the base and the left side
	 */
	public Parallelogram(Length a, Length b, double ang) {
		super(a, b, a, b);
		this.base = a;
		this.side = b;
		this.angle = ang;
	}
	
	/**
	 * Returns the base of this parallelogram.
	 * @return the base of this parallelogram
	 */
	public final Length getBase() {
		return this.base;
	}
	/**
	 * Returns the side of this parallelogram.
	 * @return the side of this parallelogram
	 */
	public final Length getSide() {
		return this.side;
	}
	/**
	 * Returns the angle between the base and the left side of this parallelogram.
	 * @return the angle between the base and the left side of this parallelogram
	 */
	public final double getAngle1() {
		return this.angle;
	}
	/**
	 * Returns the angle between the base and the right side of this parallelogram.
	 * @return the angle between the base and the right side of this parallelogram
	 */
	public final double getAngle2() {
		return 180 - this.angle;
	}

	/**
	 * Returns the height of this parallelogram.
	 * @return the height of this parallelogram
	 */
	public Length getHeight() {
		return Length.scale(this.side, Math.sin(this.getAngle1()));
	}
	/**
	 * Returns the area of this parallelogram.
	 * @return the area of this parallelogram
	 */
	public final Area getArea() {
		return Length.multiply(this.getBase(), this.getHeight());
	}
}
