import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import Info from "./info";
import CanvasOptions from "./canvasoptions";

const Menubar = (props) => (
  <div className="container p-0">
    <BootstrapSwitchButton
      checked={props.canvasData.isEyepieceMode}
      onlabel="Camera"
      onstyle="info"
      offlabel="Eyepiece"
      offstyle="success"
      onChange={props.onModeChange}
      style="w-100 mb-1 mt-2"
    />
    <Form
      isEyepieceMode={props.canvasData.isEyepieceMode}
      formData={props.formData}
      onFormChange={props.onFormChange}
      onFormSubmit={props.onFormSubmit}
    />
    <Info
      isEyepieceMode={props.canvasData.isEyepieceMode}
      hasRedGrid={props.canvasData.hasRedGrid}
      redGridFactor={props.canvasData.redGridFactor}
      submitFlag={props.submitFlag}
      focallength={props.formData.focallength}
      barlow={props.formData.barlow}
      aperture={props.formData.aperture}
      resolutionx={props.formData.resolutionx}
      resolutiony={props.formData.resolutiony}
      pixelsize={props.formData.pixelsize}
      eyepiecefocallength={props.formData.eyepiecefocallength}
      plotsizex={props.canvasData.plotSizeX}
      plotsizey={props.canvasData.plotSizeY}
    />
    <CanvasOptions
      zoomValue={props.canvasData.zoomValue}
      hasLabels={props.canvasData.hasLabels}
      isEyepieceMode={props.canvasData.isEyepieceMode}
      hasGrid={props.canvasData.hasGrid}
      hasRedGrid={props.canvasData.hasRedGrid}
      onZoomChange={props.onZoomChange}
      onGridChange={props.onGridChange}
      onLabelChange={props.onLabelChange}
      onRedGridChange={props.onRedGridChange}
    />
  </div>
);

export default Menubar;
