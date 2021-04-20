import React, { Component } from "react";
import Graph from "./components/Graph";
//import SideBar from "./components/sidebar";
import { TestData } from "./components/feeds.js";

// this should be the "app interface".

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: TestData,
    };
  }

  componentDidMount() {
    this.setState({ feeds: TestData });
  }

  render() {
    return (
      <Graph
        data={this.state.feeds.data}
        title={this.state.feeds.title}
        color="#70CAD1"
      />
    );
  }
}

export default App;
