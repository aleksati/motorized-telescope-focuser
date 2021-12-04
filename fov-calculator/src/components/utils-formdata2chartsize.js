export function camCanvasSize(formData) {
  // Calculate the size of the sensor (X and Y) in mm
  let sensorXsizeMM =
    (Number(formData.pixelsize.value) / 1000) *
    Number(formData.resolutionx.value);
  let sensorYsizeMM =
    (Number(formData.pixelsize.value) / 1000) *
    Number(formData.resolutiony.value);

  // We take the Barlow into account
  let flength = Number(formData.focallength.value);
  let barlow = Number(formData.barlow.value);
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
      axisLabel: "Degrees",
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc minutes.
  if (FOV_X * 3438 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 3438 * 6),
      plotSizeY: Math.round(FOV_Y * 3438 * 6),
      plotDivisor: 6,
      axisLabel: "Minutes of Arc",
    };
  }

  // if the total size is less than 2 arc minutes, we choose arc seconds
  return {
    plotSizeX: Math.round(FOV_X * 206265),
    plotSizeY: Math.round(FOV_Y * 206265),
    plotDivisor: 1,
    axisLabel: "Seconds of Arc",
  };
}

export function eyepieceCanvasSize(formData) {
  let afov = Number(formData.eyepieceafov.value);
  let flength_scope = Number(formData.focallength.value);

  let barlow = Number(formData.barlow.value);
  if (barlow !== 0) flength_scope *= barlow;

  let flength_eye = Number(formData.eyepiecefocallength.value);
  let mag = flength_scope / flength_eye;

  let tfov = afov / mag; // This output is a FOV unit in degrees.

  // if the width is more than 2 degrees, we choose degrees
  if (tfov >= 2) {
    return {
      plotSizeX: Math.round(tfov * 6),
      plotSizeY: Math.round(tfov * 6),
      plotDivisor: 6,
      axisLabel: "Degrees",
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc minutes.
  if (tfov * 60 >= 2) {
    return {
      plotSizeX: Math.round(tfov * 60 * 6),
      plotSizeY: Math.round(tfov * 60 * 6),
      plotDivisor: 6,
      axisLabel: "Minutes of Arc",
    };
  }

  // if the total size is less than 2 arc minutes, we choose arc seconds
  return {
    plotSizeX: Math.round(tfov * 60 * 60),
    plotSizeY: Math.round(tfov * 60 * 60),
    plotDivisor: 1,
    axisLabel: "Seconds of Arc",
  };
}
