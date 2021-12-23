import React, { useRef, useState, useReducer, useEffect } from "react";
import {
  paintOnSquare,
  paintOnCircle,
  paintBg,
  updateCanvasSize,
} from "./utils-canvas.js";

// layouteffect runs before the DOM initally renders. A good place to update/get size of DOM elements to avoid flickering.
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const canvasDivRef = useRef(null);
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
    if (canvasDivRef.current) {
      setContainerWidth(canvasDivRef.current.parentNode.clientWidth);
    }
  }, [canvasDivRef, onUpdate]);

  // If the container width OR a new zoom value is registered:
  // we update the canvasWidth.
  useEffect(() => {
    if (containerWidth) {
      setCanvasWidth((containerWidth / 100) * props.zoomValue);
    }
  }, [containerWidth, props.zoomValue]);

  // Paint the canvas on most renders.
  useEffect(() => {
    if (canvasRef.current && canvasWidth) {
      let canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      let scaledCanvasWidth = canvasWidth * dpr;

      updateCanvasSize(
        canvas,
        scaledCanvasWidth,
        props.plotSizeX,
        props.plotSizeY,
        props.hasLabels
      );

      paintBg(context);

      if (!props.isEyepieceMode) {
        paintOnSquare(
          context,
          props.plotSizeX,
          props.plotSizeY,
          props.plotDivisor,
          props.axisLabel,
          props.hasLabels,
          props.hasGrid,
          props.hasRedGrid,
          props.redGridFactor,
          props.colors
        );
      } else {
        paintOnCircle(
          context,
          props.plotSizeX,
          props.plotSizeY,
          props.plotDivisor,
          props.axisLabel,
          props.hasLabels,
          props.hasGrid,
          props.hasRedGrid,
          props.redGridFactor,
          props.colors
        );
      }
    }
  }, [
    canvasRef,
    props.plotSizeX,
    props.plotSizeY,
    props.plotDivisor,
    props.axisLabel,
    props.hasLabels,
    props.hasGrid,
    props.hasRedGrid,
    props.redGridFactor,
    props.colors,
    props.isEyepieceMode,
    canvasWidth,
  ]);

  return (
    <div className="container d-flex justify-content-center p-0">
      <div ref={canvasDivRef} style={{ width: canvasWidth }}>
        <canvas
          ref={canvasRef}
          className={
            props.isEyepieceMode ? "w-100 border rounded-circle" : "w-100"
          }
        />
      </div>
    </div>
  );
};

export default Canvas;
