import React, { useRef, useEffect, useReducer, useLayoutEffect } from "react";
import {
  paintGridOnSquare,
  paintBg,
  paintHeight,
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
      const context = canvas.getContext("2d");

      paintHeight(canvas, props.chartinfo);
      paintBg(context);
      // if grid then do this. otherwise, skip it.
      paintGridOnSquare(context, props.chartinfo);
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
      <canvas ref={canvasRef} className=" w-100" />
    </div>
  );
};

export default Canvas;
