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
    <Info
      formswitch={props.menustate.formswitch}
      submit={props.menustate.submit}
      formdata={props.menustate.formdata}
      chartinfo={props.menustate.chartinfo}
    />
    <CanvasOptions
      zoomValue={props.menustate.zoomValue}
      canvasLabels={props.menustate.canvasLabels}
      formswitch={props.menustate.formswitch}
      gridswitch={props.menustate.gridswitch}
      hasRedGrid={props.menustate.hasRedGrid}
      onZoomSwitch={props.onZoomSwitch}
      onGridSwitch={props.onGridSwitch}
      onLabelSwitch={props.onLabelSwitch}
      onRedGridSwitch={props.onRedGridSwitch}
    />
  </div>
);

export default Menubar;
