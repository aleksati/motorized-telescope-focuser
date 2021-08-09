export function camChartSize(formdata) {
  // Calculate the size of the sensor (X and Y) in mm
  const sensorXsizeMM =
    (Number(formdata.pixelsize.value) / 1000) *
    Number(formdata.resolutionx.value);
  const sensorYsizeMM =
    (Number(formdata.pixelsize.value) / 1000) *
    Number(formdata.resolutiony.value);

  // We take the Barlow into account
  let flength = Number(formdata.focallength.value);
  let barlow = Number(formdata.barlow.value);
  if (barlow !== 0) flength *= barlow;

  const FOV_X = sensorXsizeMM / flength;
  const FOV_Y = sensorYsizeMM / flength;

  // if the width is more than 2 degrees, we choose degrees
  if (FOV_X * 57.3 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 57.3 * 6),
      plotSizeY: Math.round(FOV_Y * 57.3 * 6),
      plotDivisor: 6,
      chipDim: [
        Number(formdata.resolutionx.value),
        Number(formdata.resolutiony.value),
      ],
      axisLabel: "Degrees",
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc minutes.
  if (FOV_X * 3438 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 3438 * 6),
      plotSizeY: Math.round(FOV_Y * 3438 * 6),
      plotDivisor: 6,
      chipDim: [
        Number(formdata.resolutionx.value),
        Number(formdata.resolutiony.value),
      ],
      axisLabel: "Minutes of Arc",
    };
  }

  // if the total size is more than 2 arc minutes, we choose arc seconds
  return {
    plotSizeX: Math.round(FOV_X * 206265),
    plotSizeY: Math.round(FOV_Y * 206265),
    plotDivisor: 1,
    chipDim: [
      Number(formdata.resolutionx.value),
      Number(formdata.resolutiony.value),
    ],
    axisLabel: "Seconds of Arc",
  };
}

export function eyepieceChartSize(formdata) {
  console.log("hey");
}
