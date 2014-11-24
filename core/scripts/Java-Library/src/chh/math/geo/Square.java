package chh.math.geo;

/**
 * A square is a rhombus and a rectangle.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Square extends Rectangle {
	/** 
	 * Creates a new Square object.
	 * @param a the side of this square
	 */
	public Square(Length a) {
		super(a, a);
	}	
}
