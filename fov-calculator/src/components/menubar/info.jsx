import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import { microns2milimeter } from "../utils-menubar.js";

const Info = (props) => {
  const [state, setState] = useState({
    focalRatio: { name: "FR", value: "", isEyepieceInfo: true },
    aspectRatio: { name: "AR", value: "", isEyepieceInfo: false },
    magnification: { name: "CurrMag", value: "", isEyepieceInfo: true },
    maxMagnification: { name: "MaxMag", value: "", isEyepieceInfo: true },
    pxPerSquare: { name: "Grid □", value: "", isEyepieceInfo: false },
    chipSize: { name: "Chip", value: "", isEyepieceInfo: false },
  });

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

    mag = eyeflength !== 0 && flength !== 0 ? flength / eyeflength : "";

    setState((prevState) => ({
      ...prevState,
      magnification: {
        ...prevState.magnification,
        value: mag,
      },
    }));
  }, [props.barlow, props.focallength, props.eyepiecefocallength]);

  // get Max Magnification (Max Mag)
  useEffect(() => {
    let flength = Number(props.focallength.value);
    let aperture = Number(props.aperture.value);
    if (flength <= 0 || aperture <= 0) return;

    setState((prevState) => ({
      ...prevState,
      maxMagnification: {
        ...prevState.maxMagnification,
        value: aperture * 2,
      },
    }));
  }, [props.focallength, props.aperture]);

  // get pxPerSquare (Grid)
  useEffect(() => {
    if (!props.submitFlag) return;

    let resX = Number(props.resolutionx.value);
    let resY = Number(props.resolutiony.value);
    let plotX = Number(props.plotsizex);
    let plotY = Number(props.plotsizey);

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
      },
    }));
  }, [
    props.submitFlag,
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
      },
    }));
  }, [props.resolutionx, props.resolutiony, props.pixelsize]);

  // style of the borders around the text
  const borderStyle = () => {
    let css = "info-items text-light text-center col-auto border rounded ";
    let bg = props.isEyepieceMode ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="border border-white rounded mb-1 bg-gradient-dark">
      <div className="d-flex justify-content-around">
        {Object.values(state).map((item) => {
          if (props.isEyepieceMode && item.isEyepieceInfo) {
            return (
              <InfoInput
                borderStyle={borderStyle()}
                key={item.name}
                name={item.name}
                value={item.value}
              />
            );
          }
          if (
            (!props.isEyepieceMode && !item.isEyepieceInfo) ||
            item.name === "FR"
          ) {
            return (
              <InfoInput
                borderStyle={borderStyle()}
                key={item.name}
                name={item.name}
                value={item.value}
              />
            );
          }
        })}
        <Forecast
          isEyepieceMode={props.isEyepieceMode}
          borderStyle={borderStyle()}
        />
      </div>
    </div>
  );
};

export default Info;
