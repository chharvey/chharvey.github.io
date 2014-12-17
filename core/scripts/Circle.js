function Circle(r) {
  this.radius = r;
  this.circumference = 2 * Math.PI * r;
}


Circle.prototype.getRadius() {
  return this.radius;
}

Circle.prototype.getCircumference() {
  return 2 * Math.PI * this.radius;
}
