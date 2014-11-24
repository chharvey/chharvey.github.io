package chh.math.geo;

/**
 * A wrapper class representing a two-dimensional measurement. Values may be {@code double}s.
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.29
 */
public class Area {
	/** The value of this area. */
	private final double value;
	/**
	 * Constructs a new Area object.
	 * @param x the area
	 */
	public Area(double x) {
		this.value = x;
	}
	
	/**
	 * Returns the value of this area.
	 * @return the value of this area.
	 */
//	public final double getValue() {
//		return this.value;
//	}
	
	/**
	 * Adds two areas and returns an area.
	 * @param a the first area
	 * @param b the second area
	 * @return an area equal to the sum of both areas
	 */
	public static final Area add(Area a, Area b) {
		return new Area(a.value + b.value);
	}
	/**
	 * Adds an array of areas and returns an area.
	 * @param arr the array of areas to add
	 * @return an area equal to the sum of all the areas in the array
	 */
	public static final Area add(Area[] arr) {
		double sum = 0;
		for (int i = 0; i < arr.length; i++) {
			sum += arr[i].value;
		}
		return new Area(sum);
	}
	/**
	 * Returns a scale factor of a given area.
	 * @param a the area to be scaled.
	 * @param k the factor by which to scale
	 * @return the product of the area and the scale factor
	 */
	public static final Area scale(Area a, double k) {
		return new Area(a.value * k);
	}
}
