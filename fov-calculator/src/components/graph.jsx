import React, { Component } from "react";
import Chart from "chart.js/auto";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        datasets: this.props.data,
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,

        // plugins: {
        //   legend: {
        //     onClick: this.legendEvent,
        //   },
        // },

        scales: {
          y: {
            min: 0,
            max: 20,
            display: true,
            title: {
              display: true,
              text: "minutes of Arc",
            },
            ticks: {
              stepSize: 1,
              callback: function (item, index) {
                return index % 6 === 0 ? item / 6 : "";
              },
            },
          },
          x: {
            min: 0,
            display: true,
            labels: Array.from({ length: 20 }, (_, i) => i / 6),
            title: {
              display: true,
              text: "minutes of Arc",
            },
            ticks: {
              callback: function (item, index) {
                return index % 6 === 0 ? this.getLabelForValue(item) : "";
              },
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} className="border border-secondary m-2" />
    );
  }
}

export default Graph;

//   legendEvent = (e, legendItem, legend) => {
//     // which legend is activated.
//     var index = legendItem.datasetIndex;
//     const ci = legend.chart;
//     if (ci.isDatasetVisible(index)) {
//       ci.hide(index);
//       legendItem.hidden = true;
//     } else {
//       ci.show(index);
//       legendItem.hidden = false;
//     }
//   };
