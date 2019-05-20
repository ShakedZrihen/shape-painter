/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Transform {
  static scale(canvas, ratio) {
    const center = canvas.calculateCenter();
    Transform.move(canvas, center, new Point(0, 0));
    for (let i = 0; i < canvas.storedSapes.length; ++i) {
      let currentShape = canvas.storedSapes[i];
      if (currentShape.type() === "Circle") {
        currentShape.radius = currentShape.radius * ratio;
      }
    }
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * ratio;
      point.y = point.y * ratio;
    }
    Transform.move(canvas, new Point(0, 0), center);
    canvas.update();
  }
  static rotate(canvas, centerPoint, angle) {
    const tempCenter = centerPoint;
    Transform.move(canvas, centerPoint, new Point(0, 0));
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      const tempx = point.x;
      const tempy = point.y;
      point.x = tempx * Math.cos(angle) - tempy * Math.sin(angle);
      point.y = tempx * Math.sin(angle) + tempy * Math.cos(angle);
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);
    canvas.update();
  }
  static move(canvas, firstPoint, secondPoint) {
    const aX = secondPoint.x - firstPoint.x;
    const aY = secondPoint.y - firstPoint.y;
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + aX;
      point.y = point.y + aY;
    }
    canvas.update();
  }

  static flipX(canvas) {
    canvas.update();
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.y = point.y * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    canvas.update();
  }

  static flipY(canvas) {
    canvas.update();
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    canvas.update();
  }
}
