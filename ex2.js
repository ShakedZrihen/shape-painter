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

function clearSelected() {
  lineBtn.style.backgroundColor = "";
  circleBtn.style.backgroundColor = "";
}

// canvasElement.addEventListener("mousedown", event => {
//   const circle = new Circle(mycanvas);
//   mycanvas.setContext(circle);
//   mycanvas.context.draw();
// });
