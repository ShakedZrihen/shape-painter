/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lachmi
 */

class UndoBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.canvas.undo();
  }

  clearSelect() {}

  select() {}
}
