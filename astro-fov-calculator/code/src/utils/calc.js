import { ANGULAR_MEASUREMENT_LABELS } from "../data/angular-measurement-labels";

// ../App.js //
export function numberify(val) {
  // return only numbers above 0
  return Number(val) <= 0 ? 0 : Number(val);
}

// ../components/chart/forecast.jsx //
export function filterForecastData(data) {
  // filter forecastData from the YR API
  // const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?altitude=0&lat=" + lat + "&lon=" + long;
  const currTime = Date();
  let currTimeHour = currTime.slice(16, 18);
  let idx;

  // We are only interested in one weather forcast at night time.
  // IF its night already, we find the current hour and return it.
  if (currTimeHour >= "21" || currTimeHour <= "03") {
    idx = data.findIndex((item) => {
      return item.time.slice(11, 13) === currTimeHour;
    });
  } else {
    idx = data.findIndex((item) => {
      return item.time.slice(11, 13) === "21";
    });
  }
  return data[idx];
}

// ../components/chart/info.jsx //
export function getFratio(flength, barlow, aperture) {
  let b = Number(barlow) <= 0 ? 1 : Number(barlow);
  let f = Number(flength) <= 0 ? 0 : Number(flength) * b;
  let a = Number(aperture) <= 0 ? 0 : Number(aperture);
  return a !== 0 && f !== 0 ? Math.floor((f / a) * 10) / 10 : "";
}

export function getAspectRatio(resX, resY) {
  // calculate the aspect ratio (f.instance "4:3") of our camera lense.
  let aspectRatio = "";
  let x = Number(resX) <= 0 ? 0 : Number(resX);
  let y = Number(resY) <= 0 ? 0 : Number(resY);

  let aspectX = 10000;
  let aspectY = x === 0 || y === 0 ? 0 : (y / x) * 10000;

  if (aspectY !== 0) {
    let factorX = [];
    let factorY = [];
    for (let i = 1; i <= aspectX; i++) {
      if (aspectX % i === 0) factorX.push(i);
      if (aspectY % i === 0) factorY.push(i);
    }

    if (factorY.length && factorX.length) {
      const commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
      const greatestCommonFactor = Math.max(...commonFactors);
      aspectX /= greatestCommonFactor;
      aspectY /= greatestCommonFactor;
      aspectRatio = aspectX + ":" + aspectY;
    }
    return aspectRatio;
  }
}

export function getMaxMag(flengthNoBarlow, aperture) {
  const f = Number(flengthNoBarlow) <= 0 ? 0 : Number(flengthNoBarlow);
  let a = Number(aperture) <= 0 ? 0 : Number(aperture);
  return f !== 0 && a !== 0 ? Math.round(a * 2 * 10) / 10 : "";
}

export function getPxPerGridSquare(
  resX,
  resY,
  plotX,
  plotY,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  // calculate the amount of pixels² per canvas grid square.
  let pxPerSquare = "";
  const rX = Number(resX) <= 0 ? 0 : Number(resX);
  const rY = Number(resY) <= 0 ? 0 : Number(resY);
  const pX = Number(plotX) <= 0 ? 1 : Number(plotX);
  const pY = Number(plotY) <= 0 ? 1 : Number(plotY);

  // if the grid switch is ON and none of the numbers above are 0, we calcuate the grid pixel size.
  if (hasGrid && [rX, rY, pX, pY].indexOf(0) === -1) {
    let pxPerUnitX = Math.round((rX / pX) * 10) / 10;
    let pxPerUnitY = Math.round((rY / pY) * 10) / 10;

    pxPerSquare = Math.round(pxPerUnitX * pxPerUnitY * 10) / 10;

    // if hasRedGrid, then the px² should be the: result * redGridFactor²?
    pxPerSquare = hasRedGrid
      ? Math.round(pxPerSquare * (redGridFactor * redGridFactor) * 10) / 10 +
        "px²"
      : Math.round(pxPerSquare * 10) / 10 + "px²";
  }
  return pxPerSquare;
}

export function getChipSize(resX, resY, micronssquared) {
  // get camera sensor size in mm²
  let chipSize = "";
  const rX = Number(resX) <= 0 ? 0 : Number(resX);
  const rY = Number(resY) <= 0 ? 0 : Number(resY);
  const pxSize = Number(micronssquared) <= 0 ? 0 : Number(micronssquared);
  // any none of the the var above are 0.
  if ([rX, rY, pxSize].indexOf(0) === -1) {
    const sensorXsizeMM = mic2mm(rX, pxSize);
    const sensorYsizeMM = mic2mm(rY, pxSize);
    chipSize = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";
  }
  return chipSize;
}

// ./utils/eye2canvas & ./utils/eye2canvas//
// ../components/chart/info.jsx //
export function getTrueFOVdeg(afov, mag) {
  // This output is a FOV unit in degrees.
  const a = Number(afov) <= 0 ? 1 : Number(afov);
  const m = Number(mag) <= 0 ? 1 : Number(mag);
  return a / m;
}

export function getMag(flengthScope, flengthEye) {
  const scope = Number(flengthScope) <= 0 ? 0 : Number(flengthScope);
  const eye = Number(flengthEye) <= 0 ? 0 : Number(flengthEye);
  return eye !== 0 && scope !== 0 ? Math.round((scope / eye) * 10) / 10 : "";
}

export function getFlength(flength, barlow) {
  const b = Number(barlow) <= 0 ? 1 : Number(barlow);
  const f = Number(flength) <= 0 ? 0 : Number(flength) * b;
  return f;
}

export function mic2mm(resolution, micronssquared) {
  // convert microns into mm
  // Calculate the mm size of one side of the camera sensor (X or Y)
  // based on resolution (f.instace 640) and chipsize (microns squared)
  let sensorMM = Number(Math.sqrt(micronssquared) / 1000) * Number(resolution);
  sensorMM = Math.round(sensorMM * 10) / 10;

  return sensorMM;
}

export function sensor2rad(sensorMM, flength) {
  // get the FOV of specifc camera sensor in radians
  // the unit FOV is the sensor size divided by the focal length.
  // this gives the FOV in radians.
  return sensorMM / flength;
}

export function rad2deg(radians) {
  // convert from radians to degrees
  return radians * (180 / Math.PI);
}

// export function rad2arcmin(radians) {
//   // convert from radians to arc minutes
//   const deg = radians * (180 / Math.PI);
//   const arcMin = deg * 60;
//   return arcMin;
// }

// export function rad2arcsec(radians) {
//   // convert from radians to arc seconds
//   const deg = radians * (180 / Math.PI);
//   const arcSec = deg * 3600;
//   return arcSec;
// }

export function deg2arcmin(deg) {
  return deg * 60;
}

export function deg2arcsec(deg) {
  return deg * 3600;
}

export function deg2unitCam(degX, degY) {
  // convert from degrees to arc minutes (two sides) and
  // check what the best unit is for our canvas.
  // Take the "longest" side as our reference.
  const result = degX - degY;
  const preferedRef = result > 0 ? degX : degY;
  const arcminRef = preferedRef * 60;

  if (arcminRef > 60) {
    return ANGULAR_MEASUREMENT_LABELS[0]; // degrees
  } else if (arcminRef < 2) {
    return ANGULAR_MEASUREMENT_LABELS[2]; // arc seconds
  } else {
    return ANGULAR_MEASUREMENT_LABELS[1]; // arc minutes
  }
}

export function deg2unitEye(deg) {
  // check what the best angular unit is for our canvas in eyepiece mode
  const arcminRef = deg * 60;
  if (arcminRef > 60) {
    return ANGULAR_MEASUREMENT_LABELS[0]; // degrees
  } else if (arcminRef < 2) {
    return ANGULAR_MEASUREMENT_LABELS[2]; // arc seconds
  } else {
    return ANGULAR_MEASUREMENT_LABELS[1]; // arc minutes
  }
}

// used in ./drawBodies //
export function unit2ang(deg, unit) {
  // convert angular values from degrees to arcmin or arcsec based on prefered unit.
  switch (unit) {
    case ANGULAR_MEASUREMENT_LABELS[0]:
      return deg;
    case ANGULAR_MEASUREMENT_LABELS[1]:
      return deg2arcmin(deg);
    case ANGULAR_MEASUREMENT_LABELS[2]:
      return deg2arcsec(deg);
  }
}

export function unit2plotDivisor(unit) {
  const plotDiv = 6;
  switch (unit) {
    case ANGULAR_MEASUREMENT_LABELS[0]:
      return plotDiv;
    case ANGULAR_MEASUREMENT_LABELS[1]:
      return plotDiv;
    case ANGULAR_MEASUREMENT_LABELS[2]:
      return 1;
  }
}

export function getCanvasObject(angUnit, degX, degY, plotDiv) {
  switch (angUnit) {
    case ANGULAR_MEASUREMENT_LABELS[0]:
      return {
        plotSizeX: Math.round(degX * plotDiv),
        plotSizeY: Math.round(degY * plotDiv),
        plotDivisor: plotDiv,
        angularUnit: ANGULAR_MEASUREMENT_LABELS[0],
      };
    case ANGULAR_MEASUREMENT_LABELS[1]:
      return {
        plotSizeX: Math.round(deg2arcmin(degX) * plotDiv),
        plotSizeY: Math.round(deg2arcmin(degY) * plotDiv),
        plotDivisor: plotDiv,
        angularUnit: ANGULAR_MEASUREMENT_LABELS[1],
      };
    case ANGULAR_MEASUREMENT_LABELS[2]:
      return {
        plotSizeX: Math.round(deg2arcsec(degX)),
        plotSizeY: Math.round(deg2arcsec(degY)),
        plotDivisor: plotDiv,
        angularUnit: ANGULAR_MEASUREMENT_LABELS[2],
      };
  }
}
