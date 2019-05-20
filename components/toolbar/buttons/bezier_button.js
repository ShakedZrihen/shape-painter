/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class BezierBtn extends ShapeButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    const numberOfLines = this.getNumberOfLines();
    this.paint.canvas.setContext(
      new BezierCurve(this.paint.canvas, [], numberOfLines)
    );
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  getNumberOfLines() {
    const numberOfLines = document.getElementById("number-of-lines").value;
    if (numberOfLines) {
      return numberOfLines;
    }
    return 100; // Return default number of lines
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
    const setBtn = document.getElementById("set-number-of-lines-btn");
    setBtn.addEventListener("click", event => {
      this.handleButtonPress(event);
    });
  }
}
