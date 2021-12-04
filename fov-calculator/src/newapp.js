import React, { Component, useState } from "react";
import Menubar from "./components/menubar/menubar";
import Canvas from "./components/canvas";
import {
  camChartSize,
  eyepieceChartSize,
} from "./components/utils-formdata2chartsize.js";

// camCanvasSize
// eyepieceCanvasSize

const [form, addForm] = useState({
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

const [canvas, setCanvas] = useState({
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      menustate: {
        // or change name to form. also have a plot.
        // then just "data", instead of formdata.
        // should actually be canvas.hasGrid
        // and, canvas.plotSize
        formdata: {
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
        },
        formswitch: true, // change name to eyepieceMode" canvas.isEyepieceMode
        gridswitch: true, // canvas.hasGrid
        canvasLabels: true, // canvas.hasLabels
        hasRedGrid: false, // canvas.hasRedGrid.
        // submit: false, // should be form.hasSubmit
        zoomValue: 100,
        chartinfo: {
          plotSizeX: 20,
          plotSizeY: 20,
          plotDivisor: 6,
          axisLabel: "Minutes of Arc",
        },
      },
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleGridChange = this.handleGridChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
    this.handleZoomSwitch = this.handleZoomSwitch.bind(this);
    this.handleRedGridChange = this.handleRedGridChange.bind(this);
  }

  handleFormChange(bool) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        formswitch: bool,
        submit: false,
      },
    }));
  }

  handleGridChange(bool) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        gridswitch: bool,
      },
    }));
  }

  handleLabelChange(bool) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        canvasLabels: bool,
      },
    }));
  }

  handleRedGridChange(bool) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        hasRedGrid: bool,
      },
    }));
  }

  handleMenuChange(e) {
    let newValue = e.target.value;
    let keyRef = e.target.id;
    let formdataCopy = { ...this.state.menustate.formdata };
    let keyCopy = { ...formdataCopy[keyRef] };
    keyCopy.value = newValue;
    formdataCopy[keyRef] = keyCopy;

    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        formdata: formdataCopy,
        submit: false,
      },
    }));
  }

  handleMenuSubmit(e) {
    e.preventDefault();

    // update the chart size and config
    let newchartinfo = this.state.menustate.formswitch
      ? eyepieceChartSize(this.state.menustate.formdata)
      : camChartSize(this.state.menustate.formdata);

    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        chartinfo: newchartinfo,
        submit: true,
      },
    }));
  }

  handleZoomSwitch(e) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        zoomValue: e,
      },
    }));
  }

  render() {
    return (
      <div className="App">
        <Menubar
          onChange={this.handleMenuChange}
          onSubmit={this.handleMenuSubmit}
          onFormSwitch={this.handleFormChange}
          onGridSwitch={this.handleGridChange}
          onLabelSwitch={this.handleLabelChange}
          onZoomSwitch={this.handleZoomSwitch}
          onRedGridSwitch={this.handleRedGridChange}
          menustate={this.state.menustate}
        />
        <Canvas
          chartinfo={this.state.menustate.chartinfo}
          displayGrid={this.state.menustate.gridswitch}
          formSwitch={this.state.menustate.formswitch}
          zoomValue={this.state.menustate.zoomValue}
          canvasLabels={this.state.menustate.canvasLabels}
          hasRedGrid={this.state.menustate.hasRedGrid}
        />
      </div>
    );
  }
}

export default App;
