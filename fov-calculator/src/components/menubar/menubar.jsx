import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import Info from "./info";
import CanvasOptions from "./canvasoptions";

const Menubar = (props) => (
  <div className="container p-0">
    <BootstrapSwitchButton
      checked={props.menustate.formswitch}
      onlabel="Camera"
      onstyle="info"
      offlabel="Eyepiece"
      offstyle="success"
      onChange={props.onFormSwitch}
      style="w-100 mb-1 mt-2"
    />
    <Form
      formswitch={props.menustate.formswitch}
      formdata={props.menustate.formdata}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
    />
    <Info menustate={props.menustate} />
    <CanvasOptions
      zoomValue={props.menustate.zoomValue}
      canvasLabels={props.menustate.canvasLabels}
      formswitch={props.menustate.formswitch}
      gridswitch={props.menustate.gridswitch}
      onZoomSwitch={props.onZoomSwitch}
      onGridSwitch={props.onGridSwitch}
      onLabelSwitch={props.onLabelSwitch}
    />
  </div>
);

export default Menubar;
