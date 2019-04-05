class line extends BaseShape {
  constructor(startPoint, endPoint, canvas) {
    super(canvas);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  draw() {
    const dx = (this.endPoint.x - this.startPoint.x) * 1.0;
    const dy = (this.endPoint.y - this.startPoint.y) * 1.0;
    let steps = 0.0;
    if (Math.abs(dx) > Math.abs(dy)) steps = Math.abs(dx);
    else steps = Math.abs(dy);

    const Xincrement = dx / (steps * 1.0);
    const Yincrement = dy / (steps * 1.0);
    let x = this.startPoint.x;
    let y = this.startPoint.y;
    for (let v = 0; v < steps; v++) {
      x = x + Xincrement;
      y = y + Yincrement;
      this.ctx.fillRect(x, y, 2, 2); // Set size of object
    }
  }
}
