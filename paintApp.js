var canvasElement = document.getElementById("canvas"); // Create new canvas

const mycanvas = new Canvas(canvasElement);
mycanvas.init();

const circleBtn = document.getElementById("circleBtn");
circleBtn.addEventListener("click", event => {
  clearSelected();
  circleBtn.style.backgroundColor = "#282828";
  mycanvas.setContext(new Circle(mycanvas));
});

const lineBtn = document.getElementById("lineBtn");
lineBtn.addEventListener("click", event => {
  clearSelected();
  lineBtn.style.backgroundColor = "#282828";
  mycanvas.setContext(new Line(mycanvas));
});

const bezierBtn = document.getElementById("bezierBtn");
bezierBtn.addEventListener("click", event => {
  clearSelected();
  bezierBtn.style.backgroundColor = "#282828";
  mycanvas.setContext(new BezierCurve(mycanvas));
});

const undoBtn = document.getElementById("undoBtn");
undoBtn.addEventListener("click", event => {
  mycanvas.undo();
});

const redoBtn = document.getElementById("redoBtn");
redoBtn.addEventListener("click", event => {
  mycanvas.redo();
});

function clearSelected() {
  lineBtn.style.backgroundColor = "";
  bezierBtn.style.backgroundColor = "";
  circleBtn.style.backgroundColor = "";
}
