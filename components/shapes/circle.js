/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Circle extends BaseShape {
  constructor(canvas, x = null, y = null, radius = null) {
    super(canvas);
    this.center = null;
    if (x && y) {
      this.center = new Point(x, y);
    }
    this.radius = radius;
    this.isDown = false;
  }

  handleMouseDown(event) {
    if (!this.center) {
      this.center = this.canvas.getMousePosition(event);
      this.isDown = true;
    }
  }

  hansleMouseMove(event) {
    if (!this.isDown) {
      return;
    }
    this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.canvas.redrawStoredShapes();
    this.draw(event);
  }

  handleMouseUp(event) {
    if (!this.radius) {
      return;
    }
    this.canvas.storedSapes.push(
      new Circle(this.canvas, this.center.x, this.center.y, this.radius)
    );
    this.isDown = false;
    this.center = null;
    this.radius = null;
    this.canvas.redrawStoredShapes();
  }

  plotCirclePoint(x, y) {
    this.drawPixel(x + this.center.x, y + this.center.y);
    this.drawPixel(y + this.center.x, x + this.center.y);
    this.drawPixel(-x + this.center.x, y + this.center.y);
    this.drawPixel(-y + this.center.x, x + this.center.y);
    this.drawPixel(-x + this.center.x, -y + this.center.y);
    this.drawPixel(-y + this.center.x, -x + this.center.y);
    this.drawPixel(x + this.center.x, -y + this.center.y);
    this.drawPixel(y + this.center.x, -x + this.center.y);
  }

  draw(event) {
    if (event) {
      const point = this.canvas.getMousePosition(event);
      this.radius =
        this.center.x - point.x < 0
          ? -1 * (this.center.x - point.x)
          : this.center.x - point.x;
    }
    let x = 0;
    let y = this.radius;
    let radiusError = 3 - 2 * this.radius; // p

    while (x < y) {
      this.plotCirclePoint(x, y);
      if (radiusError < 0) {
        radiusError += 4 * x + 6;
      } else {
        radiusError += 4 * (x - y) + 10;
        y--;
      }
      x++;
    }
    if (x == y) {
      this.plotCirclePoint(x, y);
    }
  }
}
