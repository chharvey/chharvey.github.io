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

    /**
      * Selects a uniformly distributed random rational number within
      * a given interval.
      * @param low   the minimum of the interval
      * @param high  the exclusive least upper bound of the interval
      * @return      a random double-precision number within the interval [low, high).
      */
    public static double randDouble(double low, double high) {
        Random.seed = 0;
        double random = 0.0;
        for (int i = 0; i < Random.nestedInterval(0, 1000); i++) {
            random = Random.nestedInterval(low, high);
        }
        return random;
    }

    /**
      * Selects a uniformly distributed random rational number within the
      * interval [0,1).
      * @return  a random double-precision number within the interval [0.0, 1.0)
      */
    public static double randDouble() {
        return Random.randDouble(0.0, 1.0);
    }

    /**
      * Randomly returns one of two given objects, with a 50% chance of each.
      * The compile-time class of the returned object will be the least common
      * compile-time superclass of the object parameters; that is, the closest
      * related compile-time class that the objects share. If the two objects
      * do not appear to share a class, the returned object's compile-time class
      * will be {@link java.lang.Object}.
      * @see java.lang.Class
      * @see java.lang.Object
      * @param <T>   the least common compile-time superclass of the object parameters
      * @param obj1  the first object of type {@code T}
      * @param obj2  the second object of type {@code T}
      * @return      exactly one of the object parameters (either {@code obj1} or {@code obj2}), of compile-time type {@code T}
      */
    public static <T> T randObj(T obj1, T obj2) {
        /*
         * This method is a *generic method*.
         * The {@code <T>} in the signature line defines the *type parameter*.
         *
         * Unlike normal method parameters, which are given by the caller,
         * the type parameter of this method is inferred by
         * the compiler. It will automatically figure out what {@code T} is,
         * based on the given parameters.
         */
        if (Random.randBoolean()) return obj1;
        else                      return obj2;
    }

    /**
      * Returns a random object in a given ArrayList.
      * @param <T>  the type of objects in the ArrayList.
      * @param objs the ArrayList from which to select the object.
      * @return     the randomly selected object from the ArrayList.
      */
    public static <T> T randObj(ArrayList<T> objs) {
        return objs.get(Random.randInt(objs.size()));
    }

    /**
      * Takes an ArrayList of objects and returns a new ArrayList of those same objects but in random order.
      * @param <T> the least common compile-time superclass of the objects in the ArrayList.
      * @param oldlist the ArrayList of objects.
      * @return an ArrayList with the same objects, but in random order.
      */
    public static <T> ArrayList<T> shuffle(ArrayList<T> oldlist) {
        ArrayList<T> templist = new ArrayList<>(oldlist);
        ArrayList<T> newlist = new ArrayList<T>(templist.size());
        for (int i = 0; i < oldlist.size(); i++) {
            T obj = Random.randObj(templist);
            newlist.add(obj);
            templist.remove(obj);
        }
        return newlist;
    }
}
