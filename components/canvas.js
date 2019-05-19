/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.isInitialize = false;
    this.ctx = null;
    this.isMouseDown = false;
    this.context = null;
    this.points = [];
    this.storedSapes = [];
    this.redoItems = [];
  }

  addCircleToOutput(currentShape, output) {
    const circle = {
      radius: currentShape.radius
    };
    for (let j = 0; j < output.points.length; ++j) {
      if (currentShape.center.equal(output.points[j])) {
        circle.center = j;
        break;
      }
    }
    if (!circle.center) {
      output.points.push(currentShape.center);
      circle.center = output.points.length - 1;
    }
    output.circles.push(circle);
  }

  addLineToOutput(currentShape, output) {
    let line = {};

    for (let j = 0; j < output.points.length; ++j) {
      if (currentShape.startPoint.equal(output.points[j])) {
        line.startPoint = j;
      }
      if (currentShape.endPoint.equal(output.points[j])) {
        line.endPoint = j;
      }
    }
    if (!line.startPoint) {
      output.points.push(currentShape.startPoint);
      line.startPoint = output.points.length - 1;
    }
    if (!line.endPoint) {
      output.points.push(currentShape.endPoint);
      line.endPoint = output.points.length - 1;
    }
    output.lines.push(line);
  }

  addBezierCurveToOutput(currentShape, output) {
    let bezierCurve = { controlPoints: [] };
    let indexesFound = [];
    for (let i = 0; i < currentShape.controlPoints.length; ++i) {
      for (let j = 0; j < output.points.length; ++j) {
        if (currentShape.controlPoints[i].equal(output.points[j])) {
          indexesFound.push(i);
        }
      }
    }
    for (let i = 0; i < currentShape.controlPoints.length; ++i) {
      let flag = false;
      for (let j = 0; j < indexesFound.length; ++j) {
        if (indexesFound[j] === i) {
          bezierCurve.controlPoints.push(j);
          flag = true;
        }
      }
      if (!flag) {
        output.points.push(currentShape.controlPoints[i]);
        bezierCurve.controlPoints.push(output.points.length - 1);
      }
    }
    output.bezierCurves.push(bezierCurve);
  }

  outputCanvas() {
    const output = {
      points: [],
      lines: [],
      circles: [],
      bezierCurves: []
    };
    for (let i = 0; i < this.storedSapes.length; ++i) {
      let currentShape = this.storedSapes[i];
      if (currentShape.type() === "Circle") {
        this.addCircleToOutput(currentShape, output);
      } else if (currentShape.type() === "Line") {
        this.addLineToOutput(currentShape, output);
      } else if (currentShape.type() === "Bezier curve") {
        this.addBezierCurveToOutput(currentShape, output);
      }
    }
    return output;
  }

  importLines(lines) {
    lines.forEach(line => {
      this.storedSapes.push(
        new Line(this, this.points[line.startPoint], this.points[line.endPoint])
      );
    });
  }

  importCircles(circles) {
    circles.forEach(circle => {
      this.storedSapes.push(
        new Circle(this, this.points[circle.center], circle.radius)
      );
    });
  }

  importBezierCurves(bezierCurves) {
    bezierCurves.forEach(bezierCurve => {
      let controlPoints = [];
      bezierCurve.controlPoints.forEach(point => {
        controlPoints.push(this.points[point]);
      });
      this.storedSapes.push(new BezierCurve(this, controlPoints));
    });
  }

  update() {
    this.importCanvas(this.outputCanvas());
  }

  importCanvas(canvasFile) {
    this.points = [];
    canvasFile.points.forEach(point => {
      this.points.push(new Point(point.x, point.y));
    });
    this.storedSapes = [];
    this.importLines(canvasFile.lines);
    this.importCircles(canvasFile.circles);
    this.importBezierCurves(canvasFile.bezierCurves);
    this.redrawStoredShapes();
  }

  init() {
    this.ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    this.isInitialize = true;
  }

  undo() {
    if (this.storedSapes.length > 0) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.redoItems.push(this.storedSapes.pop());
      this.redrawStoredShapes();
    }
  }

  redo() {
    if (this.redoItems.length > 0) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.storedSapes.push(this.redoItems.pop());
      this.redrawStoredShapes();
    }
  }

  setContext(shape) {
    this.context = shape;
    this.context.init();
  }

  addPoint(point) {
    for (let i = 0; i < this.points.length; i++) {
      if (point.equal(this.points[i])) {
        return i;
      }
    }
    this.points.push(point);
    return this.points.length - 1;
  }

  getMousePosition(event) {
    if (!this.isInitialize) {
      init();
    }
    const rect = this.canvas.getBoundingClientRect();
    const x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
      this.canvas.width;
    const y =
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
      this.canvas.height;
    return new Point(x, y);
  }

  redrawStoredShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.storedSapes.length === 0) {
      return;
    }
    this.storedSapes.forEach(shape => {
      shape.draw();
    });
  }

  clearListeners() {
    let el, elClone;
    (el = document.getElementById("canvas")), (elClone = el.cloneNode(true));
    el.parentNode.replaceChild(elClone, el);
    this.canvas = document.getElementById("canvas");
    this.init();
    this.redrawStoredShapes();
  }
}
