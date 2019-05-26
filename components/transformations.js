/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Transform {
  static scale(canvas, ratioX, ratioY = null, updateCanvas = true) {
    const center = canvas.calculateCenter();
    ratioY = ratioY === null ? ratioX : ratioY;
    Transform.move(canvas, center, new Point(0, 0), false);
    for (let i = 0; i < canvas.storedSapes.length; ++i) {
      let currentShape = canvas.storedSapes[i];
      if (currentShape.type() === "Circle") {
        currentShape.radius = currentShape.radius * ratioX;
      }
    }
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * ratioX;
      point.y = point.y * ratioY;
    }
    Transform.move(canvas, new Point(0, 0), center, false);
    if (updateCanvas) {
      canvas.update();
    }
  }

  static rotate(canvas, centerPoint, angle, updateCanvas = true) {
    const tempCenter = centerPoint;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    Transform.move(canvas, centerPoint, new Point(0, 0), false);
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      const tempx = point.x;
      const tempy = point.y;
      point.x = tempx * cosA - tempy * sinA;
      point.y = tempx * sinA + tempy * cosA;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter, false);
    if (updateCanvas) {
      canvas.update();
    }
  }
  static move(canvas, firstPoint, secondPoint, updateCanvas = true) {
    const aX = secondPoint.x - firstPoint.x;
    const aY = secondPoint.y - firstPoint.y;
    Transform.moveBy(canvas, aX, aY, updateCanvas);
  }

  static moveBy(canvas, x, y, updateCanvas = true) {
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + x;
      point.y = point.y + y;
    }
    if (updateCanvas) {
      canvas.update();
    }
  }

  static shearing(canvas, firstPoint, secondPoint, updateCanvas = true) {
    const dx = -1 * (secondPoint.x - firstPoint.x);
    const max = calculateMaxAndMinPointsInArray(canvas.points)[MAX];
    const a = 0.006 * dx;
    Transform.move(canvas, max, new Point(0, 0));
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + a * point.y;
    }
    Transform.move(canvas, new Point(0, 0), max);
    if (updateCanvas) {
      canvas.update();
    }
  }

  static flipX(canvas, updateCanvas = true) {
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.y = point.y * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    if (updateCanvas) {
      canvas.update();
    }
  }

  static flipY(canvas, updateCanvas = true) {
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    if (updateCanvas) {
      canvas.update();
    }
  }

  static fit(canvas, updateCanvas = false) {
    let maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    Transform.moveBy(
      canvas,
      -1 * maxMinPoints[MIN].x,
      -1 * maxMinPoints[MIN].y
    );
    const dx =
      maxMinPoints[MAX].x === canvas.canvas.width
        ? canvas.canvas.width
        : maxMinPoints[MAX].x - canvas.canvas.width;
    const dy =
      maxMinPoints[MAX].y === canvas.canvas.height
        ? canvas.canvas.height
        : maxMinPoints[MAX].y - canvas.canvas.height;
    const maxmax = Math.abs(
      Math.max(canvas.canvas.width / dx, canvas.canvas.height / dy)
    );
    Transform.scale(canvas, maxmax * 0.4, maxmax * 0.4, updateCanvas);
    maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    Transform.moveBy(
      canvas,
      -0.8 * maxMinPoints[MIN].x,
      -0.8 * maxMinPoints[MIN].y
    );
    if (updateCanvas) {
      canvas.update();
    }
  }
}
