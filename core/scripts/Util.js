/**
  * A set of utility methods. Util cannot cannot be instantiated and contain only
  * static fields and methods, commonly used.
  */
var Util = {}

Util.PHI = (1 + Math.sqrt(5)) / 2;
Util.PSI = (1 - Math.sqrt(5)) / 2;
Util.PHI_INV = 1 / Util.PHI;
Util.TAU = 2 * Math.PI;


/**
  * Returns the number closest to the given parameter within the closed interval [lower, upper].
  * If the parameter is in the interval, the method returns the number. If the parameter is outside,
  * the method returns the closest bound (either upper or lower).
  * This method is NON-DESTRUCTIVE: it does not change the value of the given parameter.
  * @param `x` the number to be tested
  * @param `lower` the lower bound, inclusive
  * @param `upper` the upper bound, inclusive. Must be >= `lower`.
  * @return        the closest number to `x` within the interval [lower, upper]
  */
Util.bound = function bound(x, lower, upper) {
  if      (x < lower) return lower;
  else if (x > upper) return upper;
  else                return x;
  // return Math.max(lower, Math.min(x, upper)) or Math.min(upper, Math.max(x, lower));
}

/**
  * Averages two numbers, with a weight favoring the first number.
  * For example, `Util.average(10, 20, 0.7)` will return 13, while
  * `Util.average(20, 10, 0.7)` will return 17 (the same result as `Util.average(10, 20, 0.3)`).
  * @param `a` the first number, to be weighted
  * @param `b` the second number
  * @param `w` optional number between 0 and 1 defaults to 0.5, the weight that favors `a`
  * @return    the weighted average of `a` and `b`
  */
Util.average = function average(a, b, w) {
  w = (typeof w === 'number') ? w : 0.5;
  return (a * w) + (b * (1 - w));
}

/**
  * Returns the geometric mean of two numbers.
  * @param `a` the first number
  * @param `b` the second number
  * @return    the square root of the product of `a` and `b`
  */
Util.gMean = function gMean(a, b) {
  return Math.sqrt(a * b);
}

// /**
//  * Returns the arithmetic mean of an array of doubles.
//  * @param nums   the array of doubles, with undetermined length
//  * @return          the arithmetic mean of all the doubles in the array
//  */
// public static double aMean(double[] nums) {
//     double sum = 0.0;
//     int n = nums.length;
//     for (int i = 0; i < n; i++) {
//         sum += nums[i];
//     }
//     return sum / n;
// }
//
// /**
//   * Returns the geometric mean of an array of doubles.
//   * Mathematical note: if any entry in the given array is equal to 0, then this method will return {@code 0.0}.
//   * @param doubles   the array of doubles, with undetermined length
//   * @return          the geometric mean of all the doubles in the array
//   */
// public static double gMean(double[] doubles) {
//     double product = 1.0;
//     int n = doubles.length;
//     for (int i = 0; i < n; i++) {
//         product *= doubles[i];
//     }
//     return Math.pow(product, 1.0 / n);
// }

/**
  * Returns whether a given integer is prime.
  * An integer is mathematically prime if and only if its only positive integer divisors are itself and 1.
  * @param `integer` the given integer
  * @return          `true` if `integer` is prime
  */
Util.isPrime = function isPrime(integer) {
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
  * Returns all the integer factors of the given integer.
  * @param `n` a positive integer to be factored
  * @return    an array containing integers, which are all factors of `n`, in increasing order
  */
Util.factors = function factors(n, prime) {
  var factors = [];
  for (var i = 2; i <= n; i++) if (n % i === 0) factors.push(i);
  return factors;
}

/**
  * Returns the prime factorization of the given integer.
  * The prime factorization of a number is the set of prime numbers whose cumulative product equals
  * that number. Prime factors may be repeated. The prime factorization of a prime number is that number.
  * E.g., 60 == 2 * 2 * 3 * 5; 37 == 37;
  * @param `n` a positive integer to be factored
  * @return    an array containing integers, which are the prime factors of `n`, in increasing order
  */
Util.factorize = function factorize(n) {
  var factors = [];
  var i = 2;
  while (i <= n) {
    if (n % i === 0) {
      factors.push(i);
      n /= i;
      i = 2;
    } else i++;
  }
  return factors;
}

/**
  * Gives the greatest common factor of two numbers. This is a recursive function.
  * @param `a` the first positive integer
  * @param `b` the second positive integer
  * @return    the greatest integer factor that `a` and `b` have in common
  */
Util.gcf = function gcf(a, b) {
  if (a === 0 || b === 0) return Math.max(a,b);
  else {
    var hi = Math.max(a,b);
    var lo = Math.min(a,b);
    var mod =  hi % lo;
    return Util.gcf(lo, mod);
  }
}

/**
  * Gives the least common multiple of two numbers.
  * @param `a` the first positive integer
  * @param `b` the second positive integer
  * @return    the least integer multiple that `a` and `b` have in common
  */
Util.lcm = function lcm(a, b) {
  return (a * b) / Util.gcf(a, b);
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
Util.factorial = function factorial(integer, recursive) {
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
Util.doubleFactorial = function doubleFactorial(integer, recursive) {
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
Util.triangular = function triangular(integer, recursive) {
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
Util.fibonacci = function fibonacci(n, recursive) {
  if (recursive) {
    if (n === 0 || n === 1) return 1;
    else if (n > 1)         return (Util.fibonacci(n-1, true) + Util.fibonacci(n-2, true));
    else                    return NaN;
  }
  n++;
  return (1 / Math.sqrt(5)) * (Math.pow(Util.PHI, n) - Math.pow(Util.PSI, n));
}

/**
  * Calculates the number of permutations of n objects taken r at a time.
  * @param `n` the number of total objects
  * @param `r` the number of objects taken at a time; must be <= `n`
  * @return    the number of permutations of `n` objects taken `r` at a time
  */
Util.permute = function permute(n, r) {
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
  * @param `n` the number of total objects
  * @param `r` the number of objects taken at a time; must be <= `n`
  * @return    the number of combinations of `n` objects taken `r` at a time
  */
Util.combine = function combine(n, r) {
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

// /** A static variable used as a seed in the random generators. */
// private static long seed = 0;
//
// /**
//   * Selects a uniformly distributed random rational number within
//   * a given interval.
//   * @param low   the minimum of the interval
//   * @param high  the exclusive least upper bound of the interval
//   * @return      a random double-precision number within the interval [low, high).
//   */
// private static double nestedInterval(double low, double high) {
//     double term;
//     if (low == high) term = low;
//     else {
//         // if seed is 0, reset it
//         if (Random.seed == 0) Random.seed = System.currentTimeMillis();
//         Random.seed *= 3; // for cases in which the long is too short
//         /*
//          * the following switch statement
//          * tests whether the rightmost bit is even or odd.
//          * If even, it chooses the left half-interval;
//          * if odd, it chooses the right half-interval.
//          */
//         switch ((int) (Random.seed & 1)) {
//             case 0:
//                 Random.seed = Random.seed >> 1;
//                 term = Random.nestedInterval(low, Number.aMean(low, high));
//                 break;
//             case 1:
//                 Random.seed = Random.seed >> 1;
//                 term = Random.nestedInterval(Number.aMean(low, high), high);
//                 break;
//             default:
//                 term = Math.E; // just an irrelevant identifiable number for debugging purposes
//                 break;
//         }
//     }
//     return term;
// }

/**
  * Selects a uniformly distributed random non-negative decimal less than the given parameter.
  * @param `number` a positive decimal, the exclusive least upper bound of the interval
  * @return         a randomly selected decimal within [0, number)
  */
Util.randTo = function randTo(number) {
  return Math.random() * number;
}

/**
  * Selects a uniformly distributed random non-negative integer less than the given parameter.
  * @param integer a positive integer, the exclusive least upper bound of the interval
  * @return        a randomly selected integer within [0, integer)
  */
Util.randToInt = function randToInt(integer) {
  return Math.floor(Util.randTo(integer));
}

/**
  * Selects a uniformly distributed random non-negative decimal between the two given parameters.
  * @param `low`  a positive decimal, the minimum of the interval
  * @param `high` a positive decimal, the exclusive least upper bound of the interval
  * @return       a randomly selected nonnegative decimal within [low, high)
  */
Util.randBetween = function randBetween(low, high) {
  return Util.randTo(high - low) + low;
}

/**
  * Selects a Boolean value with a probability `p` of being `true`.
  * @param `p` optional number within [0.0, 1.0] (default 0.5); the probability that this method will return `true`
  * @return    `true` if a randomly selected number between 0 and 1 is less than `p`
  */
Util.randBoolean = function randBoolean(p) {
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
  * @param `child`  the subclass, which is a special case of the parent class
  * @param `parent` the super class
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
Util.extend = function extend(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.__super__ = parent.prototype; // Chrome uses this to get the right `typeof`
  child.prototype.constructor = child;
}
