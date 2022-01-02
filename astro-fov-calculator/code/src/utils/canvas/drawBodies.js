import { ANGULAR_MEASUREMENT_LABELS } from "../../data/angular-measurement-labels";

function deg2arcmin(deg) {
  let arcmin = deg * 60;
  return arcmin;
}

function deg2arcsec(deg) {
  let arcsec = deg * 3600;
  return arcsec;
}

function formatBodyUnits(bodyDiDeg, canvasUnit) {
  switch (canvasUnit) {
    case ANGULAR_MEASUREMENT_LABELS[0]:
      return bodyDiDeg;
    case ANGULAR_MEASUREMENT_LABELS[1]:
      return deg2arcmin(bodyDiDeg);
    case ANGULAR_MEASUREMENT_LABELS[2]:
      return deg2arcsec(bodyDiDeg);
  }
}

function drawBody(
  context,
  canvasData,
  scaledCanvasWidth,
  scaledCanvasHeight,
  currBody,
  labelOffset
) {
  const { plotSizeX, plotDivisor, angularUnit } = canvasData;
  const { angularDiameterDeg, img } = currBody;
  const bodyUnitCount = formatBodyUnits(angularDiameterDeg, angularUnit);

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

function drawTextBox() {}

export { drawBody };
