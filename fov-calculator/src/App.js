import React, { useState } from "react";
import Menubar from "./components/menubar/menubar";
import Canvas from "./components/canvas";
import {
  camCanvasSize,
  eyepieceCanvasSize,
  initFormData,
  initCanvasData,
  initColorData,
} from "./components/menubar/utils-menubar.js";

const App = () => {
  const colors = initColorData;
  const [formData, setFormData] = useState(initFormData);
  // When changing the mode and adding any new form info,
  // the subitflag goes to false.
  const [isSubmit, setSubmit] = useState(false);
  const [canvasData, setCanvasData] = useState(initCanvasData);

  const handleModeChange = (bool) => {
    setFormData(initFormData);
    setCanvasData({
      ...initCanvasData,
      isEyepieceMode: bool,
    });
    if (isSubmit) setSubmit(false);
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

    setFormData(formDataCopy);
    if (isSubmit) setSubmit(false);
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

    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      ...newchartinfo,
    }));

    if (!isSubmit) setSubmit(true);
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
        colors={colors}
        isSubmit={isSubmit}
      />
      <Canvas canvasData={canvasData} colors={colors} />
    </div>
  );
};

export default App;
