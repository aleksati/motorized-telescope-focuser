import React, { useEffect, useState } from "react";
import Forecast from "./forecast";

const Info = (props) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getFocalRatio = () => {
      let barlow = Number(props.menustate.formdata.barlow.value);
      let flength = Number(props.menustate.formdata.focallength.value);
      let aperture = Number(props.menustate.formdata.aperture.value);

      if (flength <= 0 || aperture <= 0) return ["Focal Ratio", ""];
      if (barlow !== 0) flength *= barlow;
      let focalRatio = Math.floor((flength / aperture) * 10) / 10;
      if (focalRatio <= 0) return ["Focal Ratio", ""];

      return ["Focal Ratio", focalRatio];
    };

    const getAspectRatio = () => {
      let aspectX = 10000;
      let aspectY =
        (Number(props.menustate.formdata.resolutiony.value) /
          Number(props.menustate.formdata.resolutionx.value)) *
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
      let flength = Number(props.menustate.formdata.focallength.value);

      // if barlow
      let barlow = Number(props.menustate.formdata.barlow.value);
      if (barlow !== 0) flength *= barlow;

      // eyepiece
      let eyeflength = Number(
        props.menustate.formdata.eyepiecefocallength.value
      );

      mag = eyeflength !== 0 && flength !== 0 ? flength / eyeflength : "";

      return ["Magnification", mag];
    };

    const getCamResolution = () => {
      if (!props.menustate.submit) {
        return ["Px per square", ""];
      }
      let resX = Number(props.menustate.formdata.resolutionx.value);
      let resY = Number(props.menustate.formdata.resolutiony.value);
      let plotX = Number(props.menustate.chartinfo.plotSizeX);
      let plotY = Number(props.menustate.chartinfo.plotSizeY);

      if (resX === 0 || resY === 0) return ["Px per canvas square²", ""];
      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      let res = pixelsPerUnitX + " x " + pixelsPerUnitY;
      return ["Px per square", res];
    };

    let newState = [];
    newState.push(getFocalRatio());
    if (props.menustate.formswitch) {
      // eyepiece mode
      newState.push(getMagnification());
    } else {
      // cameras mode
      newState.push(getAspectRatio());
      newState.push(getCamResolution());
    }
    setState(newState);
  }, [
    props.menustate.formdata,
    props.menustate.formswitch,
    props.menustate.submit,
    props.menustate.chartinfo,
  ]);

  const bgColor = () => {
    let css = "text-light text-center col-auto bg-black border rounded ";
    let bg = props.menustate.formswitch ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="border border-white rounded ml-1 mb-1 bg-gradient-dark">
      <div className="d-flex justify-content-around">
        {state.map((item) => {
          const [name, value] = item;
          return (
            <div className="form-label-group mb-0 mt-2" key={name}>
              <p className="text-light mr-2">
                <small>{name}</small>
              </p>
              <p className={bgColor()}>{value}</p>
            </div>
          );
        })}
        <div className="form-label-group mb-0" key={"forecast"}>
          <p className="text-light mr-2 mt-2">
            <small>Forecast</small>
          </p>
          <Forecast />
        </div>
      </div>
    </div>
  );
};

//   let unitLabel = "";
//   switch (props.menustate.chartinfo.axisLabel) {
//     case "Seconds of Arc":
//       unitLabel = "′′";
//       break;
//     case "Minutes of Arc":
//       unitLabel = "′";
//       break;
//     case "Degrees":
//       unitLabel = "°";
//       break;
//   }

export default Info;
