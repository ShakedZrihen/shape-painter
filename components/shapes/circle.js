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

  drawCircle() {
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

  draw(event) {
    if (!event) {
      this.drawCircle();
    } else {
      const point = this.canvas.getMousePosition(event);
      this.radius =
        this.center.x - point.x < 0
          ? -1 * (this.center.x - point.x)
          : this.center.x - point.x;
      this.drawCircle();
    }
  }
}
