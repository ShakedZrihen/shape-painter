class LineBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.canvas.setContext(new Line(this.paint.canvas));
  }
}
