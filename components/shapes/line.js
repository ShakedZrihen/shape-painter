class Line extends BaseShape {
  constructor(canvas, startPoint = null, endPoint = null) {
    super(canvas);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  handleMouseDown(event) {
    this.canvas.redrawStoredShapes();

    if (!this.startPoint) {
      this.startPoint = this.canvas.getMousePosition(event);
      this.isDown = true;
      console.log(this.startPoint);
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
    if (!this.endPoint) {
      return;
    }
    this.canvas.storedSapes.push(
      new Line(this.canvas, this.startPoint, this.endPoint)
    );
    this.isDown = false;
    this.startPoint = null;
    this.endPoint = null;
    this.canvas.redrawStoredShapes();
  }

  drawLine() {
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
      this.drawPixel(x, y);
    }
  }

  draw(event) {
    if (!event) {
      this.drawLine();
    } else {
      this.endPoint = this.canvas.getMousePosition(event);
      this.drawLine();
    }
  }
}
