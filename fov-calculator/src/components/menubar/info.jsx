import React, { useEffect, useState } from "react";
import Forecast from "./forecast";

const Info = (props) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getFocalRatio = () => {
      let barlow = Number(props.formdata.barlow.value);
      let flength = Number(props.formdata.focallength.value);
      let aperture = Number(props.formdata.aperture.value);

      if (flength <= 0 || aperture <= 0) return ["Focal Ratio", ""];
      if (barlow !== 0) flength *= barlow;
      let focalRatio = Math.floor((flength / aperture) * 10) / 10;
      if (focalRatio <= 0) return ["Focal Ratio", ""];

      return ["Focal Ratio", focalRatio];
    };

    const getAspectRatio = () => {
      let aspectX = 10000;
      let aspectY =
        (Number(props.formdata.resolutiony.value) /
          Number(props.formdata.resolutionx.value)) *
        10000;

      if (Number.isNaN(aspectX) || aspectX <= 0) return ["Aspect Ratio", ""];
      if (Number.isNaN(aspectY) || aspectY <= 0) return ["Aspect Ratio", ""];

      let factorX = [];
      let factorY = [];
      for (let i = 1; i <= aspectX; i++) {
        if (aspectX % i === 0) factorX.push(i);
        if (aspectY % i === 0) factorY.push(i);
      }

      if (!factorY.length || !factorX.length) return ["Aspect Ratio", ""];

      let commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
      let greatestCommonFactor = Math.max(...commonFactors);
      aspectX /= greatestCommonFactor;
      aspectY /= greatestCommonFactor;
      let aspectRatio = aspectX + ":" + aspectY;

      return ["Aspect Ratio", aspectRatio];
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

    const getCamResolution = () => {
      if (!props.submit) {
        return ["Px/square", ""];
      }
      let resX = Number(props.formdata.resolutionx.value);
      let resY = Number(props.formdata.resolutiony.value);
      let plotX = Number(props.chartinfo.plotSizeX);
      let plotY = Number(props.chartinfo.plotSizeY);

      if (resX === 0 || resY === 0) return ["Px/square", ""];
      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      let res = pixelsPerUnitX + " x " + pixelsPerUnitY;
      return ["Px/square", res];
    };

    let infoBar = [];
    infoBar.push(getFocalRatio());
    infoBar.push(getMaxMagnification());
    if (props.formswitch) {
      // eyepiece mode
      infoBar.push(getMagnification());
    } else {
      // cameras mode
      infoBar.push(getAspectRatio());
      infoBar.push(getCamResolution());
    }
    setState(infoBar);
  }, [props.formdata, props.formswitch, props.submit, props.chartinfo]);

  const borderColor = () => {
    let css = "text-light text-center col-auto border rounded ";
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
              <p className="text-light mr-2">
                <small>{name}</small>
              </p>
              <p className={borderColor()}>{value}</p>
            </div>
          );
        })}
        <Forecast formswitch={props.formswitch} />
      </div>
    </div>
  );
};

export default Info;
