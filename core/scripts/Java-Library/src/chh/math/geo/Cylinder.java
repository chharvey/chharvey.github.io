package chh.math.geo;

/**
 * A cylinder is a prism whose base is a circle.
 * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2014.03.27
 */
public class Cylinder {
    /** The radius of this cylinder. */
	private final Length radius;
    /** The height of this cylinder. */
	private final Length height;
	
	/** The base face of this cylinder. */
	private final Circle base = new Circle(this.radius);
	/** The side face of this cylinder. */
	private final Rectangle side = new Rectangle(this.base.getCircumference(), this.height);
	
	/** 
	 * Creates a new Cylinder object.
	 * @param radius the radius of this cylinder
	 * @param height the height of this cylinder
	 */
	public Cylinder(Length radius, Length height) {
		this.radius = radius;
		this.height = height;
	}
	
	/**
	 * Returns the radius of this cylinder.
	 * @return the radius of this cylinder
	 */
	public final Length getRadius() {
		return this.radius;
	}
	/**
	 * Returns the height of this cylinder.
	 * @return the height of this cylinder
	 */
	public final Length getHeight() {
		return this.height;
	}

	/**
	 * Returns the volume of this cylinder.
	 * @return the volume of this cylinder
	 */
	public final Volume getVolume() {
		return Volume.multiply(this.base.getArea(), this.height);
	}
	/**
	 * Returns the surface area of this cylinder.
	 * @return the surface area of this cylinder
	 */
	public final Area getSurfaceArea() {
		return Area.add(new Area[]{this.base.getArea(), this.base.getArea(), this.side.getArea()});
	}
}
