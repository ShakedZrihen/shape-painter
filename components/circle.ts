import { Point } from "./point";
import BaseShape from "./base_shape";

export default class Circle extends BaseShape {
  center: Point;
  radius: number;
  constructor(x: number, y: number, radios: number, canvas: any) {
    super(canvas);
    this.center = new Point(x, y);
    this.radius = radios;
  }

  draw() {
    console.log("printing circle")
    let x = this.radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
      this.drawPixel(x + this.center.x, y + this.center.y);
      this.drawPixel(y + this.center.x, x + this.center.y);
      this.drawPixel(-x + this.center.x, y + this.center.y);
      this.drawPixel(-y + this.center.x, x + this.center.y);
      this.drawPixel(-x + this.center.x, -y + this.center.y);
      this.drawPixel(-y + this.center.x, -x + this.center.y);
      this.drawPixel(x + this.center.x, -y + this.center.y);
      this.drawPixel(y + this.center.x, -x + this.center.y);
      y++;

      if (radiusError < 0) {
        radiusError += 2 * y + 1;
      } else {
        x--;
        radiusError += 2 * (y - x + 1);
      }
    }
  }
}
