import * as calc from "./calc";

export default function eye2canvas(
  eyepieceafovvalue,
  eyepiecefocallengthvalue,
  focallenghtvalue,
  barlowvalue
) {
  const flength_scope = calc.getFlength(focallenghtvalue, barlowvalue);
  const mag = calc.getMag(flength_scope, eyepiecefocallengthvalue);
  const tFovDeg = calc.getTrueFOVdeg(eyepieceafovvalue, mag);
  const preferedUnit = calc.deg2unitEye(tFovDeg);
  const plotDivisor = calc.unit2plotDivisor(preferedUnit);

  return calc.getCanvasObject(preferedUnit, tFovDeg, tFovDeg, plotDivisor);
}
