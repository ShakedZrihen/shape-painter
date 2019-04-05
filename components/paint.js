class Paint {
  constructor(canvas, toolbar) {
    this.canvas = canvas;
    this.toolbar = toolbar;
    this.context = null;
  }

  setContext(shape) {
    this.context = shape;
  }
}
