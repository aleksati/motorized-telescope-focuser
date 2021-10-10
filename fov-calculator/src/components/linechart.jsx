import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import PIMAGES from "../img/planets/pimages.js";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      planetdata: [
        // should be in the app
        {
          label: "Jupiter",
          data: [{ x: 1.3, y: 5 }],
          backgroundColor: "rgb(255, 255, 255)",
          hidden: true,
          pointStyle: new Image(50, 50),
        },
        {
          label: "Mars",
          data: [{ x: 1.3, y: 5 }],
          backgroundColor: "rgb(255, 255, 255)",
          hidden: true,
          pointStyle: new Image(20, 20),
        },
      ],
      planetau: [
        // Should stay here
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

  componentDidMount() {
    // let img = this.state.planetdata[0].pointStyle;
    // img.src = PIMAGES.jupiter;
    // let test = this.state.planetdata[0].label;
    //console.log(IMAGES[test]);
    // Make a call to the server to get the planet size in AU. set data in setState.
    // get canvas height.?
    //const chartHeight = document.getElementById("chart-container").clientHeight;
    //this.setState({ planets: newPlanets });
  }

  componentDidUpdate() {
    // Here, a user has requested a new plot. So new PROPS have come inn.
    // Call function(s) to resize all planets based on the current props data.
    // Also resize the position in the plot.
  }

  getOptions = (sizeX, sizeY, divisor, label) => {
    return {
      responsive: true,
      //maintainAspectRatio: true,

      scales: {
        y: {
          min: 0,
          display: true,
          max: sizeY,
          grid: {
            //borderColor: "white",
            display: this.props.gridswitch,
            color: "grey",
            tickColor: "black",
          },
          title: {
            color: "white",
            display: true,
            text: label,
          },
          ticks: {
            color: "white",
            stepSize: 1,
            callback: function (item, index) {
              return index % divisor === 0 ? item / divisor : "";
            },
          },
        },
        x: {
          min: 0,
          display: true,
          grid: {
            //borderColor: "white",
            display: this.props.gridswitch,
            color: "grey",
            tickColor: "black",
          },
          labels: Array.from({ length: sizeX }, (_, i) => i / divisor),
          title: {
            display: true,
            color: "white",
            text: label,
          },
          ticks: {
            color: "white",
            callback: function (item, index) {
              return index % divisor === 0 ? this.getLabelForValue(item) : "";
            },
          },
        },
      },
    };
  };

  render() {
    return (
      <div className="container">
        <Line
          className="border border-secondary m-2"
          data={{
            datasets: this.state.planetdata,
          }}
          options={this.getOptions(
            this.props.chartinfo.plotSizeX,
            this.props.chartinfo.plotSizeY,
            this.props.chartinfo.plotDivisor,
            this.props.chartinfo.axisLabel
          )}
        />
      </div>
    );
  }
}

export default LineChart;
