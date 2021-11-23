import React, { Component } from "react";
import Menubar from "./components/menubar/menubar";
import Canvas from "./components/canvas";
import {
  camChartSize,
  eyepieceChartSize,
} from "./components/utils-formdata2chartsize.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      menustate: {
        // or change name to form. also have a plot.
        // then just "data", "switch".
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
            name: "Focal Length",
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
            name: "Focal Length",
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
        formswitch: true, // change name to "eyepiecemode"
        gridswitch: true, // canvasgrid
        canvaslabels: true, // canvaslabels
        chartinfo: {
          plotSizeX: 20,
          plotSizeY: 20,
          plotDivisor: 6,
          axisLabel: "Minutes of Arc",
        },
        submit: false, // hasSubmit
        zoomValue: 100,
      },
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleGridChange = this.handleGridChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
    this.handleCanvasZoom = this.handleCanvasZoom.bind(this);
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

  handleCanvasZoom(e) {
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
          menustate={this.state.menustate}
          onCanvasZoom={this.handleCanvasZoom}
          zoomValue={this.state.menustate.zoomValue}
        />
        <Canvas
          chartinfo={this.state.menustate.chartinfo}
          displayGrid={this.state.menustate.gridswitch}
          formSwitch={this.state.menustate.formswitch}
          zoomValue={this.state.menustate.zoomValue}
        />
      </div>
    );
  }
}

export default App;
