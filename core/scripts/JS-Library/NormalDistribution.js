/**
  * Creates a normal (Gaussian) distribution with a given mean and standard deviation.
  * @param `mean` the statistical average of all the data; defaults to 0
  * @param `stdev` the variation in all the data; defaults to 1
  */
function NormalDistribution(mean, stdev) {
  this.mean  = (typeof mean  === 'number') ? mean  : 0;
  this.stdev = (typeof stdev === 'number') ? stdev : 1;
}

/**
  * Returns the output of the probability density function of this distribution.
  * In a continuous distribution, this value is not statistically relevant.
  * @param `x` the input of the PDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
NormalDistribution.prototype.evalPDF = function (x) {
  var t = (x - this.mean) / this.stdev;
  return (1 / (this.stdev * Math.sqrt(Util.TAU))) * Math.exp(-t*t / 2);
}

/**
  * Returns an *approximation* of the cumulative distribution function of this distribution.
  * The CDF is the integral of the PDF. It can be statistically interpreted as the probability
  * of obtaining a datum less than or equal to the input.
  * IMPORTANT: This function is an *approximation*. For large values of |x| (larger than ±10),
  * this function will return an incorrect value; thus specify the `accuracy` parameter.
  * The `accuracy` parameter is 100 by default. Specify a larger value for increased accuracy.
  * @param `x`        the input of the CDF to evaluate
  * @param `accuracy` the number of terms in the series in the calculation of this function; defaults to 100
  * @return           the y-value of the PDF evaluated at `x`
  */
NormalDistribution.prototype.evalCDF = function (x, accuracy) {
  accuracy = (accuracy === undefined) ? 100 : accuracy;
  function series(y) {
    var sum = 0;
    for (var i = 0; i < accuracy; i++) {
      var a = 2*i+1;
      sum += Math.pow(y, a)/Util.doubleFactorial(a);
    }
    return sum;
  }
  return 0.5 + (this.evalPDF(x) * series(x));
}

/**
  * Returns the area under the PDF from `min` to `max`.
  * The area under the PDF can be interpreted as the probability of obtaining a datum
  * within the closed interval `[min, max]`.
  * The Empirical Rule states the following approximations (where m = mean and s = stdev):
  * - the probability of obtaining a value within [-1s + m, 1s + m] or [-1, 1]: about 68.27%
  * - the probability of obtaining a value within [-2s + m, 2s + m] or [-2, 2]: about 95.45%
  * - the probability of obtaining a value within [-3s + m, 3s + m] or [-3, 3]: about 99.73%
  * @param `min`      the lower bound of the input
  * @param `max`      the upper bound of the input
  * @param `accuracy` the number of terms in the series in the calculation of this function; defaults to 100
  * @return this.evalCDF(max) - this.evalCDF(min)
  */
NormalDistribution.prototype.area = function (min, max, accuracy) {
  return this.evalCDF(max, accuracy) - this.evalCDF(min, accuracy);
}

/** Returns the mean (statistical average) of this distribution. */
NormalDistribution.prototype.getMean = function () { return this.mean; }

/** Returns the standard deviation (statistical spread) of this distribution. */
NormalDistribution.prototype.getStdev = function () { return this.stdev; }

/**
  * Selects a Gaussian-distributed random variable of this distribution.
  * Note that the range of this function's output is technically (-infinity, infinity), however
  * the following probabilities hold (where m = mean and s = stdev):
  * - the output will be within (-1s + m, 1s + m) or (-1, 1): about 68.27%
  * - the output will be within (-2s + m, 2s + m) or (-2, 2): about 95.45%
  * - the output will be within (-3s + m, 3s + m) or (-3, 3): about 99.73%
  * This method uses
  * [the polar form of the Box-Muller Transformation](http://en.wikipedia.org/wiki/Box-Muller_transform).
  * @return a normally-distributed decimal
  */
NormalDistribution.prototype.rand = function () {
  var x, y;
  var s = 0;
  do {
    x = Util.randBetween(-1, 1); // randon number in (-1, 1)
    y = Util.randBetween(-1, 1); // randon number in (-1, 1)
    s = x*x + y*y;
  } while (s <= 0 || 1 <= s); // s must be in the open interval (0,1).
  /*
  m = sqrt( ln( 1/s^2 ) / s )
    = sqrt( -ln(s^2)    / s )
    = sqrt( -2ln(s)     / s )
  */
  var m = Math.sqrt(-2 * Math.log(s) / s);
  x *= m;
  y *= m;
  var stnormal = (Util.randBoolean()) ? x : y; // returns either x or y, chosen randomly
  return stnormal * this.stdev + this.mean; // transforms from standard normal to adjusted mean and stdev
}

/**
  * Tests this normal distribution. Selects a number of normally-distributed random outputs and counts
  * the number of times the output is in the closed interval `[min, max]`. If true, it counts as
  * a 'success'; if false, it is a 'failure'.
  * This method prints the number of successes and number of failures, and also prints the last output.
  * @param times the number of outputs to test; maximum of 10000
  * @param min   the minimum of the interval of successes
  * @param max   the maximum of the interval of successes
  */
NormalDistribution.prototype.test = function (times, min, max) {
  var successes = 0;
  var  failures = 0;
  for (var i = 0; i < times && times <= 10000; i++) {
    var x = this.rand();
    if      (min <= x && x <= max) successes++;
    else if (x < min  ||  max < x)  failures++;
  }
  console.log('successes: ' + successes);
  console.log('failures:  ' +  failures);
  console.log('random sample: ' + x);
}
