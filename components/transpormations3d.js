class Transform3D {
  static move(canvas, firstPoint, secondPoint, updateCanvas = true) {
    const aX = secondPoint.x - firstPoint.x;
    const aY = secondPoint.y - firstPoint.y;
    const aZ = secondPoint.z - firstPoint.z;
    Transform3D.moveBy(canvas, aX, aY, aZ, updateCanvas);
  }

  static moveBy(canvas, x, y, z, updateCanvas = true) {
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + x;
      point.y = point.y + y;
      point.z = point.z + z;
    }

    if (updateCanvas) {
      canvas.update();
    }
  }

  static scale(canvas, transformVector, centerPoint) {
    // save the first center because it can change while we change the points
    const tempCenter = centerPoint;

    // Scale matrix
    const scaleMatrix = [
      [transformVector.x, 0, 0, 0],
      [0, transformVector.y, 0, 0],
      [0, 0, transformVector.z, 0],
      [0, 0, 0, 1]
    ];

    Transform3D.move(canvas, centerPoint, new Point3D(0, 0, 0), false);

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      const pointVector = [
        [point.x, point.y, point.z, 1] // adding 1 for allow the matrix multiply
      ];
      const scaledPoints = multiplyMatrix(pointVector, scaleMatrix);

      point.x = scaledPoints[0][0];
      point.y = scaledPoints[0][1];
      point.z = scaledPoints[0][2];
    }

    // Back to real position
    Transform3D.move(canvas, new Point3D(0, 0, 0), tempCenter, false);

    if (updateCanvas) {
      canvas.update();
    }
  }

  static rotate(canvas, centerPoint, angleVector, updateCanvas = true) {
    // save the first center because it can change while we change the points
    const tempCenter = centerPoint;

    // Calculate sin & cos for each angle in vector
    const cosX = Math.cos(angleVector.x);
    const sinX = Math.sin(angleVector.x);
    const cosY = Math.cos(angleVector.y);
    const sinY = Math.sin(angleVector.y);
    const cosZ = Math.cos(angleVector.z);
    const sinZ = Math.sin(angleVector.z);

    // Rotate matrix
    const rotateMatrixX = [
      [1, 0, 0, 0],
      [0, cosX, sinX, 0],
      [0, -sinX, cosX, 0],
      [0, 0, 0, 1]
    ];

    const rotateMatrixY = [
      [cosY, 0, -sinY, 0],
      [0, 1, 0, 0],
      [sinY, 0, cosY, 0],
      [0, 0, 0, 1]
    ];

    const rotateMatrixZ = [
      [cosZ, sinZ, 0, 0],
      [-sinZ, cosZ, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    Transform3D.move(canvas, centerPoint, new Point3D(0, 0, 0), false);
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];

      const pointVector = [
        [point.x, point.y, point.z, 1] // adding 1 for allow the matrix multiply
      ];

      const rotateX = multiplyMatrix(pointVector, rotateMatrixX);
      const rotateY = multiplyMatrix(rotateX, rotateMatrixY);
      const rotateZ = multiplyMatrix(rotateY, rotateMatrixZ);

      point.x = rotateX[0][0];
      point.y = rotateY[0][1];
      point.z = rotateZ[0][2];
    }

    // Back to real position
    Transform3D.move(canvas, new Point3D(0, 0, 0), tempCenter, false);
    if (updateCanvas) {
      canvas.update();
    }
  }
}
