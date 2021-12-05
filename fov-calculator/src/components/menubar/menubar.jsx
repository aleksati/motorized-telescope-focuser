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
      onChange={props.onModeChange}
      style="w-100 mb-1 mt-2"
    />
    <Form
      formswitch={props.menustate.formswitch}
      formdata={props.menustate.formdata}
      onFormChange={props.onFormChange}
      onFormSubmit={props.onFormSubmit}
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
      onZoomChange={props.onZoomChange}
      onGridChange={props.onGridChange}
      onLabelChange={props.onLabelChange}
      onRedGridChange={props.onRedGridChange}
    />
  </div>
);

export default Menubar;
