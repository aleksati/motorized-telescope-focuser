import React, { Component } from "react";
import LineChart from "./components/graph";
import SideBar from "./components/sidebar";
//import NavBar from "./components/navbar";
import "./App.css";

// TO DO:

// MAKE USER SETTINGS CONTROL FOV GRAPH SIZE.
// make the XY dim control the aspect ratio of the plot

// IMPORT ALL IMAGES TO GRAPH
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
