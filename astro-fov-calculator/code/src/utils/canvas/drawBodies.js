import * as calc from "../calc";

export function drawBody(
  context,
  canvasData,
  scaledCanvasWidth,
  scaledCanvasHeight,
  currBody,
  labelOffset
) {
  const { plotSizeX, plotDivisor, angularUnit } = canvasData;
  const { angularDiameterDeg, img } = currBody;
  const bodyUnitCount = calc.unit2ang(angularDiameterDeg, angularUnit);

  const canvasUnitCount = plotSizeX / plotDivisor;
  const offsetWidth = (scaledCanvasWidth / 100) * labelOffset;
  const offsetHeight = (scaledCanvasHeight / 100) * labelOffset;
  const pxPerUnit = (scaledCanvasWidth - offsetWidth) / canvasUnitCount;

  const imagePxDiameter = bodyUnitCount * pxPerUnit;
  const centeringOffset = imagePxDiameter / 2;

  let imgObject = new Image();
  imgObject.src = img;
  context.drawImage(
    imgObject,
    (scaledCanvasWidth + offsetWidth) / 2 - centeringOffset,
    (scaledCanvasHeight - offsetHeight) / 2 - centeringOffset,
    imagePxDiameter,
    imagePxDiameter
  );
}

export function drawTextBox() {}
