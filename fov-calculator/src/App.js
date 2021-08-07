import React, { Component } from "react";
import LineChart from "./components/linechart";
import Form from "./components/form";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./App.css";

// TO DO:

// MAKE USER SETTINGS CONTROL FOV GRAPH SIZE.

// IMPORT ALL IMAGES TO GRAPH
// MAKE IMAGE RESIZE WITH BROWSER RESETTING.
// MAKE OPTION TO SEE GRID OR NOT

// MAKE A LIST BESIDES/OR UNDER THE GRAPH WITH THE CURRENT SETTINGS.

// MAKE A SERVER.

class App extends Component {
  constructor() {
    super();
    this.state = {
      formswitch: true,
      chartinfo: {
        plotSizeX: 20,
        plotSizeY: 10,
        plotDivisor: 6,
        chipDim: [640, 420],
        axisLabel: "Minutes of arc",
      },
    };
    this.handleChartinfo = this.handleChartinfo.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleChartinfo(item) {
    this.setState({ chartinfo: item });
  }

  handleSwitchChange(bool) {
    this.setState({ formswitch: bool });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row p-1">
            <BootstrapSwitchButton
              checked={this.state.formswitch}
              onlabel="Camera"
              onstyle="primary"
              offlabel="Eyepiece"
              offstyle="success"
              onChange={this.handleSwitchChange}
              style="w-100"
            />
          </div>
          <Form
            formswitch={this.state.formswitch}
            onChartinfo={this.handleChartinfo}
          />
        </div>
        <div className="container">
          <LineChart key="chart" chartinfo={this.state.chartinfo} />
        </div>
      </div>
    );
  }
}

export default App;
