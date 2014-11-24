var Util = {}

Util.PHI = (1 + Math.sqrt(5)) / 2;
Util.PSI = (1 - Math.sqrt(5)) / 2;
Util.PHI_INV = 1 / Util.PHI;
Util.TAU = 2 * Math.PI;


/**
  * Returns the number closest to the given parameter within the closed interval [lower, upper].
  * If the parameter is in the interval, the method returns the number. If the parameter is outside,
  * the method returns the closest bound (either upper or lower).
  * If lower >= upper, then this method will return NaN.
  * This method is NON-DESTRUCTIVE: it does not change the value of the given parameter.
  * @param x the number to be tested
  * @param lower the lower bound, inclusive
  * @param upper the upper bound, inclusive. Must be >= `lower`.
  * @return      the closest number to `x` within the interval [lower, upper]
  */
Util.bound = function (x, lower, upper) {
  if      (x < lower) return lower;
  else if (x > upper) return upper;
  else                return x;
}

/**
  * Returns whether a given integer is prime.
  * An integer is mathematically prime if and only if its only positive integer divisors are itself and 1.
  * @param integer the given integer
  * @return        `true` if `integer` is prime
  */
Util.isPrime = function (integer) {
  var returned = true;
  if (integer <= 1) returned = false;
  else {
    for (var i = 2; i <= Math.sqrt(integer); i++) {
      if (integer % i == 0) returned = returned && false;
    }
  }
  return returned;
}

/**
  * Computes the factorial of a given non-negative integer.
  * The factorial of a positive integer `n`, written in mathematical notation as `n!`, is the product
  * of all the positive integers less than or equal to `n`.
  * The factorial of 0 is defined to be 1. The factorial of a negative number is undefined
  * (in that case this method will return NaN).
  * The recursive form of this function defines `n! { return n * (n-1)! }`
  * @param `integer`   a non-negative integer
  * @param `recursive` optional: whether to use the recursive form of this function
  * @return            the product of all the positive integers less than or equal to the parameter
  */
Util.factorial = function (integer, recursive) {
  if (recursive) {
    var product = 1;
    if (integer > 0) product = integer * Util.factorial(integer - 1, true);
    else if (integer === 0) product = 1;
    else product = NaN;
    return product;
  }
  var product = 1;
  if (integer > 0) {
    for (var i = integer; i > 0; i--) {
      product *= i;
    }
  }
  else if (integer === 0) product = 1;
  else product = NaN;
  return product;
}

/**
  * Computes the double-factorial of a given non-negative integer.
  * The double-factorial of `n`, written in mathematical notation as `n!!`, is *not* the factorial
  * of `n!`, but rather the product of every *other* positive integer leading up to `n`.
  * For example, `7!! == 7 * 5 * 3 * 1` and `6!! == 6 * 4 * 2`
  * The double-factorial of 0 is defined to be 1. The double-factorial of a negative number is
  * undefined (in that case this method will return NaN).
  * The recursive form of this function defines `n!! { return n! / (n-1)!! }`
  * @param `integer`   a positive integer
  * @param `recursive` optional: whether to use the recursive form of this function
  * @return            the product of every other positive integer less than or equal to the parameter
  */
Util.doubleFactorial = function (integer, recursive) {
  if (recursive) {
    var product = 1;
    if (integer > 0) product = Util.factorial(integer) / Util.doubleFactorial(integer - 1, true);
    else if (integer === 0) product = 1;
    else product = NaN;
    return product;
  }
  var product = 1;
  if (integer > 0) {
    for (var i = integer; i > 0; i--) {
      product *= i;
      i--; // again
    }
  }
  else if (integer === 0) product = 1;
  else product = NaN;
  return product;
}

/**
  * Computes the triangular number of the given non-negative integer parameter.
  * The triangular of a non-negative integer is the sum of all the non-negative integers less than
  * or equal to that integer. The triangular of a negative number is undefined (this method will return NaN).
  * @param `integer`   a positive integer
  * @param `recursive` optional: whether to use the recursive form of this function
  * @return            the sum of all the non-negative integers less than or equal to the parameter
  */
Util.triangular = function (integer, recursive) {
  if (recursive) {
    var sum = 0;
    if (integer > 0) sum = integer + Util.triangular(integer - 1, true);
    else if (integer == 0) sum += 0;
    else sum = NaN;
    return sum;
  }
  var sum = 0;
  if (integer > 0) {
    for (var i = 1; i <= integer; i++) {
      sum += i;
    }
  }
  else if (integer == 0) sum += 0;
  else sum = NaN;
  return sum;
}

/**
  * Returns the `n`th term of the Fibonacci sequence, where `n` is a parameter.
  * A Fibonacci sequence is constructed with the first two terms specified, and each subsequent
  * term in the sequence is the sum of the previous two terms. The "smallest" Fibonacci sequence
  * starts with 1, 1, 2, 3, 5, 8, ... and this function returns a term in that sequence.
  * @param `n`         the position of the term returned. must be an integer
  * @param `recursive` optional: whether to use the recursive form of this function
  * @return            the `n`th term of the sequence
  */
Util.fibonacci = function (n, recursive) {
  if (recursive) {
    if (n === 0 || n === 1) return 1;
    else if (n > 1)         return (Util.fibonacci(n-1, true) + Util.fibonacci(n-2, true));
    else return NaN;
  }
  n++;
  return (1 / Math.sqrt(5)) * (Math.pow(Util.PHI, n) - Math.pow(Util.PSI, n));
}

/**
  * Calculates the number of permutations of n objects taken r at a time.
  * @param n the number of total objects
  * @param r the number of objects taken at a time; must be <= `n`
  * @return  the number of permutations of `n` objects taken `r` at a time
  */
Util.permute = function (n, r) {
  var numerator = 0;
  var denominator = 1;
  if (1 <= r && r <= n) {
    numerator   = Util.factorial(n);
    denominator = Util.factorial(n - r);
  }
  return numerator / denominator;
  // The ratio will always be an integer because factorial(n) will always be an integer multiple of factorial(n-r).
}

/**
  * Calculates the number of combinations of n objects taken r at a time.
  * @param n the number of total objects
  * @param r the number of objects taken at a time; must be <= `n`
  * @return  the number of combinations of `n` objects taken `r` at a time
  */
Util.combine = function (n, r) {
    var numerator   = Util.permute(n, r);
    var denominator = Util.factorial(r);
    return num / den;
    // The ratio will always be an integer because permute(n, r) will always be an integer multiple of factorial(r).
}

/**
  * Selects a uniformly distributed random decimal within the interval [0, 1).
  * @return Math.random();
  */
Util.rand = Math.random; // = function () { return Math.random(); }

/**
  * Selects a uniformly distributed random non-negative decimal less than the given parameter.
  * @param `number` a positive decimal, the exclusive least upper bound of the interval
  * @return       a randomly selected decimal within [0, number)
  */
Util.randTo = function (number) {
  return Math.random() * number;
}

/**
  * Selects a uniformly distributed random non-negative integer less than the given parameter.
  * @param integer a positive integer, the exclusive least upper bound of the interval
  * @return        a randomly selected integer within [0, integer)
  */
Util.randToInt = function (integer) {
  return Math.floor(Util.randTo(integer));
}

/**
  * Selects a uniformly distributed random non-negative decimal between the two given parameters.
  * @param `low`    a positive decimal, the minimum of the interval
  * @param `high`   a positive decimal, the exclusive least upper bound of the interval
  * @return         a randomly selected nonnegative decimal within [low, high)
  */
Util.randBetween = function (low, high) {
  return Util.randTo(high - low) + low;
}

/**
  * Selects a Boolean value with a probability `p` of being `true`.
  * `p` must be within the interval (0.0, 1.0) to have any
  * random significance.
  * If `p <= 0` then this method will return `false`,
  * and if `p >= 1` then this method will return `true`.
  * If `p` is not given, it defaults to 0.5 (even probability).
  * @param `p` the probability that this method will return `true`
  * @return    `true` if a randomly selected number between 0 and 1 is less than `p`
  */
Util.randBoolean = function (p) {
  p = (p === undefined) ? 0.5 : p;
  return (Math.random() < p);
}

function uniformTest(times, min, max) {
  var successes = 0;
  var  failures = 0;
  for (var i = 0; i < times && times <= 10000; i++) {
    var x = Util.rand();
    if      (min <= x && x <= max) successes++;
    else if (x < min  ||  max < x)  failures++;
  }
  console.log('successes: ' + successes);
  console.log('failures:  ' +  failures);
  console.log('random sample: ' + x);
}

function factorialtest(times) {
  for (i = 0; i <= times; i++) {
    console.log(i + '! = ' + Util.factorial(i) + ' or ' + Util.factorialRecursive(i));
  }
}

function doublefactorialtest(times) {
  for (i = 0; i <= times; i++) {
    console.log(i + '!! = ' + Util.doubleFactorial(i) + ' or ' + Util.doubleFactorialRecursive(i));
  }
}

/**
  * Extends a class from a parent class. Call this method immediately after the child constructor.
  * @param child  the subclass, which is a special case of the parent class
  * @param parent the super class
  */
// Util.extend = (function () {
//   var F = function () {};
//   return function (Child, Parent) {
//     F.prototype = Parent.prototype;
//     Child.prototype = new F();
//     Child.__super__ = Parent.prototype;
//     Child.prototype.constructor = Child;
//   };
// }());
Util.extend = function (child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.__super__ = parent.prototype; // Chrome uses this to get the right `typeof`
  child.prototype.constructor = child;
}
