/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class MoveBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    const REPLACE_WITH_MOVE_X = 50;
    const REPLACE_WITH_MOVE_Y = 0;
    for (let i = 0; i < this.paint.canvas.points.length; ++i) {
      const point = this.paint.canvas.points[i];
      point.x = point.x + REPLACE_WITH_MOVE_X;
      point.y = point.y + REPLACE_WITH_MOVE_Y;
    }
    this.paint.canvas.redrawStoredShapes();
  }

  clearSelect() {}
  select() {}
}
