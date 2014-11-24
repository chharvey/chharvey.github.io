package chh.util;
import java.util.ArrayList;

/**
  * A utility class containing calculations on natural numbers (non-negative integers).
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2013.06.14
  */
public final class Number {
    /** Creates a new Number object. */ private Number() {}

    /**
      * Returns the number closest to the given parameter within a specified inclusive interval. If the parameter is in the interval, the method returns the number. If the parameter is outside the interval, the method returns the closest bound (either upper or lower). For example, {@code Number.bound(3.14, 0, 1)} will return {@code 1.0}. This method does not change the value of the given parameter.
      * @param x the number to be tested
      * @param lower the lower bound, inclusive
      * @param upper the upper bound, inclusive. Must be >= {@code lower}.
      * @return the closest number to {@code x} within the interval {@code [lower, upper]}
      */
    public static double bound(double x, double lower, double upper) {
        double returned = x;
        if (lower <= upper) {
            if      (x < lower) returned = lower;
            else if (x > upper) returned = upper;
        }
        return returned;
    }

    /**
      * Performs {@code Number.bound()} on {@code int}s rather than {@code double}s.
      * @param x the number to be tested
      * @param lower the lower bound, inclusive
      * @param upper the upper bound, inclusive. Must be >= {@code lower}.
      * @return the closest number to {@code x} within the interval {@code [lower, upper]}
      */
    public static int bound(int x, int lower, int upper) {
        return (int) Number.bound((double) x, lower, upper);
    }

    /**
      * Performs {@code Number.bound()} on each entry of an array, using the same interval for comparison.
      * @param nums The array of numbers to be tested
      * @param lower the lower bound, inclusive
      * @param upper the upper bound, inclusive. Must be >= {@code lower}.
      * @return an array of numbers containing {@code Number.bound(nums[i])}
      */
    public static double[] bound(double[] nums, double lower, double upper) {
        double[] output = new double[nums.length];
        for (int i = 0; i < nums.length; i++) {
            output[i] = Number.bound(nums[i], lower, upper);
        }
        return output;
    }

    /**
      * Gives the maximum value in an array of doubles.
      * @param nums the array to check. Must be non-empty and length != 0.
      * @return the maximum double in the array
      */
    public static double max(double[] nums) {
        if (nums.length == 0) return 0;
        else {
            double max = nums[0];
            for (int i = 0; i < nums.length; i++) {
                if (max < nums[i]) max = nums[i];
            }
            return max;
        }
    }

    /**
      * Gives the minimum value in an array of doubles.
      * @param nums the array to check. Must be non-empty and length != 0.
      * @return the minimum double in the array
      */
    public static double min(double[] nums) {
        for (int i = 0; i < nums.length; i++) {
            nums[i] = -nums[i];
        }
        return -(Number.max(nums));
    }

    /**
      * Returns whether a given integer is prime.
      * An integer is mathematically prime if and only if its only integer divisors are itself and 1.
      * @param n the given integer
      * @return {@code true} if n is prime
      */
    public static boolean isPrime(int n) {
        boolean returned = true;
        if (n <= 1) returned = false;
        else {
            for (int i = 2; i < n; i++) {
                if (n % i != 0) returned = returned && true;
                else            returned = returned && false;
            }
        }
        return returned;
    }

    /**
      * Determines whether a given integer n is a power of an integer r.
      * @param n the given integer to test
      * @param r the given root
      * @return {@code true} if n is a power of r
      */
    public static boolean isPowerOf(int n, int r) {
        boolean returned;
        if (n == 1)          returned = true;
        else if (n % r == 0) returned = isPowerOf(n / r, r);  // if n%r==0 then n/r will be an integer.
        else                 returned = false;
        return returned;
    }

    /**
      * Returns an ArrayList of all of the prime factors of the given number.
      * @param n the given number to be factored
      * @return an ArrayList containing Integer objects, which are prime factors of {@code n}, in increasing order
      */
    public static ArrayList<Integer> factor(int n) {
        ArrayList<Integer> array = new ArrayList<>();
        int i = 2;
        while (i <= n) {
            if (n % i == 0) {
                array.add(i);
                n /= i;
                i = 2;
            } else i++;
        }
        return array;
    }

    /**
      * Gives the greatest common factor of two numbers.
      * @param n the first integer
      * @param r the second integer
      * @return the greatest integer factor that {@code n} and {@code r} have in common
      */
    public static int gcf(int n, int r) {
        n = Math.abs(n);
        r = Math.abs(r);
        if (n == r) return n;
        else if (n > r) {
            if (r == 0) return n;
            else return gcf(r, n % r);
        } else {
            if (n == 0) return r;
            else return gcf(n, r % n);
        }
        ArrayList<Integer> array_n = factor(n);
        ArrayList<Integer> array_r = factor(r);
        int gcf = 0;
        for (int i = 0; i < array_n.size(); i++) {
            if (array_r.contains(array_n.get(i))) gcf = array_n.get(i);
        }
        return gcf;
    }

    /**
      * Gives the least common multiple of two numbers. DRAFT. Returns 0 for now.
      * @param n the first integer
      * @param r the second integer
      * @return the least multiple that {@code n} and {@code r} have in common
      */
    public static int lcm(int n, int r) {
        return 0;
    }

    /**
      * Averages two numbers, with a given weight favoring the first number. For example, {@code Number.average(10, 20, 0.7)} will return {@code 13}, while {@code Number.average(20, 10, 0.7)} will return {@code 17}.
      * @param a The first number, to be weighted by {@code w}
      * @param b the second number
      * @param w the weight that favors {@code a}. Must be between 0.0 and 1.0
      * @return the weighted average of {@code a} and {@code b}
      */
    public static double average(double a, double b, double w) {
        w = Number.bound(w, 0.0, 1.0);
        return (a * w) + (b * (1.0-w));
    }

    /**
      * Averages two numbers with even weight. Same result as {@code Number.aMean(a, b)}.
      * @param a the first number
      * @param b the second number
      * @return the average of {@code a} and {@code b} with even weight
      */
    public static double average(double a, double b) {
        return Number.average(a, b, 0.5);
    }

    /**
     * Returns the arithmetic mean of two doubles.
     * The arithmetic mean of {@code a} and {@code b} is exactly half of the sum of {@code a} and {@code b}.
     * @param a the first double
     * @param b the second double
     * @return  the arithmetic mean of {@code a} and {@code b}
     */
    public static double aMean(double a, double b) {
        return (a + b) / 2.0;
    }

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
      * Returns the geometric mean of two doubles.
      * The geometric mean of 'a' and 'b' is the exact square root of the product of 'a' and 'b'.
      * @param a the first double
      * @param b the second double
      * @return  the geometric mean of a and b
      */
    public static double gMean(double a, double b) {
        return Math.sqrt(a * b);
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
    /**
      * Returns the logarithm base {@code b} of {@code x}.
      * @param x the argument of the logarithm
      * @param b the base of the logarithm
      * @return  {@code log_{b} (x)}
      */
    public static double log(double x, double b) {
        return Math.log(x) / Math.log(b);
    }
    /**
      * Returns the logarithm base 2 of {@code x}.
      * @param x the argument of the logarithm
      * @return  {@code log_{2} (x)}
      */
    public static double log2(double x) {
        return Number.log(x, 2.0);
    }
    /**
      * Returns the logarithm base 10 of {@code x}.
      * @param x the argument of the logarithm
      * @return  {@code log_{10} (x)}
      */
    public static double log10(double x) {
        return Number.log(x, 10.0);
    }
    /**
      * Returns the natural logarithm (base <i>e</i>) of {@code x}.
      * @param x the argument of the logarithm
      * @return  {@code ln (x)}
      */
    public static double ln(double x) {
        return Number.log(x, Math.E);
    }
}
