import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import jupiterLogo from "./../img/jupiter2.png";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      planetData: [
        {
          label: "Jupiter",
          data: [{ x: 50, y: 20 }],
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

  componentDidMount() {
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
    //img.src = jupiterLogo;
  }

  render() {
    return (
      <Line
        className="border border-secondary m-2"
        data={{
          datasets: this.state.planetData,
        }}
        options={this.getOptions(
          this.props.userdata.plotSize,
          this.props.userdata.plotDivisor,
          this.props.userdata.axisLabel
        )}
        ref={this.chartRef}
      />
    );
  }

  getOptions = (size, divisor, label) => {
    return {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          min: 0,
          max: size,
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
          labels: Array.from({ length: size }, (_, i) => i / divisor),
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
