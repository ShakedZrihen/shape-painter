"use strict";
export const __esModule = true;
import { Point } from "./point";
var Circle = /** @class */ (function() {
  function Circle(x, y, radios, canvas) {
    this.center = new Point(x, y);
    this.radius = radios;
    this.ctx = canvas;
  }
  Circle.prototype.DrawPixel = function(x, y) {
    this.ctx.fillRect(x, y, 1, 1);
  };
  Circle.prototype.draw = function() {
    console.log("printing circle");
    var x = this.radius;
    var y = 0;
    var radiusError = 1 - x;
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
  };
  return Circle;
})();
const _Circle = Circle;
export { _Circle as Circle };
