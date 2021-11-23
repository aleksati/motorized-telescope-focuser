import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import Info from "./info";
import CanvasOptions from "./canvasoptions";

const Menubar = (props) => (
  <div className="container">
    <BootstrapSwitchButton
      checked={props.menustate.formswitch}
      onlabel="Camera"
      onstyle="info"
      offlabel="Eyepiece"
      offstyle="success"
      onChange={props.onFormSwitch}
      style="w-100 ml-1 mb-1 mr-1 mt-2"
    />
    <Form
      formswitch={props.menustate.formswitch}
      formdata={props.menustate.formdata}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
    />
    <Info menustate={props.menustate} />
    <CanvasOptions
      menustate={props.menustate}
      onGridSwitch={props.onGridSwitch}
      formswitch={props.menustate.formswitch}
      onCanvasZoom={props.onCanvasZoom}
      zoomValue={props.zoomValue}
    />
  </div>
);

export default Menubar;
