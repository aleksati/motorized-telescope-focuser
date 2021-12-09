import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import { microns2milimeter } from "../utils-formdata2chartsize.js";

const Info = (props) => {
  const [state, setState] = useState([]);
  // get the hasRedGrid prop and the redgridvalue

  const [newState, setNewState] = useState();

  // on Mount and new eyePiecemode change .. maybe this works as a way to reset the state when switching between modeS?
  useEffect(() => {
    setNewState({
      aspectRatio: { name: "AR", value: "", isEyepieceInfo: false },
      focalRatio: { name: "F", value: "", isEyepieceInfo: true },
      magnification: { name: "Mag", value: "", isEyepieceInfo: true },
      maxMagnification: { name: "MaxMag", value: "", isEyepieceInfo: true },
      pxPerSquare: { name: "Grid □", value: "", isEyepieceInfo: false },
      chipSize: { name: "Chip", value: "", isEyepieceInfo: false },
    });
  }, [props.isEyepieceMode]);

  // get Focal Ratio (F number)
  useEffect(() => {
    let barlow = Number(props.barlow.value);
    let flength = Number(props.focallength.value);
    let aperture = Number(props.aperture.value);

    if (flength <= 0 || aperture <= 0) return;
    if (barlow !== 0) flength *= barlow;
    let focalRatio = Math.floor((flength / aperture) * 10) / 10;
    if (focalRatio <= 0) return;

    setNewState((prevState) => ({
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

    setNewState((prevState) => ({
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

    setNewState((prevState) => ({
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

    setNewState((prevState) => ({
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

    let res = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10; // pixelsPerUnitX + " x " + pixelsPerUnitY;

    setNewState((prevState) => ({
      ...prevState,
      pxPerSquare: {
        ...prevState.pxPerSquare,
        value: res + "px²",
      },
    }));
  }, [
    props.submitFlag,
    props.resolutionx,
    props.resolutiony,
    props.plotsizex,
    props.plotsizey,
  ]);

  // get Chip Size (Chip) THIS STILL NEEDS WORK ..
  useEffect(() => {
    let resX = Number(props.resolutionx.value);
    let resY = Number(props.resolutiony.value);
    let pixelSize = Number(props.pixelsize.value);

    if (resX === 0 || resY === 0 || pixelSize === 0) return;
    let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(props.formData);
    let result = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";

    setNewState((prevState) => ({
      ...prevState,
      chipSize: {
        ...prevState.chipSize,
        value: result,
      },
    }));
  }, [
    props.resolutiony,
    props.resolutiony,
    props.pixelsize,
    microns2milimeter,
    props.formData,
  ]);

  // in main return:
  // Object.values(main).map((item) => {
  // if (props.isEyepieceMode && item.isEyepieceInfo) return <InfoInput borderStyle={borderStyle()} key={item.name} name={item.name} value={item.value} />
  // if (!props.isEyepieceMode && !item.isEyepieceInfo) return <InfoInput borderStyle={borderStyle()} key={item.name} name={item.name} value={item.value} />
  // })

  useEffect(() => {
    const getFocalRatio = () => {
      let barlow = Number(props.barlow.value);
      let flength = Number(props.focallength.value);
      let aperture = Number(props.aperture.value);

      if (flength <= 0 || aperture <= 0) return ["F", ""];
      if (barlow !== 0) flength *= barlow;
      let focalRatio = Math.floor((flength / aperture) * 10) / 10;
      if (focalRatio <= 0) return ["F", ""];

      return ["F", focalRatio];
    };

    const getAspectRatio = () => {
      let aspectX = 10000;
      let aspectY =
        (Number(props.resolutiony.value) / Number(props.resolutionx.value)) *
        10000;

      if (Number.isNaN(aspectX) || aspectX <= 0) return ["AR", ""];
      if (Number.isNaN(aspectY) || aspectY <= 0) return ["AR", ""];

      let factorX = [];
      let factorY = [];
      for (let i = 1; i <= aspectX; i++) {
        if (aspectX % i === 0) factorX.push(i);
        if (aspectY % i === 0) factorY.push(i);
      }

      if (!factorY.length || !factorX.length) return ["AR", ""];

      let commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
      let greatestCommonFactor = Math.max(...commonFactors);
      aspectX /= greatestCommonFactor;
      aspectY /= greatestCommonFactor;
      let aspectRatio = aspectX + ":" + aspectY;

      return ["AR", aspectRatio];
    };

    const getMagnification = () => {
      let mag = 0;
      let flength = Number(props.focallength.value);

      // if barlow
      let barlow = Number(props.barlow.value);
      if (barlow !== 0) flength *= barlow;

      // eyepiece
      let eyeflength = Number(props.eyepiecefocallength.value);

      mag = eyeflength !== 0 && flength !== 0 ? flength / eyeflength : "";

      return ["Mag", mag];
    };

    const getMaxMagnification = () => {
      let flength = Number(props.focallength.value);
      let aperture = Number(props.aperture.value);
      if (flength <= 0 || aperture <= 0) return ["Max Mag", ""];
      return ["Max Mag", aperture * 2];
    };

    const getPxPerSquare = () => {
      if (!props.submitFlag) return ["Grid □", ""];

      let resX = Number(props.resolutionx.value);
      let resY = Number(props.resolutiony.value);
      let plotX = Number(props.plotsizex);
      let plotY = Number(props.plotsizey);

      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      let res = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10; // pixelsPerUnitX + " x " + pixelsPerUnitY;
      return ["Grid □", res + "px²"];
    };

    const getChipSize = () => {
      let resX = Number(props.resolutionx.value);
      let resY = Number(props.resolutiony.value);
      let pixelSize = Number(props.pixelsize.value);
      if (resX === 0 || resY === 0 || pixelSize === 0) return ["Chip", ""];
      let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(props.formData);
      let result = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";
      return ["Chip", result];
    };

    let infoBar = [];
    infoBar.push(getFocalRatio());
    if (props.isEyepieceMode) {
      // eyepiece mode
      infoBar.push(getMagnification());
      infoBar.push(getMaxMagnification());
    } else {
      // cameras mode
      infoBar.push(getChipSize());
      infoBar.push(getAspectRatio());
      infoBar.push(getPxPerSquare());
    }
    setState(infoBar);
  }, [
    props.formData,
    props.isEyepieceMode,
    props.submitFlag,
    props.focallength,
    props.barlow,
    props.aperture,
    props.resolutionx,
    props.resolutiony,
    props.eyepiecefocallength,
    props.plotsizex,
    props.plotsizey,
    props.pixelsize,
  ]);

  const borderStyle = () => {
    let css = "info-items text-light text-center col-auto border rounded ";
    let bg = props.isEyepieceMode ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="border border-white rounded mb-1 bg-gradient-dark">
      {console.log(newState)}
      <div className="d-flex justify-content-around">
        {state.map((item) => {
          const [name, value] = item;
          return (
            <InfoInput
              borderStyle={borderStyle()}
              key={name}
              name={name}
              value={value}
            />
          );
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
