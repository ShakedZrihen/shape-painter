import { Point } from "./point";

export class Circle {
  center: Point;
  radius: number;
  ctx: any;

  constructor(x: number, y: number, radios: number, canvas: any) {
    this.center = new Point(x, y);
    this.radius = radios;
    this.ctx = canvas;
  }

  DrawPixel(x, y) {
    this.ctx.fillRect(x, y, 1, 1);
  }

  draw() {
    console.log("printing circle");
    let x = this.radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
      this.DrawPixel(x + this.center.x, y + this.center.y);
      this.DrawPixel(y + this.center.x, x + this.center.y);
      this.DrawPixel(-x + this.center.x, y + this.center.y);
      this.DrawPixel(-y + this.center.x, x + this.center.y);
      this.DrawPixel(-x + this.center.x, -y + this.center.y);
      this.DrawPixel(-y + this.center.x, -x + this.center.y);
      this.DrawPixel(x + this.center.x, -y + this.center.y);
      this.DrawPixel(y + this.center.x, -x + this.center.y);
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
