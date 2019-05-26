/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

function calculateMaxAndMinPointsInArray(points) {
  const maxY = Math.max.apply(
    Math,
    points.map(function(o) {
      return o.y;
    })
  );
  const maxX = Math.max.apply(
    Math,
    points.map(function(o) {
      return o.x;
    })
  );
  const minY = Math.min.apply(
    Math,
    points.map(function(o) {
      return o.y;
    })
  );
  const minX = Math.min.apply(
    Math,
    points.map(function(o) {
      return o.x;
    })
  );
  return [new Point(minX, minY), new Point(maxX, maxY)];
}
