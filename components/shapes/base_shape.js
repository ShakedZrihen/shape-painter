class BaseShape {
  constructor(canvas) {
    this.canvas = canvas;
    this.color = null;
    this.isInitialize = false;
  }

  setCanvas(canvas) {
    if (typeof canvas === typeof Canvas) {
      this.canvas = canvas;
    } else throw TypeError("canvas must be from type Canvas");
  }

  setColor(color) {
    this.color = color;
  }

  drawPixel(x, y) {
    if (canvas) {
      this.canvas.ctx.fillRect(x, y, 1, 1);
    }
  }

  draw() {
    throw new Error("You should implement draw function");
  }
}
