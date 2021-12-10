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
      isEyepieceMode={props.menustate.formswitch} //canvasData
      submitFlag={props.menustate.submit} // submitFlag
      focallength={props.menustate.formdata.focallength}
      barlow={props.menustate.formdata.barlow}
      aperture={props.menustate.formdata.aperture}
      resolutionx={props.menustate.formdata.resolutionx}
      resolutiony={props.menustate.formdata.resolutiony}
      pixelsize={props.menustate.formdata.pixelsize}
      eyepiecefocallength={props.menustate.formdata.eyepiecefocallength}
      plotsizex={props.menustate.chartinfo.plotSizeX}
      plotsizey={props.menustate.chartinfo.plotSizeY}
    />
    <CanvasOptions
      zoomValue={props.menustate.zoomValue}
      hasLabels={props.menustate.canvasLabels}
      isEyepieceMode={props.menustate.formswitch}
      hasGrid={props.menustate.gridswitch}
      hasRedGrid={props.menustate.hasRedGrid}
      onZoomChange={props.onZoomChange}
      onGridChange={props.onGridChange}
      onLabelChange={props.onLabelChange}
      onRedGridChange={props.onRedGridChange}
    />
  </div>
);

export default Menubar;
