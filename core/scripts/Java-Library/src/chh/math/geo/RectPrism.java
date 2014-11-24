package chh.math.geo;

/**
 * A rectangular prism is a polyhedron that has 6 faces, each of which is a 
 * rectangle and that intersect at right angles.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class RectPrism {
    /** The length of this prism. */
	private final Length length;
    /** The width of this prism. */
	private final Length width;
    /** The height of this prism. */
	private final Length height;
	
	/** The base face of this prism. */
	private final Rectangle base = new Rectangle(this.length, this.width);
	/** The front face of this prism. */
	private final Rectangle front = new Rectangle(this.length, this.height);
	/** The side face of this prism. */
	private final Rectangle side = new Rectangle(this.width, this.height);
	
	/** 
	 * Creates a new RectPrism object.
	 * @param length the length of this prism
	 * @param width the width of this prism
	 * @param height the height of this prism
	 */
	public RectPrism(Length length, Length width, Length height) {
		this.length = length;
		this.width = width;
		this.height = height;
	}
	
	/**
	 * Returns the length of this prism.
	 * @return the length of this prism
	 */
	public final Length getLength() {
		return this.length;
	}
	/**
	 * Returns the width of this prism.
	 * @return the width of this prism
	 */
	public final Length getWidth() {
		return this.width;
	}
	/**
	 * Returns the height of this prism.
	 * @return the height of this prism
	 */
	public final Length getHeight() {
		return this.height;
	}

	/**
	 * Returns the volume of this prism.
	 * @return the volume of this prism
	 */
	public final Volume getVolume() {
		return Volume.multiply(this.base.getArea(), this.height);
	}
	/**
	 * Returns the surface area of this prism.
	 * @return the surface area of this prism
	 */
	public final Area getSurfaceArea() {
		Area sum = Area.add(new Area[]{this.base.getArea(), this.front.getArea(), this.side.getArea()});
		return Area.scale(sum, 2);
	}
}
