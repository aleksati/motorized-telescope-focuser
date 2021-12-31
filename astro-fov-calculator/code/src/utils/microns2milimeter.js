function microns2milimeter(resolutionxvalue, resolutionyvalue, pixelsizevalue) {
  // Calculate the size of the sensor (X and Y) in mm from the microns input
  let sensorXsizeMM =
    (Number(Math.sqrt(pixelsizevalue)) / 1000) * Number(resolutionxvalue);
  let sensorYsizeMM =
    (Number(Math.sqrt(pixelsizevalue)) / 1000) * Number(resolutionyvalue);

  sensorXsizeMM = Math.round(sensorXsizeMM * 10) / 10;
  sensorYsizeMM = Math.round(sensorYsizeMM * 10) / 10;

  return { sensorXsizeMM, sensorYsizeMM };
}

export default microns2milimeter;
