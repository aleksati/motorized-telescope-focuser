import * as calc from "./calc";

export default function cam2canvas(
  pixelsizevalue,
  resolutionxvalue,
  resolutionyvalue,
  focallenghtvalue,
  barlowvalue
) {
  const flength = calc.getFlength(focallenghtvalue, barlowvalue);

  const sensorXsizeMM = calc.mic2mm(resolutionxvalue, pixelsizevalue);
  const sensorYsizeMM = calc.mic2mm(resolutionyvalue, pixelsizevalue);
  const fovXrad = calc.sensor2rad(sensorXsizeMM, flength);
  const fovYrad = calc.sensor2rad(sensorYsizeMM, flength);

  const fovXdeg = calc.rad2deg(fovXrad);
  const fovYdeg = calc.rad2deg(fovYrad);
  const preferedUnit = calc.deg2unitCam(fovXdeg, fovYdeg);
  const plotDivisor = calc.unit2plotDivisor(preferedUnit);

  return calc.getCanvasObject(preferedUnit, fovXdeg, fovYdeg, plotDivisor);
}
