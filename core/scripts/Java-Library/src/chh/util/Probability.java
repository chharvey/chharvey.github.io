package chh.util;

/**
  * A utility class containing functions involving probability.
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2011.06.16
  */
public final class Probability {
    /** Creates a new Probability object. */ private Probability() {}

    /**
      * Calculates the factorial of an integer.
      * The factorial of an integer n is equal to n * (n-1) * (n-2) * ... * 1. The integer n must be non-negative.
      * @param n             the given non-negative integer
      * @return              the factorial of {@code n}
      * @throws RuntimeException    if the argument is negative
      */
    public static int factorial(int n) throws RuntimeException {
        if (n >= 0) {
            int product;
            if (n == 0) product = 1; // 0! is defined as 1
            else        product = n * factorial(n - 1);
            return product;
        } else throw new RuntimeException("Argument " + n + " is negative.");
    }

    /**
      * Calculates the triangular number of an integer.
      * The triangular number of an integer n is equal to n + (n-1) + (n-2) + ... + 1.  The integer n must be non-negative.
      * @param n             the given non-negative integer
      * @return              the triangular number of {@code n}
      * @throws RuntimeException    if the argument is negative
      */
    public static int triangular(int n) throws RuntimeException {
        if (n >= 0) {
            int sum;
            if (n == 0) sum = 0;
            else        sum = n + triangular(n - 1);
            return sum;
        } else throw new RuntimeException("Argument " + n + " is negative.");
    }

    /**
      * Calculates the number of permutations of n objects taken r at a time.
      * @param n             the number of total objects
      * @param r             the number of objects taken at a time; must be less than {@code n}
      * @return              the number of permutations of {@code n} objects taken {@code r} at a time
      * @throws RuntimeException    if either {@code n} is negative or {@code n} is less than {@code r}
      */
    public static int permute(int n, int r) throws RuntimeException {
        int num = factorial(n);
        int den;
        try {
            den = factorial(n - r);
        } catch (Exception ex) {
            throw new RuntimeException("Argument " + n + " is less than argument " + r + ".");
        }
        return num / den;
        // The ratio will always be an integer because factorial(n) will always be an integer multiple of factorial(n-r).

    }

    /**
      * Calculates the number of combinations of n objects taken r at a time.
      * @param n the number of total objects
      * @param r the number of objects taken at a time
      * @return  the number of combinations of {@code n} objects taken {@code r} at a time
      * @throws Exception    if either {@code n} is negative, {@code n} is less than {@code r}, or {@code r} is negative
      */
    public static int combine(int n, int r) throws Exception {
        int num = permute(n, r);
        int den = factorial(r);
        return num / den;
        // The ratio will always be an integer because permute(n, r) will always be an integer multiple of factorial(r).
    }
}
