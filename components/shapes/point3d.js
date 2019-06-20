/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class Point3D {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  multiply(k) {
    return new Point(this.x * k, this.y * k, this.z * k);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y, this.z + point.z);
  }

  equal(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z;
  }
}
