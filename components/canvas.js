/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.isInitialize = false;
    this.ctx = null;
    this.isMouseDown = false;
    this.context = null;
    this.points = [];
    this.storedSapes = [];
    this.redoItems = [];
  }

  init() {
    this.ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    this.isInitialize = true;
  }

  undo() {
    if (this.storedSapes.length > 0) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.redoItems.push(this.storedSapes.pop());
      this.redrawStoredShapes();
    }
  }

  redo() {
    if (this.redoItems.length > 0) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.storedSapes.push(this.redoItems.pop());
      this.redrawStoredShapes();
    }
  }

  setContext(shape) {
    this.context = shape;
    this.context.init();
  }

  getMousePosition(event) {
    if (!this.isInitialize) {
      init();
    }
    const rect = this.canvas.getBoundingClientRect();
    const x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
      this.canvas.width;
    const y =
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
      this.canvas.height;
    const mousePoint = new Point(x, y);
    this.points.push(mousePoint);
    return this.points[this.points.length - 1];
  }

  redrawStoredShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.storedSapes.length === 0) {
      return;
    }
    this.storedSapes.forEach(shape => {
      shape.draw();
    });
  }

  clearListeners() {
    let el, elClone;
    (el = document.getElementById("canvas")), (elClone = el.cloneNode(true));
    el.parentNode.replaceChild(elClone, el);
    this.canvas = document.getElementById("canvas");
    this.init();
    this.redrawStoredShapes();
  }
}
