import React, { useCallback, useState } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import TheWeatherTonight from "./theweather";

const FormInfo = (props) => {
  const [test, forceUpdater] = useState({});
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
    if (props.menustate.formswitch) return ["Aspect Ratio", ""];

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

  const inputFunks = [getFocalRatio(), getAspectRatio()];

  return (
    <form className="d-flex">
      <div className="form-group border border-white rounded ml-1 bg-gradient-dark">
        <h2 className="ml-2 mt-1 text-light">Info</h2>
        <div className="d-flex">
          {inputFunks.map((funk) => {
            const [name, value] = funk;
            return (
              <div className="form-label-group" key={name}>
                <input
                  type="text"
                  name={name}
                  value={value}
                  className="form-control ml-2"
                  readOnly
                />
                <label htmlFor={name}>{name}</label>
              </div>
            );
          })}
          <BootstrapSwitchButton
            checked={props.menustate.gridswitch}
            onlabel="Grid Off"
            onstyle="info"
            offlabel="Grid On"
            offstyle="success"
            onChange={(checked) => {
              props.onGridSwitch(checked);
            }}
            size=""
            style={props.formswitch ? "ml-2 mr-2" : " ml-2 mr-2"} // ARG IT DOESNT UPDATE WHEN THE STYLE IS SWITCHED.
            width="160"
            height="50"
          />
        </div>
      </div>
      <div className="form-group border border-white rounded ml-1 bg-gradient-dark">
        <h2 className="m-1 text-light">Forecast</h2>
        <TheWeatherTonight />
      </div>
    </form>
  );
};

export default FormInfo;
