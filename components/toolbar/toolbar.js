/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class Toolbar {
  constructor() {
    this.buttons = [];
  }

  addButton(button) {
    button.init();
    this.buttons.push(button);
  }

  clearSelected() {
    this.buttons.forEach(button => {
      button.clearSelect();
    });
  }
}
