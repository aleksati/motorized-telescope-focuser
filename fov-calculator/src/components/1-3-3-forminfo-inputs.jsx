import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const FormInfoInputs = (props) => {
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

  // These two functions should be in a useeffect.. So we dont need to update these on every menustate update.
  // In that case, whenever the FORMDATA is updated, these functions should fire.
  // They should update a variable, a list, which is what is returned eerything (below)
  const getAspectRatio = () => {
    // if we are in eyepiece mode, return nothing
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

  // get magnification

  // get ...

  const addInfoStyleSwitch = () => {
    return (
      <BootstrapSwitchButton
        checked={props.menustate.gridswitch}
        onlabel="Grid Off"
        onstyle="info"
        offlabel="Grid On"
        offstyle="info"
        onChange={(checked) => {
          props.onGridSwitch(checked);
        }}
        style="ml-2 mr-2"
        width="160"
        height="50"
      />
    );
  };

  const addSuccessStyleSwitch = () => {
    return (
      <BootstrapSwitchButton
        checked={props.menustate.gridswitch}
        onlabel="Grid Off"
        onstyle="success"
        offlabel="Grid On"
        offstyle="success"
        onChange={(checked) => {
          props.onGridSwitch(checked);
        }}
        style="ml-2 mr-2"
        width="160"
        height="50"
      />
    );
  };

  const inputFunks = [getFocalRatio(), getAspectRatio()];

  return (
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
      {props.formswitch ? addInfoStyleSwitch() : addSuccessStyleSwitch()}
    </div>
  );
};

export default FormInfoInputs;
