/**
  * Creates a continuous uniform (constant) distribution over a given domain.
  * @param `low`  the minimum of the domain [low, high]; defatults to 0
  * @param `high` the maximum of the domain [low, high]; defatults to 1
  */
function ContinuousUniformDistribution(low, high) {
  this.low  = (typeof low  === 'number') ? low  : 0;
  this.high = (typeof high === 'number') ? high : 1;
}

/**
  * Returns the output of the probability density function of this distribution.
  * In a continuous distribution, this value is not statistically relevant.
  * @param `x` the input of the PDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
ContinuousUniformDistribution.prototype.evalPDF = function (x) {
  return (this.low <= x && x <= this.high) ? 1 / (this.high - this.low) : 0;
}

/**
  * Returns the cumulative distribution function of this distribution.
  * The CDF is the integral of the PDF. It can be statistically interpreted as the probability
  * of obtaining an outcome less than or equal to the input.
  * @param `x` the input of the CDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
ContinuousUniformDistribution.prototype.evalCDF = function (x) {
  if (x < this.low)                         return 0;
  else if (this.low <= x && x <= this.high) return (x - this.low) * this.evalPDF(x);
  else if (this.high < x)                   return 1;
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
ContinuousUniformDistribution.prototype.area = function (min, max) {
  return this.evalCDF(max) - this.evalCDF(min);
}

/** Returns the mean (statistical average) of this distribution. */
ContinuousUniformDistribution.prototype.getMean = function () {
  return (this.low + this.high) / 2;
}

/** Returns the standard deviation (statistical spread) of this distribution. */
ContinuousUniformDistribution.prototype.getStdev = function () {
  return Math.pow(this.high - this.low, 2) / 12;
}
