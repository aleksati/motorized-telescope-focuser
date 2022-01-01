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
  const width = scaledCanvasWidth;
  const height = scaledCanvasHeight;
  const { plotSizeX, plotSizeY, plotDivisor, axisLabel } = canvasData;
  const { angularDiameter, img } = currBody;
  let imgObject = new Image();

  const canvasUnit = axisLabel;
  const canvasUnitCount = plotSizeX / plotDivisor;
  const { bodyUnit, bodyUnitCount } = formatBodyUnits(angularDiameter);

  // scale the angDiameter to the current plotDivisor
}

function drawTextBox() {}

export { drawBody };
