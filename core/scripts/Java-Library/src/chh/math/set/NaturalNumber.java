package chh.math.set;

/**
 * A natural number is an element of every inductive set.
 * More concretely, a natural number is a non-negative integer, otherwise known as a "counting number."
 * @author  Christopher H. Harvey <chrisharvey2pi@gmail.com>
 * @version 2011.06.14
 * @version 2013.08.03
 */
public class NaturalNumber extends Successor {
    /** The value (and set size) of this object. */
    private final int value;
	/** The previous natural number, if it exists. */
	private NaturalNumber predecessor;
    
    /**
     * Constructs a new Natural object corresponding to the given integer.
     * @param n a non-negative integer used to identify this object.
     */
    public Natural(int n) {
        /*
         * algorithm:
         * if (n == 0) super(); // empty set = 0
         * if (n == 1) return new Successor(super());         //=1
         * if (n == 2) return new Successor(new Natural(1));  //=2
         * if (n == 3) return new Successor(new Natural(2));  //=3
         * for any n, return new Successor(new Natural(n-1));
         */
        //Successor(new Natural(n-1));
        this.value = java.lang.Math.abs(n);
    }
	/**
     * Constructs the Natural number zero, an empty set.
     */
    public Natural() {
        this(0);
    }
	/**
	 * Constructs a new NaturalNumber object 0 (the empty set).
	 */
	public NaturalNumber() {
		super();
	}
	/**
	 * Constructs a new NaturalNumber object from the previous one.
	 * Given a natural number {@code x}, this constructor constructs the {@see Successor} of {@code x}.
	 * @param x the previous natural number
	 */
	public NaturalNumber(NaturalNumber x) {
		super(x);
		this.predecessor = x;
	}
	
    /**
     * Returns the value associated with this object.
     * @return  an int describing the value of this object.
     */
    public final int getValue() {
        return this.value;
    }

    /**
     * Adds a natural number to this one and returns the sum.
     * @param n The natural number to be added
     * @return  The sum of this and {@code n}
     */
    public Natural add(Natural n) {
        return new Natural(this.value + n.value);
    }
    /**
     * Multiplies a natural number with this one and returns the product.
     * @param n The natural number to be multiplied
     * @return  The product of this and {@code n}
     */
    public Natural multiply(Natural n) {
        return new Natural(this.value * n.value);
    }
	/**
	 * Adds two natural numbers and returns the sum.
	 * For two natural numbers x and y, the sum is defined:
	 * x + S(y) = S(x+y), and x + 0 = x , where
	 * S(y) is the successor of y and 0 is the empty set
	 * @param x the first natural number
	 * @param y the second natural number
	 * @return the sum of {@code x} and {@code y}
	 */
	public static NaturalNumber add(NaturalNumber x, NaturalNumber y) {
		boolean xEmpty = x.isEmpty();
		boolean yEmpty = y.isEmpty();
		return xEmpty ? y : (yEmpty ? x :
				new NaturalNumber(NaturalNumber.add(x, y.predecessor)));
	}
	/**
	 * Multiplies two natural numbers and returns the product.
	 * For two natural numbers x and y, the product is defined:
	 * x * S(y) = x*y + x, and x * 0 = 0 , where
	 * S(y) is the successor of y and 0 is the empty set
	 * @param x the first natural number
	 * @param y the second natural number
	 * @return the product of {@code x} and {@code y}
	 */
	public static NaturalNumber multiply(NaturalNumber x, NaturalNumber y) {
		boolean xEmpty = x.isEmpty();
		boolean yEmpty = y.isEmpty();
		NaturalNumber product = xEmpty ? new NaturalNumber() : (yEmpty ? new NaturalNumber() :
				NaturalNumber.add(NaturalNumber.multiply(x, y.predecessor), x));
		return (xEmpty || yEmpty) ? new NaturalNumber() :
				NaturalNumber.add(NaturalNumber.multiply(x, y.predecessor), x);
	}
	/**
	 * Raises one natural number to the power of the other and returns the power.
	 * For two natural numbers x and y, the power is defined:
	 * x ^ S(y) = x^y * x, and x ^ 0 = S(0) , where
	 * S(y) is the successor of y and 0 is the empty set
	 * @param x the first natural number
	 * @param y the second natural number
	 * @return {@code x} raised to the {@code y} power
	 */
	public static NaturalNumber power(NaturalNumber x, NaturalNumber y) {
		boolean xEmpty = x.isEmpty();
		boolean yEmpty = y.isEmpty();
		return xEmpty ? new NaturalNumber() : (yEmpty ? new NaturalNumber(new NaturalNumber()) :
				NaturalNumber.multiply(NaturalNumber.power(x, y.predecessor), x));
	}
}
