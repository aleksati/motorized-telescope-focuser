import React, { Component } from "react";
import LineChart from "./components/graph";
import SideBar from "./components/sidebar";
//import NavBar from "./components/navbar";
import "./App.css";

// TO DO:

//

// IMPORT ALL IMAGES TO GRAPH
// MAKE USER SETTINGS CONTROL FOV GRAPH SIZE.
// make sure all fields have been inputted before the button is avaliable
// make sure its null (or something) when users takes away the numbers.

// MAKE IMAGE RESIZE WITH BROWSER RESETTING.
// MAKE A SERVER.

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        plotSize: 20,
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
    //console.log(this.state.userData);
  }

  handleSubmit = (item) => {
    let newUserData = this.calculateFOV(item);
    this.setState({ userData: newUserData });
  };

  render() {
    //console.log("App rendered!");
    return (
      <div className="App">
        <SideBar onSubmit={this.handleSubmit} />
        <div id="chart-container">
          <LineChart key="PlanetGraph" userdata={this.state.userData} />
        </div>
      </div>
    );
  }

  calculateFOV(newData) {
    let FOV = newData.chipSize / newData.flength;
    // if the total size is more than 2 degrees, we choose degrees
    if (FOV * 57.3 >= 2) {
      return {
        plotSize: Math.round(FOV * 57.3 * 6),
        plotDivisor: 6,
        chipDim: [newData.sensorWidth, newData.sensorHeight],
        axisLabel:
          "Degrees " + newData.sensorWidth + "x" + newData.sensorHeight,
      };
    }

    // if the total size is more than 2 arc minutes, we choose arc minutes.
    if (FOV * 3438 >= 2) {
      return {
        plotSize: Math.round(FOV * 3438 * 6),
        plotDivisor: 6,
        chipDim: [newData.sensorWidth, newData.sensorHeight],
        axisLabel:
          "Minutes of Arc " + newData.sensorWidth + "x" + newData.sensorHeight,
      };
    }

    // if the total size is more than 2 arc minutes, we choose arc seconds
    return {
      plotSize: Math.round(FOV * 206265),
      plotDivisor: 1,
      chipDim: [newData.sensorWidth, newData.sensorHeight],
      axisLabel:
        "Seconds of arc of Arc " +
        newData.sensorWidth +
        "x" +
        newData.sensorHeight,
    };
  }
}

export default App;
