import React, { useState } from "react";
import Menubar from "./components/menubar/menubar";
import Canvas from "./components/canvas";
import {
  camCanvasSize,
  eyepieceCanvasSize,
} from "./components/utils-formdata2chartsize.js";

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
  const [submit, regSubmit] = useState(false);
  const [canvasData, setCanvasData] = useState({
    isEyepieceMode: true,
    hasGrid: true,
    hasLabels: true,
    hasRedGrid: false,
    zoomValue: 100,
    plotSizeX: 20,
    plotSizeY: 20,
    plotDivisor: 6,
    axisLabel: "Minutes of Arc",
  });

  const handleModeChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      isEyepieceMode: bool,
    }));
    regSubmit(false);
  };

  const handleGridChange = (bool) => {
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      hasGrid: bool,
    }));
  };

  const handleGridChange = (bool) => {
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
    regSubmit(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // update the chart size and config
    let newchartinfo = canvas.isEyepieceMode
      ? eyepieceCanvasSize(formData)
      : camCanvasSize(formData);

    // hope this works :/
    setCanvasData((prevCanvas) => ({
      ...prevCanvas,
      ...newchartinfo,
    }));
    regSubmit(true);
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
        menustate={state.menustate}
        formData={formData}
        canvasData={canvasData}
      />
      <Canvas
        canvasData={canvasData}
        // chartinfo={this.state.menustate.chartinfo}
        // hasGrid={this.state.menustate.gridswitch}
        // hasLabels={this.state.menustate.canvasLabels}
        // hasRedGrid={this.state.menustate.hasRedGrid}
        // isEyepieceMode={this.state.menustate.formswitch}
        // zoomValue={this.state.menustate.zoomValue}
      />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       menustate: {
//         // or change name to form. also have a plot.
//         // then just "data", instead of formdata.
//         // should actually be canvas.hasGrid
//         // and, canvas.plotSize
//         formdata: {
//           aperture: {
//             ref: "aperture",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Aperture",
//             unit: "mm",
//           },
//           focallength: {
//             ref: "focallength",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Flength",
//             unit: "mm",
//           },
//           barlow: {
//             ref: "barlow",
//             value: "",
//             required: false,
//             type: "number",
//             name: "Barlow",
//             unit: "x",
//           },
//           pixelsize: {
//             ref: "pixelsize",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Pixel Size",
//             unit: "μm²",
//           },
//           resolutionx: {
//             ref: "resolutionx",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Res (X)",
//             unit: "px",
//           },
//           resolutiony: {
//             ref: "resolutiony",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Res (Y)",
//             unit: "px",
//           },
//           eyepiecefocallength: {
//             ref: "eyepiecefocallength",
//             value: "",
//             required: true,
//             type: "number",
//             name: "Flength",
//             unit: "mm",
//           },
//           eyepieceafov: {
//             ref: "eyepieceafov",
//             value: "",
//             required: true,
//             type: "number",
//             name: "AFOV",
//             unit: "°",
//           },
//         },
//         formswitch: true, // change name to eyepieceMode" data.isEyepieceMode
//         gridswitch: true, // canvas.hasGrid
//         canvasLabels: true, // canvas.hasLabels
//         hasRedGrid: false, // reduced gridlines.
//         submit: false, // should be form.hasSubmit
//         zoomValue: 100,
//         chartinfo: {
//           plotSizeX: 20,
//           plotSizeY: 20,
//           plotDivisor: 6,
//           axisLabel: "Minutes of Arc",
//         },
//       },
//     };
//     this.handleModeChange = this.handleModeChange.bind(this);
//     this.handleGridChange = this.handleGridChange.bind(this);
//     this.handleLabelChange = this.handleLabelChange.bind(this);
//     this.handleFormChange = this.handleFormChange.bind(this);
//     this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     this.handleZoomChange = this.handleZoomChange.bind(this);
//     this.handleRedGridChange = this.handleRedGridChange.bind(this);
//   }

//   handleModeChange(bool) {
//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         formswitch: bool,
//         submit: false,
//       },
//     }));
//   }

//   handleGridChange(bool) {
//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         gridswitch: bool,
//       },
//     }));
//   }

//   handleLabelChange(bool) {
//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         canvasLabels: bool,
//       },
//     }));
//   }

//   handleRedGridChange(bool) {
//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         hasRedGrid: bool,
//       },
//     }));
//   }

//   handleFormChange(e) {
//     let newValue = e.target.value;
//     let keyRef = e.target.id;
//     let formdataCopy = { ...this.state.menustate.formdata };
//     let keyCopy = { ...formdataCopy[keyRef] };
//     keyCopy.value = newValue;
//     formdataCopy[keyRef] = keyCopy;

//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         formdata: formdataCopy,
//         submit: false,
//       },
//     }));
//   }

//   handleFormSubmit(e) {
//     e.preventDefault();

//     // update the chart size and config
//     let newchartinfo = this.state.menustate.formswitch
//       ? eyepieceChartSize(this.state.menustate.formdata)
//       : camChartSize(this.state.menustate.formdata);

//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         chartinfo: newchartinfo,
//         submit: true,
//       },
//     }));
//   }

//   handleZoomChange(e) {
//     this.setState((prevState) => ({
//       menustate: {
//         ...prevState.menustate,
//         zoomValue: e,
//       },
//     }));
//   }

//   render() {
//     return (
//       <div className="App">
//         <Menubar
//           onFormChange={this.handleFormChange}
//           onFormSubmit={this.handleFormSubmit}
//           onModeChange={this.handleModeChange}
//           onGridChange={this.handleGridChange}
//           onRedGridChange={this.handleRedGridChange}
//           onLabelChange={this.handleLabelChange}
//           onZoomChange={this.handleZoomChange}
//           menustate={this.state.menustate} //should pass form and canvas
//         />
//         <Canvas
//           // dette er akkurat hva som er i den nye "canvas"
//           chartinfo={this.state.menustate.chartinfo} // change to canvas and form
//           hasGrid={this.state.menustate.gridswitch}
//           hasLabels={this.state.menustate.canvasLabels}
//           hasRedGrid={this.state.menustate.hasRedGrid}
//           isEyepieceMode={this.state.menustate.formswitch}
//           zoomValue={this.state.menustate.zoomValue}
//         />
//       </div>
//     );
//   }
// }

export default App;
