/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class Canvas3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.isInitialize = false;
    this.ctx = null;
    this.isMouseDown = false;
    this.points = [];
    this.centerPoint = null;
    this.polygons = [];
    this.file = null;
    this.projection = "prespective";
    this.colors = [];
  }

  updatePolygons() {
    this.polygons = [];
    this.file.polygons.forEach((polygon, i) => {
      if (polygon.length < 3 || polygon.length > 4) {
        throw new Error("Polygon has 3 or 4 points");
      }
      const p1 = this.points[polygon[0]];
      const p2 = this.points[polygon[1]];
      const p3 = this.points[polygon[2]];

      let polygonPoints = [
        new Point3D(p1.x, p1.y, p1.z),
        new Point3D(p2.x, p2.y, p2.z),
        new Point3D(p3.x, p3.y, p3.z)
      ];
      // console.log(JSON.stringify(polygonPoints, null, 2));

      this.polygons.push(
        new Polygon(this, polygonPoints, "#000000", this.colors[i])
      );
      if (polygon.length > 3) {
        // Split to 2 polygons (0,1,2)^ AND (1,2,3)v
        const p4 = this.points[polygon[3]];
        polygonPoints = [
          new Point3D(p1.x, p1.y, p1.z),
          new Point3D(p3.x, p3.y, p3.z),
          new Point3D(p4.x, p4.y, p4.z)
        ];
        this.polygons.push(
          new Polygon(this, polygonPoints, "#000000", this.colors[i])
        );
      }
    });
  }

  importCanvas(canvasFile, fit = false) {
    this.file = canvasFile;
    this.points = [];
    canvasFile.points.forEach(point => {
      this.points.push(new Point3D(point.x, point.y, point.z));
    });

    canvasFile.polygons.forEach(polygon => {
      this.colors.push(randomColor());
    });

    this.calculateCenter();
    this.redrawPolygons();
  }

  calculateCenter() {
    this.centerPoint = new Point3D(
      this.canvas.width / 2,
      this.canvas.height / 2,
      -1000
    );
  }

  init() {
    this.ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    this.isInitialize = true;
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

  redrawPolygons() {
    this.updatePolygons();
    // Draw from min Z to max Z

    this.polygons.sort((a, b) =>
      a.getMaxZ() > b.getMaxZ() ? 1 : a.getMaxZ() < b.getMaxZ() ? -1 : 0
    );

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.polygons.length === 0) {
      return;
    }
    this.polygons.forEach(polygon => {
      polygon.draw(this.projection);
    });
  }

  clearListeners() {
    let el, elClone;
    (el = document.getElementById("canvas")), (elClone = el.cloneNode(true));
    el.parentNode.replaceChild(elClone, el);
    this.canvas = document.getElementById("canvas");
    this.init();
    this.redrawPolygons();
  }
}
