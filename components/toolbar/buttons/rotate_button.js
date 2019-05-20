/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class RotateBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    const setterBtn = document.getElementById("setter-btn");
    setterBtn.addEventListener("click", event =>
      this.rotate(this.paint.canvas)
    );
    setterBtn.innerHTML = "rotate";
    document.getElementById("setter-value").value = 45;
  }

  rotate(canvas) {
    canvas.update();
    const degree = document.getElementById("setter-value").value;
    if (isNaN(degree)) {
      alert("Must input a number");
      return;
    }
    const angle = (degree * Math.PI) / 180;
    Transform.rotate(canvas, canvas.calculateCenter(), angle);
    canvas.update();
    canvas.redrawStoredShapes();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
    document.getElementById("setter").style.display = "none";
    const setterBtn = document.getElementById("setter-btn");
    const new_element = setterBtn.cloneNode(true);
    setterBtn.parentNode.replaceChild(new_element, setterBtn);
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
    document.getElementById("setter").style.display = "block";
  }
}
