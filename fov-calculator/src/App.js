import React, { Component } from "react";
import LineChart from "./components/graph";
import Form from "./components/form";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./App.css";

// TO DO:

// MAKE USER SETTINGS CONTROL FOV GRAPH SIZE.

// IMPORT ALL IMAGES TO GRAPH
// MAKE IMAGE RESIZE WITH BROWSER RESETTING.

// MAKE A SERVER.

// SWITCH FROM CAMERA MODE TO VIEWING MODE.

// A viewer under the form which states the:
// Focal length
// Aspect Ratio
// How many pixels per unit of measure.

class App extends Component {
  constructor() {
    super();
    this.state = {
      FormData: {
        apature: {
          ref: "apature",
          value: "",
          required: true,
          type: "number",
          name: "Apature",
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
          name: "Barlow/Reducer",
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
          name: "Pixel Res (Horizontal)",
          unit: "px",
        },
        resolutiony: {
          ref: "resolutiony",
          value: "",
          required: true,
          type: "number",
          name: "Pixel Res (Vertical)",
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
        eyepiecefov: {
          ref: "eyepiecefov",
          value: "",
          required: false,
          type: "number",
          name: "FOV",
          unit: "°",
        },
      },
      FormSwitch: true,
      chartinfo: {
        plotSizeX: 20,
        plotSizeY: 10,
        plotDivisor: 6,
        chipDim: [640, 420],
        axisLabel: "Minutes of arc",
      },
    };
  }

  componentDidMount() {
    //console.log("App Mounted!");
    //this.setState({ plotData: datasets });
  }

  componentDidUpdate() {
    //console.log(this.state.chartinfo);
  }

  handleChartInfo = (item) => {
    this.setState({ chartinfo: item });
  };

  handleFormChange = (event) => {
    let newValue = event.target.value;
    let itemRef = event.target.id;
    let stateCopy = { ...this.state.FormData };
    let itemCopy = { ...stateCopy[itemRef] };
    itemCopy.value = newValue;
    stateCopy[itemRef] = itemCopy;
    this.setState({ FormData: stateCopy });
  };

  handleSwitchChange = (bool) => {
    this.setState({ FormSwitch: bool });
  };

  handleFormSubmit = (data) => {
    data.preventDefault();
    console.log("Form is submitted! Success");
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row p-2">
            <BootstrapSwitchButton
              checked={this.state.FormSwitch}
              onlabel="Camera"
              onstyle="primary"
              offlabel="Eyepiece"
              offstyle="success"
              onChange={this.handleSwitchChange}
              style="w-100"
            />
          </div>
          <div className="row">
            <Form
              formData={this.state.FormData}
              switchState={this.state.FormSwitch}
              onChange={this.handleFormChange}
              onSubmit={this.handleFormSubmit}
            />
          </div>
        </div>
        {/*
        <div id="chart-container">
        <LineChart key="chart" chartinfo={this.state.chartinfo} />
        </div> */}
      </div>
    );
  }
}

export default App;
