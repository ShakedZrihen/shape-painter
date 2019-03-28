var canvas = document.getElementById("canvas"); // Create new canvas
var ctx = canvas.getContext("2d"); // Set canves to 2d canvac

const canvasElement = document.getElementById("canvas");
canvasElement.addEventListener("click", event => {
  xposFirst = event.clientX;
  yposFirst = event.clientY;
  drawCircle(xposFirst, yposFirst, 25);
});

function DrawPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

function drawCircle(xCenter, yCenter, r) {
  console.log("printing circle");
  let x = r;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
    DrawPixel(x + xCenter, y + yCenter);
    DrawPixel(y + xCenter, x + yCenter);
    DrawPixel(-x + xCenter, y + yCenter);
    DrawPixel(-y + xCenter, x + yCenter);
    DrawPixel(-x + xCenter, -y + yCenter);
    DrawPixel(-y + xCenter, -x + yCenter);
    DrawPixel(x + xCenter, -y + yCenter);
    DrawPixel(y + xCenter, -x + yCenter);
    y++;

    if (radiusError < 0) {
      radiusError += 2 * y + 1;
    } else {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }
}
