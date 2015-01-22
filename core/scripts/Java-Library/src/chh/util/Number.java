package chh.util;
import java.util.ArrayList;

/**
  * A utility class containing calculations on natural numbers (non-negative integers).
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2013.06.14
  */
public final class Number {
    /**
     * Returns the arithmetic mean of an array of doubles.
     * @param nums   the array of doubles, with undetermined length
     * @return          the arithmetic mean of all the doubles in the array
     */
    public static double aMean(double[] nums) {
        double sum = 0.0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
        }
        return sum / n;
    }

    /**
      * Returns the geometric mean of an array of doubles.
      * Mathematical note: if any entry in the given array is equal to 0, then this method will return {@code 0.0}.
      * @param doubles   the array of doubles, with undetermined length
      * @return          the geometric mean of all the doubles in the array
      */
    public static double gMean(double[] doubles) {
        double product = 1.0;
        int n = doubles.length;
        for (int i = 0; i < n; i++) {
            product *= doubles[i];
        }
        return Math.pow(product, 1.0 / n);
    }
}