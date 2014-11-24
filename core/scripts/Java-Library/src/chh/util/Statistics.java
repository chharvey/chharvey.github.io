package chh.util;

/**
  * A utility class containing functions involving statistics.
  * @author Christopher H. Harvey <chrisharvey2pi@gmail.com>
  * @version 2013.06.14
  */
public final class Statistics {
    /** Creates a new Statistics object. */ private Statistics() {}

    /**
      * Gives the z-score of an observation based on a normal distribution.
      * The z-score is calculated by {@code (x - mean) / stdev}, but it represents the "number of
      * standard deviations away from the mean." For example, given a normal distribution with
      * mean 500 and standard deviation 100, the z-score of an observation 650 would be 1.5:
      * one-and-a-half standard deviations away from the mean.
      *
      * @param x the data value of the observation
      * @param mean the mean of the normal distribution
      * @param stdev the standard deviation of the normal distribution
      * @return the z-score of the observed data value
      */
    public static double zScore (double x, double mean, double stdev) {
        return (x - mean) / stdev;
    }

    /**
      * Returns the raw value of the given z-score based on a normal distribution. In other words,
      * returns the observed data value that would have yielded the given z-score.
      * @param z the given z-score
      * @param mean the mean of the normal distribution
      * @param stdev the standard deviation of the normal distribution
      * @return the raw data value corresponding to the z-score
      */
    public static double zScoreInv (double z, double mean, double stdev) {
        return (z * stdev) + mean;
    }
}
