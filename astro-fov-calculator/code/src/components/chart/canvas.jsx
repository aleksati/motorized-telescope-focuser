import React, { useRef, useState, useReducer, useEffect } from "react";
import {
  paintOnSquare,
  paintOnCircle,
  paintBg,
  setupCanvas,
} from "../../utils/canvasMethods.js";

// layouteffect runs before the DOM initally renders. A good place to update/get size of DOM elements to avoid flickering.
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [onUpdate, forceUpdate] = useReducer((x) => x + 1, 0);

  // on mount, attach event listner.
  useEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", forceUpdate);
      return () => {
        window.removeEventListener("resize", forceUpdate);
      };
    }
  }, [canvasRef]);

  // Store the container width when the DIV mounts
  // and whenever we resize the window.
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.parentNode.clientWidth);
    }
  }, [containerRef, onUpdate]);

  // If the container width OR a new zoom value is registered:
  // we update the canvasWidth.
  useEffect(() => {
    if (containerWidth) {
      let cw = (containerWidth / 100) * props.canvasData.zoomValue;
      setCanvasWidth(cw);
    }
  }, [containerWidth, props.canvasData.zoomValue]);

  // Paint the canvas on most renders.
  useEffect(() => {
    if (canvasRef.current && canvasWidth) {
      let canvas = canvasRef.current;
      let context = setupCanvas(
        canvas,
        canvasWidth,
        props.canvasData.zoomValue,
        props.canvasData.plotSizeX,
        props.canvasData.plotSizeY,
        props.canvasData.hasLabels
      );

      paintBg(context);

      if (!props.canvasData.isEyepieceMode) {
        paintOnSquare(
          context,
          props.canvasData.plotSizeX,
          props.canvasData.plotSizeY,
          props.canvasData.plotDivisor,
          props.canvasData.axisLabel,
          props.canvasData.hasLabels,
          props.canvasData.hasGrid,
          props.canvasData.hasRedGrid,
          props.canvasData.redGridFactor,
          props.colors
        );
      } else {
        paintOnCircle(
          context,
          props.canvasData.plotSizeX,
          props.canvasData.plotSizeY,
          props.canvasData.plotDivisor,
          props.canvasData.axisLabel,
          props.canvasData.hasLabels,
          props.canvasData.hasGrid,
          props.canvasData.hasRedGrid,
          props.canvasData.redGridFactor,
          props.colors
        );
      }

      // canvas.style.width = canvasWidth + "px !important";
      // canvas.style.height = canvasWidth + "px !important";
    }
  }, [canvasRef, props.colors, props.canvasData, canvasWidth]);

  return (
    <div className="container d-flex justify-content-center p-0">
      <div ref={containerRef} style={{ width: canvasWidth }}>
        <canvas
          ref={canvasRef}
          className={
            props.canvasData.isEyepieceMode
              ? "w-100 border rounded-circle"
              : "w-100 border"
          }
        />
        {props.children(canvasRef, canvasWidth)}
      </div>
    </div>
  );
};

export default Canvas;
