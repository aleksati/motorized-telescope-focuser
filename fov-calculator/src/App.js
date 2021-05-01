import React, { Component } from "react";
import LineChart from "./components/graph";
//import SideBar from "./components/sidebar";
//import NavBar from "./components/navbar";
import "./App.css";

// FIRST - FIXED GRAPH SIZE!
// SECOND - ADD IMAGE INN AND OUT OF GRAPH. THAT CAN CHANGE SIZE
// THIRD - MAIN LOGIC
// FOUTH - DESIGN

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        plotSize: 20,
        plotDivisor: 6,
        axisLabel: "Minutes of arc",
      },
    };
  }

  componentDidMount() {
    //this.setState({ plotData: datasets });
  }

  render() {
    return (
      <div className="App">
        {/* <SideBar /> */}
        <div id="chart-container">
          <LineChart key="PlanetGraph" userdata={this.state.userData} />
        </div>
      </div>
    );
  }
}

export default App;
