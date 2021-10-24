import React, { useRef, useEffect, useReducer, useLayoutEffect } from "react";

// The props are:
// chartinfo= {plotSizeX(num), plotSizeY(num), plotDivisor(num), axisLabel(string)}
// gridswitch={bool}
// formswitch={bool}

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  // we draw the canvas on every render.
  // layouteffect runs before the DOM initally renders.
  // good place to update/get size of DOM elements to avoid flickering.
  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const updateCanvasHeight = (cnv) => {
        // Set the height of the canvas based on the
        // aspect ratio between plotSizeX and Y.
        const { width } = cnv.getBoundingClientRect();
        if (cnv.width !== width) {
          cnv.width = width;
        }

        let unitY = props.chartinfo.plotSizeY;
        let unitX = props.chartinfo.plotSizeX;
        let pxPerUnitX = cnv.width / unitX; // pixel to size ratio
        let newHeight = pxPerUnitX * unitY;

        cnv.height = newHeight;
      };

      const paintBg = (ctx) => {
        ctx.fillStyle = "#000000"; //"#138496";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };

      const paintGrid = (ctx) => {
        //We only use 5% of the canvas size to make room for labels.
        const labelOffset = 8;

        let offsetHeight = (ctx.canvas.height / 100) * labelOffset;
        let offsetWidth = (ctx.canvas.width / 100) * labelOffset;

        let pxPerUnitX =
          (ctx.canvas.width - offsetWidth) / props.chartinfo.plotSizeX;
        let pxPerUnitY =
          (ctx.canvas.height - offsetHeight) / props.chartinfo.plotSizeY;

        // x axis
        // include 0 and 20 to make the border
        for (let i = 0; i <= props.chartinfo.plotSizeX; i++) {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          ctx.moveTo(
            pxPerUnitX * i + offsetWidth,
            ctx.canvas.height - offsetHeight
          );
          ctx.lineTo(pxPerUnitX * i + offsetWidth, 0);
          ctx.stroke();

          // draw text
          if (i !== 0 && i % props.chartinfo.plotDivisor === 0) {
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "12px Arial";
            ctx.fillText(
              i,
              pxPerUnitX * i + offsetWidth,
              ctx.canvas.height - offsetHeight / 2 - 20 // this is just random
            );
          }
        }

        // y axis
        // include 0 and 20 to make the border
        for (let i = 0; i <= props.chartinfo.plotSizeY; i++) {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          ctx.moveTo(0 + offsetWidth, pxPerUnitY * i);
          ctx.lineTo(ctx.canvas.width + offsetWidth, pxPerUnitY * i);
          ctx.stroke();

          // draw text
          if (i !== 0 && i % props.chartinfo.plotDivisor === 0) {
            ctx.fillStyle = "white";
            ctx.fillText(i, 0 + offsetWidth / 2 + 20, pxPerUnitY * i);
          }
        }
      };

      updateCanvasHeight(canvas);
      paintBg(context);
      // if grid then do this. otherwise, skip it.
      paintGrid(context);
    }
  }, [update, props.chartinfo]);

  // attach event listner.
  useEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", forceUpdate);
      return () => {
        window.removeEventListener("resize", forceUpdate);
      };
    }
  }, [canvasRef]);

  const circleOrSquare = () => {
    //return style = formswitch ? "w-100 border border-5 rounded-circle" : "w-100 border border-5 "
  };

  return (
    <div className="container">
      <canvas ref={canvasRef} className=" w-100 border border-secondary" />
    </div>
  );
};

export default Canvas;
