package chh.math.geo;

/**
 * A wrapper class representing a one-dimensional measurement. Values may be {@code double}s.
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.29
 */
public class Length {
	/** The value of this length. */
	private final double value;
	/**
	 * Constructs a new Length object.
	 * @param x the length
	 */
	public Length(double x) {
		this.value = x;
	}

	/**
	 * Returns the value of this length.
	 * @return the value of this length.
	 */
//	public final double getValue() {
//		return this.value;
//	}
	
	/**
	 * Adds two lengths and returns a length.
	 * @param a the first length
	 * @param b the second length
	 * @return a length equal to the sum of both lengths
	 */
	public static final Length add(Length a, Length b) {
		return new Length(a.value + b.value);
	}
	/**
	 * Adds an array of lengths and returns a length.
	 * @param arr the array of lengths to add
	 * @return a length equal to the sum of all the lengths in the array
	 */
	public static final Length add(Length[] arr) {
		double sum = 0;
		for (int i = 0; i < arr.length; i++) {
			sum += arr[i].value;
		}
		return new Length(sum);
	}
	/**
	 * Returns a scale factor of a given length.
	 * @param a the length to be scaled.
	 * @param k the factor by which to scale
	 * @return the product of the length and the scale factor
	 */
	public static final Length scale(Length a, double k) {
		return new Length(a.value * k);
	}
	
	/**
	 * Multiplies two lengths and returns an area.
	 * @param a the first length
	 * @param b the second length
	 * @return an area equal to the product of a and b
	 */	
	public static final Area multiply(Length a, Length b) {
		return new Area(a.value * b.value);
	}
}
