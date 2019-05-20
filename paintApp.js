/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

const paint = new Paint(new Toolbar());
paint.init();

// Shapes
paint.toolbar.addButton(new LineBtn("lineBtn", paint));
paint.toolbar.addButton(new CircleBtn("circleBtn", paint));
paint.toolbar.addButton(new BezierBtn("bezierBtn", paint));

// Transformation
paint.toolbar.addButton(new ScaleBtn("scaleBtn", paint));
paint.toolbar.addButton(new MoveBtn("moveBtn", paint));
paint.toolbar.addButton(new RotateBtn("rotateBtn", paint));

// Settings
paint.toolbar.addButton(new ExportBtn("exportBtn", paint));
paint.toolbar.addButton(new ImportBtn("importBtn", paint));
