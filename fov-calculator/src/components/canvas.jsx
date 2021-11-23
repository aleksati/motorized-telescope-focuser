import React, { useRef, useReducer, useLayoutEffect } from "react";
import {
  paintOnSquare,
  paintOnCircle,
  paintBg,
  updateCanvasSize,
} from "./utils-canvasMethods.js";

// layouteffect runs before the DOM initally renders. A good place to update/get size of DOM elements to avoid flickering.

// The props are:
// chartinfo= {plotSizeX(num), plotSizeY(num), plotDivisor(num), axisLabel(string)}
// gridswitch={bool}
// labelswitch={bool}
// formswitch={bool}
// zoomValue={value}

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  // on mount, attach event listner.
  useLayoutEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", forceUpdate);
      return () => {
        window.removeEventListener("resize", forceUpdate);
      };
    }
  }, [canvasRef]);

  // on all renders
  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      const label = true;

      updateCanvasSize(canvas, props.chartinfo, label, dpr);

      let context = canvas.getContext("2d");

      paintBg(context);

      if (!props.formSwitch) {
        paintOnSquare(context, props.chartinfo, label, props.displayGrid);
      } else {
        paintOnCircle(context, props.chartinfo, label, props.displayGrid);
      }
    }
  }, [update, props]);

  return (
    <div className="container d-flex justify-content-center">
      <div style={{ width: 200 }}>
        <canvas
          ref={canvasRef}
          className={props.formSwitch ? "w-100 border rounded-circle" : "w-100"}
        />
      </div>
    </div>
  );
};

export default Canvas;
