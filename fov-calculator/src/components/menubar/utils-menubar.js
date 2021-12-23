export const initFormData = {
  aperture: {
    ref: "aperture",
    value: "",
    required: true,
    type: "number",
    name: "Aperture",
    unit: "mm",
  },
  focallength: {
    ref: "focallength",
    value: "",
    required: true,
    type: "number",
    name: "Flength",
    unit: "mm",
  },
  barlow: {
    ref: "barlow",
    value: "",
    required: false,
    type: "number",
    name: "Barlow",
    unit: "x",
  },
  pixelsize: {
    ref: "pixelsize",
    value: "",
    required: true,
    type: "number",
    name: "Pixel Size",
    unit: "μm²",
  },
  resolutionx: {
    ref: "resolutionx",
    value: "",
    required: true,
    type: "number",
    name: "Res (X)",
    unit: "px",
  },
  resolutiony: {
    ref: "resolutiony",
    value: "",
    required: true,
    type: "number",
    name: "Res (Y)",
    unit: "px",
  },
  eyepiecefocallength: {
    ref: "eyepiecefocallength",
    value: "",
    required: true,
    type: "number",
    name: "Flength",
    unit: "mm",
  },
  eyepieceafov: {
    ref: "eyepieceafov",
    value: "",
    required: true,
    type: "number",
    name: "AFOV",
    unit: "°",
  },
};

export const initCanvasData = {
  isEyepieceMode: true,
  hasGrid: true,
  hasLabels: true,
  hasRedGrid: false,
  redGridFactor: 6,
  zoomValue: 100,
  plotSizeX: 20,
  plotSizeY: 20,
  plotDivisor: 6,
  axisLabel: "Minutes of Arc",
};

// Bootstrap colors
export const initColorData = {
  eyepieceMode: "info",
  cameraMode: "success",
  background: "gradient-dark",
  text: "text-white",
  textMuted: "text-muted",
  canvasBorder: "#9C9C9C",
  canvasText: "#9C9C9C",
  canvasGrid: "#4c4c4c",
};

export const initPlanetData = {
  jupiter: {
    ref: "jupiter",
    isVisible: false,
  },
};

export function microns2milimeter(
  resolutionxvalue,
  resolutionyvalue,
  pixelsizevalue
) {
  // Calculate the size of the sensor (X and Y) in mm from the microns input
  let sensorXsizeMM =
    (Number(Math.sqrt(pixelsizevalue)) / 1000) * Number(resolutionxvalue);
  let sensorYsizeMM =
    (Number(Math.sqrt(pixelsizevalue)) / 1000) * Number(resolutionyvalue);

  sensorXsizeMM = Math.round(sensorXsizeMM * 10) / 10;
  sensorYsizeMM = Math.round(sensorYsizeMM * 10) / 10;

  return { sensorXsizeMM, sensorYsizeMM };
}

export function camCanvasSize(
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

export function eyepieceCanvasSize(
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
