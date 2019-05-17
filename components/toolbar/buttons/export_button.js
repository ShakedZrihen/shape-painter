/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class ExportBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
    this.output = {
      points: [],
      lines: [],
      circles: [],
      bezierCurves: []
    };
  }

  addCircleToOutput(currentShape) {
    const circle = {
      radius: currentShape.radius
    };
    for (let j = 0; j < this.output.points.length; ++j) {
      if (currentShape.center.equal(this.output.points[j])) {
        circle.center = j;
        break;
      }
    }
    if (!circle.center) {
      this.output.points.push(currentShape.center);
      circle.center = this.output.points.length - 1;
    }
    this.output.circles.push(circle);
  }

  addLineToOutput(currentShape) {
    let line = {};

    for (let j = 0; j < this.output.points.length; ++j) {
      if (currentShape.startPoint.equal(this.output.points[j])) {
        line.startPoint = j;
      }
      if (currentShape.endPoint.equal(this.output.points[j])) {
        line.endPoint = j;
      }
    }
    if (!line.startPoint) {
      this.output.points.push(currentShape.startPoint);
      line.startPoint = this.output.points.length - 1;
    }
    if (!line.endPoint) {
      this.output.points.push(currentShape.endPoint);
      line.endPoint = this.output.points.length - 1;
    }
    this.output.lines.push(line);
  }

  addBezierCurveToOutput(currentShape) {
    let bezierCurve = { controlPoints: [] };
    let indexesFound = [];
    for (let i = 0; i < currentShape.controlPoints.length; ++i) {
      for (let j = 0; j < this.output.points.length; ++j) {
        if (currentShape.controlPoints[i].equal(this.output.points[j])) {
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
        this.output.points.push(currentShape.controlPoints[i]);
        bezierCurve.controlPoints.push(this.output.points.length - 1);
      }
    }
    this.output.bezierCurves.push(bezierCurve);
  }

  export() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:json/application;charset=utf-8," + JSON.stringify(this.output)
    );
    element.setAttribute("download", "output.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  handleButtonPress(event) {
    for (let i = 0; i < this.paint.canvas.storedSapes.length; ++i) {
      let currentShape = this.paint.canvas.storedSapes[i];
      if (currentShape.type() === "Circle") {
        this.addCircleToOutput(currentShape);
      } else if (currentShape.type() === "Line") {
        this.addLineToOutput(currentShape);
      } else if (currentShape.type() === "Bezier curve") {
        this.addBezierCurveToOutput(currentShape);
      }
    }
    this.export();
  }

  clearSelect() {}
  select() {}
}
