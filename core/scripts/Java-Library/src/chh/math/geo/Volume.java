package chh.math.geo;

/**
 * A wrapper class representing a three-dimensional measurement. Values may be {@code double}s.
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.29
 */
public class Volume {
	/** The value of this volume. */
	private final double value;
	/**
	 * Constructs a new Volume object.
	 * @param x the volume
	 */
	public Volume(double x) {
		this.value = x;
	}

	/**
	 * Returns the value of this volume.
	 * @return the value of this volume.
	 */
//	public final double getValue() {
//		return this.value;
//	}
	
	/**
	 * Multiplies a length by an area and returns a volume.
	 * @param a the length
	 * @param b the area
	 * @return a volume equal to the product of both lengths
	 */	
	public static final Volume multiply(Length a, Area b) {
		return new Volume(a.value * b.value);
	}
	/**
	 * Multiplies an area by a length and returns a volume.
	 * Equivalent to {@see multiply(Length, Area)}.
	 * @param a the area
	 * @param b the length
	 * @return a volume equal to the product of a and b
	 */	
	public static final Volume multiply(Area a, Length b) {
		return Volume.multiply(b, a);
	}
}
