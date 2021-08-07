export function camChartSize(FormData) {
  // Calculate the size of the sensor (X and Y) in mm
  const sensorXsizeMM =
    (Number(FormData.pixelsize.value) / 1000) *
    Number(FormData.resolutionx.value);
  const sensorYsizeMM =
    (Number(FormData.pixelsize.value) / 1000) *
    Number(FormData.resolutiony.value);

  // We take the Barlow into account
  let flength = Number(FormData.focallength.value);
  let barlow = Number(FormData.barlow.value);
  console.log("barlow", barlow);
  if (barlow !== 0) {
    flength *= barlow;
  }

  const FOV_X = sensorXsizeMM / flength;
  const FOV_Y = sensorYsizeMM / flength;

  // if the width is more than 2 degrees, we choose degrees
  if (FOV_X * 57.3 >= 2) {
    return {
      plotSizeX: Math.round(FOV_X * 57.3 * 6),
      plotSizeY: Math.round(FOV_Y * 57.3 * 6),
      plotDivisor: 6,
      chipDim: [
        Number(FormData.resolutionx.value),
        Number(FormData.resolutiony.value),
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
        Number(FormData.resolutionx.value),
        Number(FormData.resolutiony.value),
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
      Number(FormData.resolutionx.value),
      Number(FormData.resolutiony.value),
    ],
    axisLabel: "Seconds of Arc",
  };
}

export function eyepieceChartSize(FormData) {
  console.log("hey");
}

export function getFormDataInfo(state) {
  // calculate the focal ratio
  let focallenght = Number(state.FormData.focallength.value);
  let barlow = Number(state.FormData.barlow.value);
  let aperture = Number(state.FormData.aperture.value);
  if (barlow !== 0) {
    focallenght *= barlow;
  }
  let fr = Math.round((focallenght / aperture) * 10) / 10;
  let fr_unit = "f/" + fr;

  // calculate the aspect ratio of the camera
  // ...

  return {
    focalratio: {
      value: fr,
      ref: "focalratio",
      name: "Focal Ratio",
      type: "number",
      unit: fr_unit,
    },
    aspectratio: {
      value: "",
      ref: "aspectratio",
      name: "Aspect Ratio",
      type: "text",
      unit: "Camera",
    },
    pxperunit: {
      value: "",
      ref: "pxperunit",
      name: "Px Per Unit",
      unit: state.chartinfo.axisLabel,
    },
  };
}
