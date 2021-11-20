import React, { useRef, useEffect, useReducer, useLayoutEffect } from "react";
import {
  paintOnSquare,
  paintOnCircle,
  paintBg,
  setupCanvas,
} from "./2-utils-canvasMethods.js";

// The props are:
// chartinfo= {plotSizeX(num), plotSizeY(num), plotDivisor(num), axisLabel(string)}
// gridswitch={bool}
// formswitch={bool}

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  useLayoutEffect(() => {
    // we draw the canvas on every render.
    // layouteffect runs before the DOM initally renders. A good place to update/get size of DOM elements to avoid flickering.
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const text = true;
      const context = setupCanvas(canvas, props.chartinfo, text);

      paintBg(context);
      // if grid then do this. otherwise, skip it.
      if (!props.formSwitch) {
        paintOnSquare(context, props.chartinfo, text, props.displayGrid);
      } else {
        paintOnCircle(context, props.chartinfo, text, props.displayGrid);
      }
    }
  }, [update, props]);

  // attach event listner.
  useEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", forceUpdate);
      return () => {
        window.removeEventListener("resize", forceUpdate);
      };
    }
  }, [canvasRef]);

  const circleOrSquare = () =>
    props.formSwitch ? "w-100 border rounded-circle" : "w-100";

  return (
    <div className="container">
      <canvas ref={canvasRef} className={circleOrSquare()} />
    </div>
  );
};

export default Canvas;
