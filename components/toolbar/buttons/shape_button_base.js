class ShapeButtonBase extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  init() {
    this.btn = document.getElementById(this.name);
    this.btn.addEventListener("click", event => {
      this.paint.toolbar.select(this.btn);
      this.handleButtonPress(event);
    });
  }
}
