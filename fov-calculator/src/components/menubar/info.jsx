import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import { microns2milimeter } from "../utils-formdata2chartsize.js";

const Info = (props) => {
  const [state, setState] = useState([]);
  // get the hasRedGrid prop and the redgridvalue

  useEffect(() => {
    const getFocalRatio = () => {
      let barlow = Number(props.formdata.barlow.value);
      let flength = Number(props.formdata.focallength.value);
      let aperture = Number(props.formdata.aperture.value);

      if (flength <= 0 || aperture <= 0) return ["F", ""];
      if (barlow !== 0) flength *= barlow;
      let focalRatio = Math.floor((flength / aperture) * 10) / 10;
      if (focalRatio <= 0) return ["F", ""];

      return ["F", focalRatio];
    };

    const getAspectRatio = () => {
      let aspectX = 10000;
      let aspectY =
        (Number(props.formdata.resolutiony.value) /
          Number(props.formdata.resolutionx.value)) *
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
      let flength = Number(props.formdata.focallength.value);

      // if barlow
      let barlow = Number(props.formdata.barlow.value);
      if (barlow !== 0) flength *= barlow;

      // eyepiece
      let eyeflength = Number(props.formdata.eyepiecefocallength.value);

      mag = eyeflength !== 0 && flength !== 0 ? flength / eyeflength : "";

      return ["Mag", mag];
    };

    const getMaxMagnification = () => {
      let flength = Number(props.formdata.focallength.value);
      let aperture = Number(props.formdata.aperture.value);
      if (flength <= 0 || aperture <= 0) return ["Max Mag", ""];
      return ["Max Mag", aperture * 2];
    };

    const getPxPerSquare = () => {
      if (!props.submit) return ["Grid □", ""];

      let resX = Number(props.formdata.resolutionx.value);
      let resY = Number(props.formdata.resolutiony.value);
      let plotX = Number(props.chartinfo.plotSizeX);
      let plotY = Number(props.chartinfo.plotSizeY);

      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      let res = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10; // pixelsPerUnitX + " x " + pixelsPerUnitY;
      return ["Grid □", res + "px²"];
    };

    const getChipSize = () => {
      let resX = Number(props.formdata.resolutionx.value);
      let resY = Number(props.formdata.resolutiony.value);
      let pixelSize = Number(props.formdata.pixelsize.value);
      if (resX === 0 || resY === 0 || pixelSize === 0) return ["Chip", ""];
      let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(props.formdata);
      let result = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";
      return ["Chip", result];
    };

    let infoBar = [];
    infoBar.push(getFocalRatio());
    if (props.formswitch) {
      // eyepiece mode
      infoBar.push(getMaxMagnification());
      infoBar.push(getMagnification());
    } else {
      // cameras mode
      infoBar.push(getChipSize());
      infoBar.push(getAspectRatio());
      infoBar.push(getPxPerSquare());
    }
    setState(infoBar);
  }, [props.formdata, props.formswitch, props.submit, props.chartinfo]);

  const borderColor = () => {
    let css = "info-items text-light text-center col-auto border rounded ";
    let bg = props.formswitch ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="border border-white rounded mb-1 bg-gradient-dark">
      <div className="d-flex justify-content-around">
        {state.map((item) => {
          const [name, value] = item;
          return (
            <div className="form-label-group mb-0 mt-2" key={name}>
              <p className="text-light mr-1">
                <small>{name}</small>
              </p>
              <p className={borderColor()}>{value}</p>
            </div>
          );
        })}
        <Forecast formswitch={props.formswitch} borderColor={borderColor()} />
      </div>
    </div>
  );
};

export default Info;
