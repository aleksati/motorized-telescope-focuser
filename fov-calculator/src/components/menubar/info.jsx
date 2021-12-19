import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import { microns2milimeter } from "./utils-menubar.js";

const Info = (props) => {
  const [state, setState] = useState({
    focalRatio: {
      name: "FR",
      value: "",
      isEyepieceInfo: true,
      isChanged: true,
    },
    aspectRatio: {
      name: "AR",
      value: "",
      isEyepieceInfo: false,
      isChanged: true,
    },
    magnification: {
      name: "CurrMag",
      value: "",
      isEyepieceInfo: true,
      isChanged: false,
    },
    maxMagnification: {
      name: "MaxMag",
      value: "",
      isEyepieceInfo: true,
      isChanged: false,
    },
    pxPerSquare: {
      name: "Grid □",
      value: "",
      isEyepieceInfo: false,
      isChanged: false,
    },
    chipSize: {
      name: "Chip",
      value: "",
      isEyepieceInfo: false,
      isChanged: false,
    },
  });

  // When I submit, I reset the isChanged flag
  useEffect(() => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    Object.keys(stateCopy).forEach((key) => {
      stateCopy[key].isChanged = false;
    });
    setState(stateCopy);
  }, [props.isSubmit]);

  // get Focal Ratio (F number)
  useEffect(() => {
    let barlow = Number(props.barlow.value);
    let flength = Number(props.focallength.value);
    let aperture = Number(props.aperture.value);

    if (flength <= 0 || aperture <= 0) return;
    if (barlow !== 0) flength *= barlow;
    let focalRatio = Math.floor((flength / aperture) * 10) / 10;
    if (focalRatio <= 0) return;

    setState((prevState) => ({
      ...prevState,
      focalRatio: {
        ...prevState.focalRatio,
        value: focalRatio,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.aperture]);

  // get Aspect Ratio (Ar)
  useEffect(() => {
    let aspectX = 10000;
    let aspectY =
      (Number(props.resolutiony.value) / Number(props.resolutionx.value)) *
      10000;

    if (Number.isNaN(aspectX) || aspectX <= 0) return;
    if (Number.isNaN(aspectY) || aspectY <= 0) return;

    let factorX = [];
    let factorY = [];
    for (let i = 1; i <= aspectX; i++) {
      if (aspectX % i === 0) factorX.push(i);
      if (aspectY % i === 0) factorY.push(i);
    }

    if (!factorY.length || !factorX.length) return;

    let commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
    let greatestCommonFactor = Math.max(...commonFactors);
    aspectX /= greatestCommonFactor;
    aspectY /= greatestCommonFactor;

    let aspectRatio = aspectX + ":" + aspectY;

    setState((prevState) => ({
      ...prevState,
      aspectRatio: {
        ...prevState.aspectRatio,
        value: aspectRatio,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony]);

  // get Magnification (Mag)
  useEffect(() => {
    let mag = 0;
    let flength = Number(props.focallength.value);

    // if barlow
    let barlow = Number(props.barlow.value);
    if (barlow !== 0) flength *= barlow;

    // eyepiece
    let eyeflength = Number(props.eyepiecefocallength.value);

    mag =
      eyeflength !== 0 && flength !== 0
        ? Math.round((flength / eyeflength) * 10) / 10
        : "";

    setState((prevState) => ({
      ...prevState,
      magnification: {
        ...prevState.magnification,
        value: mag,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.eyepiecefocallength]);

  // get Max Magnification (Max Mag)
  useEffect(() => {
    let flength = Number(props.focallength.value);
    let aperture = Number(props.aperture.value);
    if (flength <= 0 || aperture <= 0) return;

    let maxMag = Math.round(aperture * 2 * 10) / 10;

    setState((prevState) => ({
      ...prevState,
      maxMagnification: {
        ...prevState.maxMagnification,
        value: maxMag,
        isChanged: true,
      },
    }));
  }, [props.focallength, props.aperture]);

  // get pxPerSquare (Grid)
  useEffect(() => {
    let resX = Number(props.resolutionx.value);
    let resY = Number(props.resolutiony.value);
    let plotX = Number(props.plotsizex);
    let plotY = Number(props.plotsizey);

    // if any of these numbers are 0, we return
    if ([resX, resY, plotX, plotY].indexOf(0) > -1) return;

    let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
    let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

    let result = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10;

    // if hasRedGrid, then the px² should be the: result * redGridFactor²?
    result = props.hasRedGrid
      ? result * (props.redGridFactor * props.redGridFactor)
      : result;

    setState((prevState) => ({
      ...prevState,
      pxPerSquare: {
        ...prevState.pxPerSquare,
        value: result + "px²",
        isChanged: true,
      },
    }));
  }, [
    props.resolutionx,
    props.resolutiony,
    props.plotsizex,
    props.plotsizey,
    props.hasRedGrid,
    props.redGridFactor,
  ]);

  // get Chip Size (Chip)
  useEffect(() => {
    let resX = Number(props.resolutionx.value);
    let resY = Number(props.resolutiony.value);
    let pixelSize = Number(props.pixelsize.value);

    if (resX === 0 || resY === 0 || pixelSize === 0) return;

    let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(
      props.resolutionx.value,
      props.resolutiony.value,
      props.pixelsize.value
    );
    let result = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";

    setState((prevState) => ({
      ...prevState,
      chipSize: {
        ...prevState.chipSize,
        value: result,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony, props.pixelsize]);

  return (
    <div
      className={
        "border border-white rounded mb-1 bg-" + props.colors.background
      }
    >
      <div className="d-flex justify-content-around">
        {Object.values(state).map((item) => {
          if (props.isEyepieceMode && item.isEyepieceInfo) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          if (
            (!props.isEyepieceMode && !item.isEyepieceInfo) ||
            item.name === "FR"
          ) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
        })}
        <Forecast isEyepieceMode={props.isEyepieceMode} colors={props.colors} />
      </div>
    </div>
  );
};

export default Info;
