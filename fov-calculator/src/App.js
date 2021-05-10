import React, { Component } from "react";
import LineChart from "./components/graph";
import SideBar from "./components/sidebar";
//import NavBar from "./components/navbar";
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
      userData: {
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
    //console.log(this.state.userData);
  }

  handleNewUserData = (item) => {
    this.setState({ userData: item });
  };

  render() {
    //console.log("App rendered!");
    return (
      <div className="App">
        <SideBar onNewUserData={this.handleNewUserData} />
        <div id="chart-container">
          <LineChart key="PlanetGraph" userdata={this.state.userData} />
        </div>
      </div>
    );
  }
}

export default App;
