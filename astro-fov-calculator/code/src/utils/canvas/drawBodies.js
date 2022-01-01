import { ANGULAR_MEASUREMENT_LABELS } from "../../data/angular-measurement-labels";

function formatBodyUnits(angDi) {
  let bodyUnit;
  let bodyUnitCount;
  return { bodyUnit, bodyUnitCount };
}

function drawBody(
  context,
  canvasData,
  scaledCanvasWidth,
  scaledCanvasHeight,
  currBody
) {
  const canvasWidth = scaledCanvasWidth;
  const canvasHeight = scaledCanvasHeight;
  const { plotSizeX, plotSizeY, plotDivisor, axisLabel } = canvasData;
  const { angularDiameter, img } = currBody;
  let imgObject = new Image();

  const canvasUnit = axisLabel;
  const canvasUnitCount = plotSizeX / plotDivisor;
  const { bodyUnit, bodyUnitCount } = formatBodyUnits(angularDiameter);

  // first check that bodyUnit and canvasUnit are the same. Else, do another formatting canculation.
  // then,
  // pxPerUnitX = canvasWidth / canvasUnitCount
  // picWidth = bodyUnitCount * pxPerUnitX ... right?
}

function drawTextBox() {}

export { drawBody };
