import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";

class App extends Component {
  state = {};
  render() {
    console.log("hello");
    return (
      <React.Fragment>
        <SideBar />
      </React.Fragment>
    );
  }
}

export default App;
