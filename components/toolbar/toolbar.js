/*
 *   Created by Ligal Levy & Shaked Zrihen
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
      button.btn.style.backgroundColor = "";
    });
  }

  select(button) {
    this.clearSelected();
    button.style.backgroundColor = "#282828";
  }
}
