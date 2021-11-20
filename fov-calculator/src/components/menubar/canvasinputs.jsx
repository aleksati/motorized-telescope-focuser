import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const CanvasInputs = (props) => {
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
  return (
    <div className="d-flex">
      {props.formswitch ? addInfoStyleSwitch() : addSuccessStyleSwitch()}
    </div>
  );
};

export default CanvasInputs;
