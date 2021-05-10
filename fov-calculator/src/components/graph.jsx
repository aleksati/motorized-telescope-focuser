import React, { Component } from "react";
import { Line } from "react-chartjs-2";
//import VENUS_PNG from "./../img/venus-transparent.png";
//import MERCURY_PNG from "./../img/mercury-transparent.png";
//import MARS_PNG from "./../img/mars-transparent.png";
//import JUPITER_PNG from "./../img/jupiter-transparent.png";
//import SATURN_PNG from "./../img/saturn-transparent.png";
//import URNAUS_PNG from "./../img/uranus-transparent.png";
//import NEPTUNE_PNG from "./../img/neptune-transparent.png";
//import MOON_PNG from "./../img/moon-transparent.png";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      planetData: [
        {
          label: "Jupiter",
          data: [{ x: 3, y: 2 }],
          backgroundColor: "rgb(255, 255, 255)",
          hidden: true,
          pointStyle: new Image(20, 20),
        },
      ],
      planetAU: [
        {
          mars: 0,
          jupiter: 0,
          venus: 0,
          mercury: 0,
          saturn: 0,
          uranus: 0,
          neptune: 0,
        },
      ],
    };
  }

  //APIcall = () => {
  // gather the AU data from server.
  // set state.
  //}

  getPlanetPNG = () => {
    const reqPngs = require.context("./../img", true, /\.png$/);
    const paths = reqPngs.keys();
    const images = paths.map((path) => reqPngs(path));
    console.log(images);
  };

  componentDidMount() {
    this.getPlanetPNG();
    // Make a call to the server to get the planet size in AU. set data in setState.
    // get canvas height.?
    //const chartHeight = document.getElementById("chart-container").clientHeight;
    //this.setState({ planets: newPlanets });
  }

  componentDidUpdate() {
    // Here, a user has requested a new plot. So new PROPS have come inn.
    // Call function(s) to resize all planets based on the current props data.
    // Also resize the position in the plot.
    //let img = this.state.planetData[0].pointStyle;
    //img.src = this.state.planetIMG.id
  }

  render() {
    return (
      <Line
        className="border border-secondary m-2"
        data={{
          datasets: this.state.planetData,
        }}
        options={this.getOptions(
          this.props.userdata.plotSizeX,
          this.props.userdata.plotSizeY,
          this.props.userdata.plotDivisor,
          this.props.userdata.axisLabel
        )}
      />
    );
  }

  getOptions = (sizeX, sizeY, divisor, label) => {
    return {
      responsive: true,
      maintainAspectRatio: true,

      scales: {
        y: {
          min: 0,
          max: sizeY,
          display: true,
          title: {
            display: true,
            text: label,
          },
          ticks: {
            stepSize: 1,
            callback: function (item, index) {
              return index % divisor === 0 ? item / divisor : "";
            },
          },
        },
        x: {
          min: 0,
          display: true,
          labels: Array.from({ length: sizeX }, (_, i) => i / divisor),
          title: {
            display: true,
            text: label,
          },
          ticks: {
            callback: function (item, index) {
              return index % divisor === 0 ? this.getLabelForValue(item) : "";
            },
          },
        },
      },
    };
  };
}

export default LineChart;
