/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

class Transform {
  static scale(canvas, ratio) {
    const center = canvas.calculateCenter();
    Transform.move(canvas.points, center, new Point(0, 0));
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
    Transform.move(canvas.points, new Point(0, 0), center);
  }
  static rotate(points, centerPoint, angle) {
    Transform.move(points, centerPoint, new Point(0, 0));
    for (let i = 0; i < points.length; ++i) {
      const point = points[i];
      const tempx = point.x;
      const tempy = point.y;
      point.x = tempx * Math.cos(angle) - tempy * Math.sin(angle);
      point.y = tempx * Math.sin(angle) + tempy * Math.cos(angle);
    }
    Transform.move(points, new Point(0, 0), centerPoint);
  }
  static move(points, firstPoint, secondPoint) {
    const aX = secondPoint.x - firstPoint.x;
    const aY = secondPoint.y - firstPoint.y;
    for (let i = 0; i < points.length; ++i) {
      const point = points[i];
      point.x = point.x + aX;
      point.y = point.y + aY;
    }
  }
}
