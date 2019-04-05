class Circle extends BaseShape {
  constructor(canvas) {
    super(canvas);
    this.center = null;
    this.radius = null;
  }

  init() {
    this.center = this.canvas.getMousePosition();
    this.radius = 25;
    this.isInitialize = true;
  }

  draw() {
    if (!this.isInitialize) {
      this.init();
    }
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
