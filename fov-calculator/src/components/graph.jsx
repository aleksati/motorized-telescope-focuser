import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import jupiterLogo from "./../img/jupiter2.png";

class LineChart extends Component {
  // options changes underway.
  // input stuff that changes the Plotting interface should be set in the state

  constructor() {
    super();
    this.state = {
      planets: [
        {
          label: "Mars",
          data: [{ x: 1.5, y: 10 }],
          backgroundColor: "rgb(75, 192, 192)",
          hidden: true,
        },
        {
          label: "Jupiter",
          data: [{ x: 1.5, y: 10 }],
          backgroundColor: "rgb(255, 255, 255)",
          hidden: false,
          pointStyle: "circle",
        },
      ],
    };
  }

  componentDidMount() {
    // get canvas height..
    const chartHeight = document.getElementById("chart-container").clientHeight;
    const jupiterImg = new Image(chartHeight - 100, chartHeight - 100);
    jupiterImg.src = jupiterLogo;

    // update state
    const newPlanets = [...this.state.planets];
    newPlanets[1].pointStyle = jupiterImg;
    newPlanets[1].data = [
      {
        x: this.props.userdata.plotSize / this.props.userdata.plotDivisor / 2,
        y: this.props.userdata.plotSize / 2,
      },
    ];

    this.setState({ planets: newPlanets });

    // server call to update this.state. mostly the size of the planets.
  }

  render() {
    return (
      <Line
        className="border border-secondary m-2"
        data={{
          datasets: this.state.planets,
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
