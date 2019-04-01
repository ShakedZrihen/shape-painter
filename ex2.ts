import Circle  from "./components/circle";

var canvas: any = document.getElementById("canvas"); // Create new canvas
var ctx = canvas.getContext("2d"); // Set canves to 2d canvac

const canvasElement: any = document.getElementById("canvas");
canvasElement.addEventListener("click", event => {
  const xposFirst: number = event.clientX;
  const yposFirst:number = event.clientY;
  const circle = new Circle(xposFirst, yposFirst, 25, ctx);
  circle.draw();
});




