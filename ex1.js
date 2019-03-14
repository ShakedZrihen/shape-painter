var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function darwLine(startPoint, endPoint) {
    var dx = (endPoint.x - startPoint.x) * 1.0;
    var dy = (endPoint.y - startPoint.y) * 1.0;
    var steps = 0.0;
    if (Math.abs(dx) > Math.abs(dy))
        steps = Math.abs(dx);
    else
        steps = Math.abs(dy);
    var Xincrement = dx / (steps * 1.0);
    var Yincrement = dy / (steps * 1.0);
    var x = startPoint.x;
    var y = startPoint.y;
    for (var v = 0; v < steps; v++) {
        x = x + Xincrement;
        y = y + Yincrement;
        ctx.fillRect(x, y, 2, 2); // Set size of object
    }
}
var canvas = document.getElementById('canvas'); // Create new canvas
var ctx = canvas.getContext('2d'); // Set canves to 2d canvac
var xposFirst = null;
var yposFirst = null;
var yposSecond = null;
var xposSecond = null;
var f = 0;
var canvasElement = document.getElementById('canvas');
canvasElement.addEventListener('click', function (event) {
    if (f === 0) {
        xposFirst = event.clientX;
        yposFirst = event.clientY;
        f = 1;
    }
    else {
        xposSecond = event.clientX;
        yposSecond = event.clientY;
        console.log("Drawing line between: ", xposFirst, yposFirst, xposSecond, yposSecond);
        darwLine(new Point(xposFirst, yposFirst), new Point(xposSecond, yposSecond));
        xposFirst = null;
        yposFirst = null;
        yposSecond = null;
        xposSecond = null;
        f = 0;
    }
});
