package chh;

import chh.util.Number;

/**
 * A Color object
 * @author  <a href="mailto:chrisharvey2pi@gmail.com">Christopher H. Harvey</a>
 * @version 2013.07.17
 */
public class Color {
	/** The red component of this color. */
	private final int red;
	/** The green component of this color. */
	private final int green;
	/** The blue component of this color. */
	private final int blue;

    /**
     *



	 */
    public Color(int red, int green, int blue) {



    }
	/**
	 * Constructs a new Color, default to black.
	 */
	public Color() {
		this(0,0,0);
	}
	/**
	 * Creates a new color given a hexadecimal code in {@code #RRGGBB} format.
	 * @param hex a six-digit hexadecimal number preceded by a hash symbol ({@code #}), as a String
	 */
	public Color(String hex) {
		this();// FIX THIS
	}



//	/**
//	 *
//	 * @param p
//	 * @return
//	 */
//	public Color saturate(double p) {
//		return new Color(); // FIX THIS
//	}
//	/**
//	 *
//	 * @param p
//	 * @return
//	 */
//	public Color desaturate(double p) {
//		return new Color(); // FIX THIS
//	}


}
