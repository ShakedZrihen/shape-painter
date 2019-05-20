/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class ScaleBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    const setterBtn = document.getElementById("setter-btn");
    setterBtn.addEventListener("click", event =>
      this.rescale(this.paint.canvas)
    );
    setterBtn.innerHTML = "scale";
    document.getElementById("setter-value").value = 1.0;
  }

  rescale(canvas) {
    canvas.update();
    const scaleRasio = document.getElementById("setter-value").value;
    if (isNaN(scaleRasio) || scaleRasio <= 0) {
      alert("Must input a positive number");
      return;
    }
    for (let i = 0; i < canvas.storedSapes.length; ++i) {
      let currentShape = canvas.storedSapes[i];
      if (currentShape.type() === "Circle") {
        currentShape.radius = currentShape.radius * scaleRasio;
      }
    }
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * scaleRasio;
      point.y = point.y * scaleRasio;
    }
    canvas.redrawStoredShapes();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
    document.getElementById("setter").style.display = "none";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
    document.getElementById("setter").style.display = "block";
  }
}
