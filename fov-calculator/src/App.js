import React, { useState } from "react";
import Menubar from "./components/menubar/menubar";
import Canvas from "./components/canvas";
import {
  camCanvasSize,
  eyepieceCanvasSize,
} from "./components/menubar/utils-menubar.js";

const App = () => {
  const [formData, addFormData] = useState({
    aperture: {
      ref: "aperture",
      value: "",
      required: true,
      type: "number",
      name: "Aperture",
      unit: "mm",
    },
    focallength: {
      ref: "focallength",
      value: "",
      required: true,
      type: "number",
      name: "Flength",
      unit: "mm",
    },
    barlow: {
      ref: "barlow",
      value: "",
      required: false,
      type: "number",
      name: "Barlow",
      unit: "x",
    },
    pixelsize: {
      ref: "pixelsize",
      value: "",
      required: true,
      type: "number",
      name: "Pixel Size",
      unit: "μm²",
    },
    resolutionx: {
      ref: "resolutionx",
      value: "",
      required: true,
      type: "number",
      name: "Res (X)",
      unit: "px",
    },
    resolutiony: {
      ref: "resolutiony",
      value: "",
      required: true,
      type: "number",
      name: "Res (Y)",
      unit: "px",
    },
    eyepiecefocallength: {
      ref: "eyepiecefocallength",
      value: "",
      required: true,
      type: "number",
      name: "Flength",
      unit: "mm",
    },
    eyepieceafov: {
      ref: "eyepieceafov",
      value: "",
      required: true,
      type: "number",
      name: "AFOV",
      unit: "°",
    },
  });
  const [submitFlag, regSubmitFlag] = useState(false);
  const [canvasData, setCanvasData] = useState({
    isEyepieceMode: true,
    hasGrid: true,
    hasLabels: true,
    hasRedGrid: false,
    redGridFactor: 6,
    zoomValue: 100,
    plotSizeX: 20,
    plotSizeY: 20,
    plotDivisor: 6,
    axisLabel: "Minutes of Arc",
  });
  const [color, setColor] = useState({
    eyepieceMode: "info",
    cameraMode: "success",
  });

  const handleModeChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      isEyepieceMode: bool,
    }));
    regSubmitFlag(false);
  };

  const handleGridChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      hasGrid: bool,
    }));
  };

  const handleLabelChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      hasLabels: bool,
    }));
  };

  const handleRedGridChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      hasRedGrid: bool,
    }));
  };

  const handleZoomChange = (e) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      zoomValue: e,
    }));
  };

  const handleFormChange = (e) => {
    let newValue = e.target.value;
    let keyRef = e.target.id;
    let formDataCopy = { ...formData };
    let keyCopy = { ...formDataCopy[keyRef] };
    keyCopy.value = newValue;
    formDataCopy[keyRef] = keyCopy;

    addFormData(formDataCopy);
    regSubmitFlag(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // update the chart size and config
    let newchartinfo = canvasData.isEyepieceMode
      ? eyepieceCanvasSize(
          formData.eyepieceafov.value,
          formData.eyepiecefocallength.value,
          formData.focallength.value,
          formData.barlow.value
        )
      : camCanvasSize(
          formData.pixelsize.value,
          formData.resolutionx.value,
          formData.resolutiony.value,
          formData.focallength.value,
          formData.barlow.value
        );

    // hope this works :/
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      ...newchartinfo,
    }));
    regSubmitFlag(true);
  };

  return (
    <div className="App">
      <Menubar
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
        onModeChange={handleModeChange}
        onGridChange={handleGridChange}
        onRedGridChange={handleRedGridChange}
        onLabelChange={handleLabelChange}
        onZoomChange={handleZoomChange}
        formData={formData}
        canvasData={canvasData}
        submitFlag={submitFlag}
      />
      <Canvas canvasData={canvasData} />
    </div>
  );
};

export default App;
