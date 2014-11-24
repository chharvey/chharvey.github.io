package chh;

import chh.util.Number;

/**
 * A Color object represents any 256-bit color that can be displayed in a pixel.
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
     * Constructs a new Color object, given three primary color components.
	 * @param red  the red component of this color. Must be between 0 and 255.
	 * @param green  the green component of this color. Must be between 0 and 255.
	 * @param blue  the blue component of this color. Must be between 0 and 255.
	 */
    public Color(int red, int green, int blue) {
        this.red   = Number.bound(red, 0, 255);
		this.green = Number.bound(green, 0, 255);
		this.blue  = Number.bound(blue, 0, 255);
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
	
	/**
	 * Returns the red component.
	 * @return the red component of this color
	 */
	public final int getRed() {
		return this.red;
	}
	/**
	 * Returns the green component.
	 * @return the green component of this color
	 */
	public final int getGreen() {
		return this.green;
	}
	/**
	 * Returns the blue component.
	 * @return the blue component of this color
	 */
	public final int getBlue() {
		return this.blue;
	}
	/**
	 * Returns the Hue of this color.
	 * @return what "color" this color is
	 */
	public final int getHSV_hue() {
		return 0;// FIX THIS
	}
	/**
	 * Returns the vividness of this color. A lower saturation means the color is closer to white, a higher saturation means the color is more true to its hue.
	 * @return the HSV-space saturation
	 */
	public final double getHSV_sat() {
		return 0;// FIX THIS
	}
	/**
	 * Returns the brightness of this color. A lower value means the color is closer to black, a higher value means the color is more true to its hue. The HSV-space value ("brightness") of this color is equivalent to the brightest RGB-component, as a percentage.
	 * @return the HSV-space brightness
	 */
	public final double getHSV_val() {
		return Number.max(new double[] {this.red, this.green, this.blue}) / 255;
	}
	/**
	 * Returns the Hue of this color. Same exact result as {@code getHSV_hue()}.
	 * @return {@code this.getHSV_hue();}
	 */
	public final int getHSL_hue() {
		return this.getHSV_hue();
	}
	/**
	 * Returns the amount of "color" in the color. A lower saturation means the color is more grayer, a higher saturation means the color is more colorful.
	 * @return the HSL-space saturation
	 */
	public final double getHSL_sat() {
		return 0;// FIX THIS
	}
	/**
	 * Returns how "light" or "dark" the color is. A lower luminosity means the color is closer to black, a higher luminosity means the color is closer to white.
	 * @return the HSL-space luminosity
	 */
	public final double getHSL_lum() {
		return 0;// FIX THIS
	}
	
	/**
	 * Makes a new color that is the compliment of this color. The compliment of a color is the difference between that color and white (#fff).
	 * @return a new Color object that corresponds to this color's compliment
	 */
	public Color compliment() {
		return new Color(255 - this.red, 255 - this.green, 255 - this.blue);
	}
	/**
	 * Makes a new color that is the inverse of this color. The inverse of a color is that color with a hue rotation of 180 degrees.
	 * @return a new Color object that corresponds to this color's inverse
	 */
	public Color invert() {
		int newhue = (this.getHSV_hue() + 180 < 360) ? this.getHSV_hue() + 180 : this.getHSV_hue() - 180;
		return Color.newColorHSV(newhue, this.getHSV_sat(), this.getHSV_val());
	}
	/**
	 * Makes a new color that is a brighter version of this color by a percentage {@code p}. 100% corresponds to making it white, 0% keeps this color the same. A negative {@code p} will <em>not</em> darken this color (see {@code darken()}), however it could make it more saturated (more vivid).
	 * @param p the percentage by which to lighten this color. Must be between -1.0 and 1.0
	 * @return a new Color object that corresponds to this color brightened by a percentage {@code p}
	 */
	public Color brighten(double p) {
		return Color.newColorHSV(this.getHSV_hue(), this.getHSV_sat() - p, this.getHSV_val());
	}
	/**
	 * Makes a new color that is a darker version of this color by a percentage {@code p}. 100% corresponds to making it black, 0% keeps this color the same. A negative {@code p} will <em>not</em> lighten this color (see {@code brighten()}), however it could make it more saturated (more vivid).
	 * @param p the percentage by which to lighten this color. Must be between -1.0 and 1.0
	 * @return a new Color object that corresponds to this color darkened by a percentage {@code p}
	 */
	public Color darken(double p) {
		return Color.newColorHSV(this.getHSV_hue(), this.getHSV_sat(), this.getHSV_val() - p);
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
	
	/**
	 * Returns a new Color object, given hue, saturation, and value. The parameters correspond to HSV-space, <em>not</em> HSL-space (see {@code newColorHSL()}).
	 * @param hue the "color" of the color. Must be between 0 and 360
	 * @param saturation the vividness of the color. A lower saturation means the color is closer to white, a higher saturation means the color is more true to its hue. Must be between 0.0 and 1.0
	 * @param value the brightness of the color. A lower value means the color is closer to black, a higher value means the color is more true to its hue. Must be between 0.0 and 1.0
	 * @return a new Color object with hsv({@code hue}, {@code sat}, {@code val})
	 */
	public static Color newColorHSV(int hue, double saturation, double value) {
		hue = Number.bound(hue, 0, 360);
		saturation = Number.bound(saturation, 0.0, 1.0);
		value = Number.bound(value, 0.0, 1.0);
		return new Color();// FIX THIS
	}
	/**
	 * Returns a new Color object, given hue, saturation, and luminosity.
	 * @param hue the "color" of the color. Same as the {@code hue} in HSV-space. Must be between 0 and 360
	 * @param saturation the amount of "color" in the color. A lower saturation means the color is more grayer, a higher saturation means the color is more colorful. <em>Not</em> the same as {@code saturation} in HSV-space. Must be between 0.0 and 1.0
	 * @param luminosity how "light" or "dark" the color is. A lower luminosity means the color is closer to black, a higher luminosity means the color is closer to white. Must be between 0.0 and 1.0
	 * @return a new Color object with hsl({@code hue}, {@code sat}, {@code lum})
	 */
	public static Color newColorHSL(int hue, double saturation, double luminosity) {
		hue = Number.bound(hue, 0, 360);
		saturation = Number.bound(saturation, 0.0, 1.0);
		luminosity = Number.bound(luminosity, 0.0, 1.0);
		return new Color();// FIX THIS
	}
	
	/**
	 * Mixes (averages) two colors, with a given weight favoring the first color. If {@code w==1.0}, this method will return a new color equivalent to {@code color1}. If {@code w==0.0}, this method will return a new color equivalent to {@code color2}. {@code w==0.5} will result in an even mix.
	 * @param color1 the first color
	 * @param color2 the second color
	 * @param w the weight favoring the first color. Must be between 0.0 and 1.0
	 * @return a mix of the two given colors
	 */
	public static Color mix(Color color1, Color color2, double w) {
		int r   = (int) Math.round(Number.average(color1.red,   color2.red, w));
		int g = (int) Math.round(Number.average(color1.green, color2.green, w));
		int b  = (int) Math.round(Number.average(color1.blue,  color2.blue, w));
		return new Color(r, g, b);
	}
	/**
	 * Mixes two colors evenly.
	 * @param color1 the first color
	 * @param color2 the second color
	 * @return an even mix of the two colors
	 */
	public static Color mix(Color color1, Color color2) {
		return Color.mix(color1, color2, 0.5);
	}
}
