/**
  * Constructs a general discrete probability distribution with a given set of outcomes and their
  * probabilities.
  * @param `domain` a number array: the set of possible outcomes in this distribution. each entry
  *                 in this array must be unique.
  * @param `range`  a number array: the set of probabilities of the elements in the domain. the sum
  *                 of the elements in this array must equal 1.
  */
function DiscreteDistribution(domain, range) {
}

/**
  * Constructs a general discrete probability distribution with a given set of outcomes and their
  * probabilities.
  * @param `fn` an array of two-valued number arrays: each inner array is of the form `[x,y]`,
  *             where `x` is a possible outcome value and `y` is the probability of that outcome.
  *             each entry of `fn` must have a unique `x`, and the sum of the values of each `y`
  *             must be a total of 1.
  */
function DiscreteDistribution(fn) {
}

/**
  * Constructs a general discrete probability distribution with a given number of outcomes.
  * Assumes the domain is the closed interval [0, outcomes - 1].
  * For example, if `outcomes = 6`, then the inputs consist of {0, 1, 2, 3, 4, 5}.
  * @param `outcomes` the number of total outcomes; defaults to 1
  */
function DiscreteDistribution(outcomes) {
  this.outcomes = (outcomes > 0) ? outcomes : 1;
}

/**
  * Returns the output of the probability density function of this distribution.
  * This value is the probability of obtaining any one outcome.
  * @param `x` the input of the PDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
DiscreteDistribution.prototype.evalPDF = function evalPDF(x) {
  if (x === -Infinity || x === Infinity) return 0;
}

/**
  * Returns the cumulative distribution function of this distribution.
  * The CDF is the integral of the PDF. It can be statistically interpreted as the probability
  * of obtaining an outcome less than or equal to the input.
  * @param `x` the input of the CDF to evaluate
  * @return    the y-value of the PDF evaluated at `x`
  */
DiscreteDistribution.prototype.evalCDF = function evalCDF(x) {
  if      (x === -Infinity) return 0;
  else if (x ===  Infinity) return 1;
  var sum = 0;
  for (var i = 0; i <= x; i++) {
    sum += this.evalPDF(i);
  }
  return sum;
}

/**
  * Returns the area under the PDF from `min` to `max`.
  * The area under the PDF can be interpreted as the probability of obtaining a datum
  * within the closed interval `[min, max]`.
  * @param `min` the lower bound of the input
  * @param `max` the upper bound of the input
  * @return      this.evalCDF(max) - this.evalCDF(min)
  */
DiscreteDistribution.prototype.area = function area(min, max) {
  return this.evalCDF(max) - this.evalCDF(min);
}

/** Returns the mean (statistical average) of this distribution. */
DiscreteDistribution.prototype.getMean = function getMean() {
  var sum = 0;
  for (var i = 0; i < this.outcomes; i++) {
    sum += i * this.evalPDF(i);
  }
  return sum;
}

/** Returns the standard deviation (statistical spread) of this distribution. */
DiscreteDistribution.prototype.getStdev = function getStdev() {
  var sum = 0;
  for (var i = 0; i < this.outcomes; i++) {
    sum += Math.pow(i - this.getMean(), 2) * this.evalPDF(i);
  }
  return sum;
}
