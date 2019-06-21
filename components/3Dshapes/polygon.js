class Polygon {
  constructor(
    canvas,
    points,
    lineColor = "#000000",
    fillColor = null,
    visible = true
  ) {
    this.canvas = canvas;
    if (points.length !== 3) {
      throw new Error("polygon has exactly 3 points");
    }
    this.points = points;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.visible = visible;
    this.normal = this.getNormal();
  }

  getNormal() {
    const a = this.points[0].subtract(this.points[1]);
    const b = this.points[0].subtract(this.points[2]);
    const normal = a.crossProduct(b);
    return normal;
  }

  initPrespective() {
    const matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    const center = this.canvas.centerPoint;
    const prespectivePoints = [];

    this.points.forEach(point => {
      const s = 1 / (1 + point.z / center.z);
      matrix[0][0] = s;
      matrix[1][1] = s;

      const vec = [[point.x - center.x, point.y - center.y, point.z, 1]];

      const res = multiplyMatrix(vec, matrix);

      prespectivePoints.push(
        new Point(res[0][0] + center.x, res[0][1] + center.y)
      );
    });
    return prespectivePoints;
  }

  getVisibility(projectionPoints) {
    const tmp1 = new Point3D(
      this.points[0].x,
      this.points[0].y,
      this.points[0].z
    );
    const tmp2 = new Point3D(
      this.points[1].x,
      this.points[1].y,
      this.points[1].z
    );
    const tmp3 = new Point3D(
      this.points[2].x,
      this.points[2].y,
      this.points[2].z
    );

    const tempPoints = [tmp1, tmp2, tmp3];
    this.points[0].x = projectionPoints[0].x;
    this.points[0].y = projectionPoints[0].y;

    this.points[1].x = projectionPoints[1].x;
    this.points[1].y = projectionPoints[1].y;

    this.points[2].x = projectionPoints[2].x;
    this.points[2].y = projectionPoints[2].y;

    const normal = this.getNormal();
    const visibility = normal.multiplyPoint(new Point3D(0, 0, 1)) < 0;
    this.points = tempPoints;
    return visibility;
  }

  getMaxZ() {
    let max = this.points[0].z;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].z > max) max = this.points[i].z;
    }
    return max;
  }

  drawPolygon(firstPoint, secondPoint, thirdPoint) {
    this.canvas.ctx.fillStyle = this.fillColor;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(firstPoint.x, firstPoint.y);
    this.canvas.ctx.lineTo(secondPoint.x, secondPoint.y);
    this.canvas.ctx.lineTo(thirdPoint.x, thirdPoint.y);
    this.canvas.ctx.closePath();
    this.canvas.ctx.fill();
    this.canvas.ctx.strokeStyle = this.lineColor;
    this.canvas.ctx.stroke();
  }

  draw(projection) {
    let projectionPoints;
    if (projection === "prespective") {
      projectionPoints = this.initPrespective();
    }
    this.visible = this.getVisibility(projectionPoints);
    if (!this.visible) {
      return;
    }
    const firstPoint = this.points[0];
    const secondPoint = this.points[1];
    const thirdPoint = this.points[2];

    this.drawPolygon(firstPoint, secondPoint, thirdPoint);
  }
}
