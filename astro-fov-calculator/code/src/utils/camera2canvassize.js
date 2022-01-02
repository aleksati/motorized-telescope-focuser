import microns2milimeter from "./microns2milimeter";
import { ANGULAR_MEASUREMENT_LABELS } from "../data/angular-measurement-labels";

function camera2canvasSize(
  pixelsizevalue,
  resolutionxvalue,
  resolutionyvalue,
  focallenghtvalue,
  barlowvalue
) {
  let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(
    resolutionxvalue,
    resolutionyvalue,
    pixelsizevalue
  );

  // We take the Barlow into account
  let flength = Number(focallenghtvalue);
  let barlow = Number(barlowvalue);
  if (barlow !== 0) flength *= barlow;

  // the unit FOV is the sensor size divided by the focal length.
  // this gives the FOV in radians.
  let FOV_X = sensorXsizeMM / flength;
  let FOV_Y = sensorYsizeMM / flength;

  // if the width is more than 2 degrees, we choose degrees
  // We multiply by 6 to add 6 squares between each number
  if (FOV_X * 57.3 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 57.3 * 6),
      plotSizeY: Math.round(FOV_Y * 57.3 * 6),
      plotDivisor: 6,
      angularUnit: ANGULAR_MEASUREMENT_LABELS[0],
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc minutes.
  if (FOV_X * 3438 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 3438 * 6),
      plotSizeY: Math.round(FOV_Y * 3438 * 6),
      plotDivisor: 6,
      angularUnit: ANGULAR_MEASUREMENT_LABELS[1],
    };
  }

  // if the total size is less than 2 arc minutes, we choose arc seconds
  return {
    plotSizeX: Math.round(FOV_X * 206265),
    plotSizeY: Math.round(FOV_Y * 206265),
    plotDivisor: 1,
    angularUnit: ANGULAR_MEASUREMENT_LABELS[2],
  };
}

export default camera2canvasSize;
