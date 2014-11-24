/**
  * Creates a discrete uniform (constant) distribution with a given number of outcomes.
  * @extends          DiscreteDistribution
  * @param `outcomes` the number of total outcomes; defaults to 1
  */
function DiscreteUniformDistribution(outcomes) {
  DiscreteDistribution.call(this, outcomes);
}
Util.extend(DiscreteUniformDistribution, DiscreteDistribution);

/**
  * Returns the output of the probability density function of this distribution.
  * This value is the probability of obtaining any one outcome.
  * @param `x` the input of the PDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
DiscreteUniformDistribution.prototype.evalPDF = function (x) {
  return (0 <= x && x < this.outcomes) ? 1/this.outcomes : 0;
}

/**
  * Returns the cumulative distribution function of this distribution.
  * The CDF is the integral of the PDF. It can be statistically interpreted as the probability
  * of obtaining an outcome less than or equal to the input.
  * @param `x` the input of the CDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
DiscreteUniformDistribution.prototype.evalCDF = function (x) {
  if (x < 0)                            return 0;
  else if (0 <= x && x < this.outcomes) return (1 / this.outcomes) * (x + 1);
  else if (this.outcomes <= x)          return 1;
  else return NaN;
}

/**
  * Returns the area under the PDF from `min` to `max`.
  * The area under the PDF can be interpreted as the probability of obtaining a datum
  * within the closed interval `[min, max]`.
  * @param `min` the lower bound of the input
  * @param `max` the upper bound of the input
  * @return this.evalCDF(max) - this.evalCDF(min)
  */
DiscreteUniformDistribution.prototype.area = function (min, max) {
  return this.evalCDF(max) - this.evalCDF(min);
}

/** Returns the mean (statistical average) of this distribution. */
DiscreteUniformDistribution.prototype.getMean = function () {
  return (this.outcomes - 1) / 2; // (1 / this.outcomes) * Util.triangular(this.outcomes - 1);
}

/** Returns the standard deviation (statistical spread) of this distribution. */
DiscreteUniformDistribution.prototype.getStdev = function () {
  var sum = 0;
  for (var i = 0; i < this.outcomes; i++) {
    sum += Math.pow(i - this.getMean(), 2);
  }
  return this.evalPDF(i) * sum;
}
