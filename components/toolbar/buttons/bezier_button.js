class BezierBtn extends ShapeButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    console.log(this.paint);
    this.paint.canvas.setContext(new BezierCurve(this.paint.canvas));
  }
}
