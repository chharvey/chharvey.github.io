package chh.util;

import java.util.ArrayList;

/**
  * A class with methods for generating random numbers.
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2010.04.16
  */
public final class Random {
    /** Creates a new Random object. */ private Random() {}

    /** A static variable used as a seed in the random generators. */
    private static long seed = 0;

    /**
      * Selects a uniformly distributed random rational number within
      * a given interval.
      * @param low   the minimum of the interval
      * @param high  the exclusive least upper bound of the interval
      * @return      a random double-precision number within the interval [low, high).
      */
    private static double nestedInterval(double low, double high) {
        double term;
        if (low == high) term = low;
        else {
            // if seed is 0, reset it
            if (Random.seed == 0) Random.seed = System.currentTimeMillis();
            Random.seed *= 3; // for cases in which the long is too short
            /*
             * the following switch statement
             * tests whether the rightmost bit is even or odd.
             * If even, it chooses the left half-interval;
             * if odd, it chooses the right half-interval.
             */
            switch ((int) (Random.seed & 1)) {
                case 0:
                    Random.seed = Random.seed >> 1;
                    term = Random.nestedInterval(low, Number.aMean(low, high));
                    break;
                case 1:
                    Random.seed = Random.seed >> 1;
                    term = Random.nestedInterval(Number.aMean(low, high), high);
                    break;
                default:
                    term = Math.E; // just an irrelevant identifiable number for debugging purposes
                    break;
            }
        }
        return term;
    }
}
