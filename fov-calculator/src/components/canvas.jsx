import React, { useRef, useEffect, useReducer, useLayoutEffect } from "react";
import {
  paintOnSquare,
  paintOnCircle,
  paintBg,
  scaleCanvas,
  initCanvas,
} from "./utils-canvasMethods.js";

// layouteffect runs before the DOM initally renders. A good place to update/get size of DOM elements to avoid flickering.

// The props are:
// chartinfo= {plotSizeX(num), plotSizeY(num), plotDivisor(num), axisLabel(string)}
// gridswitch={bool}
// formswitch={bool}
// zoomValue={value}

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  // attach event listner.
  useLayoutEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", forceUpdate);
      initCanvas(canvasRef.current);
      return () => {
        window.removeEventListener("resize", forceUpdate);
      };
    }
  }, [canvasRef]);

  // on all renders
  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const text = true;
      const context = scaleCanvas(
        canvas,
        props.chartinfo,
        text,
        props.zoomValue
      );

      paintBg(context);
      if (!props.formSwitch) {
        paintOnSquare(context, props.chartinfo, text, props.displayGrid);
      } else {
        paintOnCircle(context, props.chartinfo, text, props.displayGrid);
      }
    }
  }, [update, props]);

  const circleOrSquare = () =>
    props.formSwitch ? "w-100 border rounded-circle" : "1-100";

  return (
    <div className="container">
      <canvas ref={canvasRef} className={circleOrSquare()} />
    </div>
  );
};

export default Canvas;
