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
      isEyepieceMode={props.menustate.formswitch}
      formData={props.menustate.formdata}
      onFormChange={props.onFormChange}
      onFormSubmit={props.onFormSubmit}
    />
    <Info
      isEyepieceMode={props.menustate.formswitch}
      submitFlag={props.menustate.submit}
      formData={props.menustate.formdata}
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
