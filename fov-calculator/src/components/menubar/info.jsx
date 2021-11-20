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

    const getResolution = () => {
      // yes..
    };

    let newState = [];
    newState.push(getFocalRatio());
    if (props.menustate.formswitch) {
      // eyepiece mode.
      newState.push(getMagnification());
    } else {
      // get resolution
      newState.push(getAspectRatio());
    }

    setState(newState);
  }, [props.menustate.formdata, props.menustate.formswitch]);

  const bgColor = () => {
    let css = "text-light text-center border rounded col ";
    let bg = props.menustate.formswitch ? "border-info" : "border-success";
    return css + bg;
  };

  return (
    <div className="d-flex mb-2">
      <div className="d-flex form-group border border-white rounded ml-1 bg-dark col">
        {state.map((item) => {
          const [name, value] = item;
          return (
            <div className="form-label-group col mt-2 mb-0" key={name}>
              <p className="text-light mr-2">
                <small>{name}</small>
              </p>
              <p className={bgColor()}>{value}</p>
            </div>
          );
        })}
        <div className="form-label-group col mb-0" key={"forecast"}>
          <p className="text-light mr-2 mt-2">
            <small>Forecast</small>
          </p>
          <Forecast />
        </div>
      </div>
    </div>
  );
};

export default Info;
