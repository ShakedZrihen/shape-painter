import { Point } from "./point";

function getRandomColor() {
  // Get random color
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function darwLine(startPoint: Point, endPoint: Point) {
  const dx = (endPoint.x - startPoint.x) * 1.0;
  const dy = (endPoint.y - startPoint.y) * 1.0;
  let steps = 0.0;
  if (Math.abs(dx) > Math.abs(dy)) steps = Math.abs(dx);
  else steps = Math.abs(dy);

  const Xincrement = dx / (steps * 1.0);
  const Yincrement = dy / (steps * 1.0);
  let x = startPoint.x;
  let y = startPoint.y;
  for (let v = 0; v < steps; v++) {
    x = x + Xincrement;
    y = y + Yincrement;
    ctx.fillRect(x, y, 2, 2); // Set size of object
  }
}
const canvas: any = document.getElementById("canvas"); // Create new canvas
const ctx = canvas.getContext("2d"); // Set canves to 2d canvac

let xposFirst, yposFirst, xposSecond, yposSecond;
xposFirst = yposFirst = xposSecond = yposSecond = null;
let f = 0;

const canvasElement = document.getElementById("canvas");
canvasElement.addEventListener("click", event => {
  if (f === 0) {
    xposFirst = event.clientX;
    yposFirst = event.clientY;
    f = 1;
  } else {
    xposSecond = event.clientX;
    yposSecond = event.clientY;
    console.log(
      "Drawing line between: ",
      xposFirst,
      yposFirst,
      xposSecond,
      yposSecond
    );
    darwLine(
      new Point(xposFirst, yposFirst),
      new Point(xposSecond, yposSecond)
    );
    xposFirst = null;
    yposFirst = null;
    yposSecond = null;
    xposSecond = null;
    f = 0;
  }
});
