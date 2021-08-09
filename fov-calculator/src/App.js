import React, { Component } from "react";
import Menubar from "./components/menubar";
import LineChart from "./components/linechart";
import { camChartSize, eyepieceChartSize } from "./components/utils.js";

// TO DO:

// ADD FORMINFO TAB BELOW FORM

// IMPORT ALL IMAGES TO GRAPH
// MAKE IMAGE RESIZE WITH BROWSER RESIZING.

// MAKE A LIST BESIDES/OR UNDER THE GRAPH WITH THE CURRENT SETTINGS.

// MAKE A SERVER.

class App extends Component {
  constructor() {
    super();
    this.state = {
      menustate: {
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
            required: false,
            type: "number",
            name: "AFOV",
            unit: "°",
          },
        },
        formswitch: true,
        chartinfo: {
          plotSizeX: 20,
          plotSizeY: 10,
          plotDivisor: 6,
          chipDim: [640, 480],
          axisLabel: "Minutes of arc",
        },
      },
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
  }

  handleSwitchChange(bool) {
    this.setState((prevState) => ({
      menustate: {
        ...prevState.menustate,
        formswitch: bool,
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
      },
    }));
  }

  render() {
    return (
      <div className="App">
        <Menubar
          onChange={this.handleMenuChange}
          onSubmit={this.handleMenuSubmit}
          onFormSwitch={this.handleSwitchChange}
          menustate={this.state.menustate}
        />
        <LineChart key="chart" chartinfo={this.state.menustate.chartinfo} />
      </div>
    );
  }
}

export default App;
