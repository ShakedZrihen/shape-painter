/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class RedoBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.canvas.redo();
  }

  clearSelect() {}

  select() {}
}
