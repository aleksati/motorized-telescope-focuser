import { ANGULAR_MEASUREMENT_LABELS } from "../data/angular-measurement-labels";

function eyePiece2canvasSize(
  eyepieceafovvalue,
  eyepiecefocallengthvalue,
  focallenghtvalue,
  barlowvalue
) {
  let afov = Number(eyepieceafovvalue);
  let flength_scope = Number(focallenghtvalue);

  let barlow = Number(barlowvalue);
  if (barlow !== 0) flength_scope *= barlow;

  let flength_eye = Number(eyepiecefocallengthvalue);
  let mag = flength_scope / flength_eye;

  let tfov = afov / mag; // This output is a FOV unit in degrees.

  // if the width is more than 2 degrees, we choose degrees
  if (tfov >= 2) {
    return {
      plotSizeX: Math.round(tfov * 6),
      plotSizeY: Math.round(tfov * 6),
      plotDivisor: 6,
      angularUnit: ANGULAR_MEASUREMENT_LABELS[0],
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc minutes.
  if (tfov * 60 >= 2) {
    return {
      plotSizeX: Math.round(tfov * 60 * 6),
      plotSizeY: Math.round(tfov * 60 * 6),
      plotDivisor: 6,
      angularUnit: ANGULAR_MEASUREMENT_LABELS[1],
    };
  }

  // if the total size is less than 2 arc minutes, we choose arc seconds
  return {
    plotSizeX: Math.round(tfov * 60 * 60),
    plotSizeY: Math.round(tfov * 60 * 60),
    plotDivisor: 1,
    angularUnit: ANGULAR_MEASUREMENT_LABELS[2],
  };
}

export default eyePiece2canvasSize;
