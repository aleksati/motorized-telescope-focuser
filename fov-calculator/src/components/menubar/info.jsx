import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import { microns2milimeter } from "../utils-formdata2chartsize.js";

const Info = (props) => {
  const [state, setState] = useState([]);
  // get the hasRedGrid prop and the redgridvalue

  // the central state should have:
  // aspectRatio
  // name :
  // value :
  // isEyepieceInfo: bool
  // focalRatio
  // magnification
  // maxMagnification

  // in main return:
  // Object.values(main).map((item) => {})
  // if (props.isEyepieceMode && item.isEyepieceInfo) {return the item with item.name , item.value etc..}
  // if (!props.isEyepieceMode && !item.isEyepieceInfo) {return the item}

  // formData:
  // focallength
  // barlow
  // aperture
  // resolutionx and y
  // eyepiecefocallength

  // canvasData:
  // plotsizeX
  // plotsizeY
  // pixelsize

  useEffect(() => {
    const getFocalRatio = () => {
      let barlow = Number(props.formData.barlow.value);
      let flength = Number(props.formData.focallength.value);
      let aperture = Number(props.formData.aperture.value);

      if (flength <= 0 || aperture <= 0) return ["F", ""];
      if (barlow !== 0) flength *= barlow;
      let focalRatio = Math.floor((flength / aperture) * 10) / 10;
      if (focalRatio <= 0) return ["F", ""];

      return ["F", focalRatio];
    };

    const getAspectRatio = () => {
      let aspectX = 10000;
      let aspectY =
        (Number(props.formData.resolutiony.value) /
          Number(props.formData.resolutionx.value)) *
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
      let flength = Number(props.formData.focallength.value);

      // if barlow
      let barlow = Number(props.formData.barlow.value);
      if (barlow !== 0) flength *= barlow;

      // eyepiece
      let eyeflength = Number(props.formData.eyepiecefocallength.value);

      mag = eyeflength !== 0 && flength !== 0 ? flength / eyeflength : "";

      return ["Mag", mag];
    };

    const getMaxMagnification = () => {
      let flength = Number(props.formData.focallength.value);
      let aperture = Number(props.formData.aperture.value);
      if (flength <= 0 || aperture <= 0) return ["Max Mag", ""];
      return ["Max Mag", aperture * 2];
    };

    const getPxPerSquare = () => {
      if (!props.submitFlag) return ["Grid □", ""];

      let resX = Number(props.formData.resolutionx.value);
      let resY = Number(props.formData.resolutiony.value);
      let plotX = Number(props.chartinfo.plotSizeX);
      let plotY = Number(props.chartinfo.plotSizeY);

      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      let res = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10; // pixelsPerUnitX + " x " + pixelsPerUnitY;
      return ["Grid □", res + "px²"];
    };

    const getChipSize = () => {
      let resX = Number(props.formData.resolutionx.value);
      let resY = Number(props.formData.resolutiony.value);
      let pixelSize = Number(props.formData.pixelsize.value);
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
  }, [props.formData, props.isEyepieceMode, props.submitFlag, props.chartinfo]);

  const borderStyle = () => {
    let css = "info-items text-light text-center col-auto border rounded ";
    let bg = props.isEyepieceMode ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="border border-white rounded mb-1 bg-gradient-dark">
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
