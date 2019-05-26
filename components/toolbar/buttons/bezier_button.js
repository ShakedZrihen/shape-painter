/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class BezierBtn extends ShapeButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    const numberOfLines = 100;
    this.paint.canvas.setContext(
      new BezierCurve(this.paint.canvas, [], numberOfLines)
    );
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
