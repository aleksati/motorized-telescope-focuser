import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";

// Make option to have circle or square :)
// See "actions"

const Chart = (props) => {
  const [planetdata, setPlanetdata] = useState([
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
  ]);

  // denne burde gå i app.js
  // og API call som setter den.
  const [planetAU, setPlanetAU] = useState({
    mars: 0,
    jupiter: 0,
    venus: 0,
    mercury: 0,
    saturn: 0,
    uranus: 0,
    neptune: 0,
  });

  const [chartSize, setChartSize] = useState({
    width: 0,
    height: 400,
  });

  // Im passing a useState as ref to chart.
  // This ensures I can access the chart when it first renders in the dom,
  // to init the chart size.
  // I also use the function to update the chartsize when props.chartinfo comes inn.
  const [chart, setRef] = useState(null);
  useEffect(() => {
    if (chart != null) {
      console.log("Updating chartsize on new props or init");
      updateChartSize(chart);
      console.log(chart.ctx);
      return;
    }
  }, [chart, props.chartinfo]);

  // on mount we attach a eventlistner for when the window resizes
  // then we update the chartsize.
  useEffect(() => {
    if (chart != null) {
      console.log("attaching event listener.");
      const handleResize = () => {
        console.log("updating chartsize on resize.");
        updateChartSize(chart);
      };
      window.addEventListener("resize", handleResize);
    }
  }, [chart]);

  const updateChartSize = (node) => {
    let unitY = props.chartinfo.plotSizeY;
    let unitX = props.chartinfo.plotSizeX;

    let pxPerUnitX = node.width / unitX; // pixel to size ratio
    let newHeight = pxPerUnitX * unitY;

    setChartSize({
      height: newHeight,
      width: node.width,
    });
  };

  useEffect(() => {
    // here, I will update the planet image sizes.
    // console.log(chartSize);
    // console.log(chart);
  }, [chartSize]);

  const getOptions = (sizeX, sizeY, divisor, label) => {
    return {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          min: 0,
          display: true,
          max: sizeY,
          grid: {
            //borderColor: "white",
            display: props.gridswitch,
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
            display: props.gridswitch,
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

  return (
    <div className="container-xl">
      <Line
        className="border border-secondary"
        height={chartSize.height}
        ref={setRef}
        data={{
          datasets: planetdata,
        }}
        options={getOptions(
          props.chartinfo.plotSizeX,
          props.chartinfo.plotSizeY,
          props.chartinfo.plotDivisor,
          props.chartinfo.axisLabel
        )}
      />
    </div>
  );
};

export default Chart;
