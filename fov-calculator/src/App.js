import React, { Component } from "react";
import Graph from "./components/graph";
//import SideBar from "./components/sidebar";
import { TestData } from "./components/feeds.js";

//import NavBar from "./components/navbar";
import "./App.css";

// FIRST - FIXED GRAPH SIZE!
// SECOND - ADD IMAGE INN AND OUT OF GRAPH. THAT CAN CHANGE SIZE

// THIRD - MAIN LOGIC
// FOUTH - DESIGN

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: TestData,
    };
  }

  componentDidMount() {
    this.setState({ data: TestData });
  }

  render() {
    return (
      <div className="App">
        {/* <SideBar /> */}
        <div className="chart-container">
          <Graph
            data={this.state.data.datasets}
            labels={this.state.data.labels}
          />
        </div>
      </div>
    );
  }
}

export default App;
