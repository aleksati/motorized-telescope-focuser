import React, { useRef, useEffect, useCallback } from "react";

// The props are:
// chartinfo= {plotSizeX(num), plotSizeY(num), plotDivisor(num), axisLabel(string)}
// gridswitch={bool}

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const updateCanvas = useCallback(
    (currCanvas) => {
      const canvas = currCanvas;
      const context = canvas.getContext("2d");

      const updateSize = (cnv) => {
        // Set the height of the canvas based on the aspect ratio between plotSizeX and Y.
        const { width } = cnv.getBoundingClientRect();
        if (cnv.width !== width) {
          cnv.width = width;

          let unitY = props.chartinfo.plotSizeY;
          let unitX = props.chartinfo.plotSizeX;
          let pxPerUnitX = cnv.width / unitX; // pixel to size ratio
          let height = pxPerUnitX * unitY;

          cnv.height = height;
        }
      };

      const paintBg = (ctx) => {
        ctx.fillStyle = "#138496";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };

      const paintGrid = () => {};

      updateSize(canvas);
      paintBg(context);
      paintGrid();
    },
    [props.chartinfo]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const handleResize = () => {
        updateCanvas(canvasRef.current);
      };
      console.log("attaching event listener.");
      window.addEventListener("resize", handleResize);
    }
  }, [updateCanvas]);

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Updating chartsize on new props or init");
      updateCanvas(canvasRef.current);
    }
  }, [props.chartinfo, updateCanvas]);

  return (
    <div className="container">
      <canvas ref={canvasRef} style={{ width: "100%" }} />
    </div>
  );
};

export default Canvas;
