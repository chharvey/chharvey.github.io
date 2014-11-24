function Length(x) {
  /** @private */ this.value = x;
}

function add(length1, length2) {
  return new Length(length1 + length2);
}
function sum(lengtharr) {
  var sum = 0;
  for (var i = 0; i < lengtharr.length; i++) {
    sum += lengtharr[i].value;
  }
  return new Length(sum);
}
function scale(length, k) {
  return new Length(length.value * k)
}
function multiply(length1, length2) {
  return new Area(length1.value * length2.value);
}

function Circle(r) {
  /** @private */ this.radius = r;
}

Circle.prototype.getRadius() {
  return this.radius;
}

Circle.prototype.getCircumference() {
  return 2 * Math.PI * this.radius;
}
