/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class MoveBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
    this.isMouseDown = false;
    this.firstPoint = null;
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    this.paint.canvas.canvas.addEventListener("mousedown", event =>
      this.handleMouseDown(event)
    );
    this.paint.canvas.canvas.addEventListener("mousemove", event =>
      this.handleMouseMove(event)
    );
    this.paint.canvas.canvas.addEventListener("mouseup", event =>
      this.handleMouseUp(event)
    );
  }

  handleMouseDown(event) {
    //console.log(this.paint.canvas.getMousePosition(event));
    this.firstPoint = this.paint.canvas.getMousePosition(event);
  }

  handleMouseMove(event) {
    if (this.firstPoint) {
      const sPoint = this.paint.canvas.getMousePosition(event);
      const aX = sPoint.x - this.firstPoint.x;
      const aY = sPoint.y - this.firstPoint.y;
      this.paint.canvas.update();
      for (let i = 0; i < this.paint.canvas.points.length; ++i) {
        const point = this.paint.canvas.points[i];
        point.x = point.x + aX;
        point.y = point.y + aY;
      }
      this.paint.canvas.redrawStoredShapes();
      this.firstPoint = sPoint;
    }
  }

  handleMouseUp(event) {
    this.firstPoint = null;
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
