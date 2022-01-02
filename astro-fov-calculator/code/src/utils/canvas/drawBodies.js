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
  currBody
) {
  const { plotSizeX, plotSizeY, plotDivisor, angularUnit } = canvasData;
  const { angularDiameterDeg, img } = currBody;
  const bodyUnitCount = formatBodyUnits(angularDiameterDeg, angularUnit);

  const canvasUnit = angularUnit;
  const canvasUnitCount = plotSizeX / plotDivisor;
  const pxPerUnit = scaledCanvasWidth / canvasUnitCount;

  const imagePxDiameter = bodyUnitCount * pxPerUnit;

  console.log("Canvas unit:", canvasUnit);
  console.log("Body diameter in that unit:", bodyUnitCount);
  console.log("Body diameter in degrees:", angularDiameterDeg);
  console.log(imagePxDiameter);

  let imgObject = new Image();
  imgObject.src = img;
  context.drawImage(
    imgObject,
    scaledCanvasWidth / 2,
    scaledCanvasHeight / 2,
    imagePxDiameter,
    imagePxDiameter
  );
}

function drawTextBox() {}

export { drawBody };
