class Point {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  multiply(k) {
    return new Point(this.x * k, this.y * k);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
