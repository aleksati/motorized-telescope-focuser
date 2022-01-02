import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  getDPRwithZoom,
  getCanvasHeight,
  getScaledCanvasDim,
  getSizeOffsetForLabels,
} from "../../utils/canvas/setupCanvas.js";
import {
  drawCanvasBg,
  drawSquareCanvas,
  drawCircleCanvas,
} from "../../utils/canvas/drawCanvas.js";
import { drawBody } from "../../utils/canvas/drawBodies.js";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const LABELFONT = "40px Arial";
const NUMBERFONT = "20px Arial";
const OFFSET = 5;

// layouteffect runs before the DOM initally renders.
// A good place to update/get size of DOM elements to avoid flickering.
const Canvas = ({ isLoading, isError, canvasData, colors, currCrowd }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0);
  const [currBody, setCurrBody] = useState(null);

  // on mount, listen and forceUpdate on the window resizing.
  useEffect(() => {
    if (canvasRef.current) {
      window.addEventListener("resize", setForceUpdate);
      return () => {
        window.removeEventListener("resize", setForceUpdate);
      };
    }
  }, [canvasRef]);

  // Set the containerWidth when the parent DIV mounts, and whenever we resize the window.
  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.parentNode.clientWidth);
    }
  }, [containerRef, forceUpdate]);

  // Set the canvasWidth If the container width OR a new zoom value is registered.
  useLayoutEffect(() => {
    if (containerWidth) {
      let cw = (containerWidth / 100) * canvasData.zoomValue;
      setCanvasWidth(cw);
    }
  }, [containerWidth, canvasData.zoomValue]);

  // set the currBody (selected from the bodySelector) from currCrowd
  useEffect(() => {
    if (!isLoading && !isError) {
      let selectedBodyName = Object.keys(currCrowd).filter(
        (key) => currCrowd[key].isVisible
      );
      let newBody = selectedBodyName.length
        ? currCrowd[selectedBodyName]
        : null;
      setCurrBody(newBody);
    }
  }, [currCrowd, isLoading, isError]);

  // Paint the canvas
  useLayoutEffect(() => {
    if (canvasRef.current && canvasWidth) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const dpr = getDPRwithZoom(canvasData.zoomValue);
      const canvasHeight = getCanvasHeight(canvasWidth, canvasData);
      const { scaledCanvasWidth, scaledCanvasHeight } = getScaledCanvasDim(
        dpr,
        canvasWidth,
        canvasHeight
      );
      const LABELOFFSET = getSizeOffsetForLabels(
        canvasData.hasLabels,
        scaledCanvasWidth,
        scaledCanvasHeight,
        NUMBERFONT,
        LABELFONT,
        OFFSET
      );

      canvas.width = scaledCanvasWidth;
      canvas.height = scaledCanvasHeight;
      // context.scale(dpr, dpr);

      drawCanvasBg(context, scaledCanvasWidth, scaledCanvasHeight);

      if (!canvasData.isEyepieceMode) {
        drawSquareCanvas(
          context,
          canvasData,
          colors,
          scaledCanvasWidth,
          scaledCanvasHeight,
          LABELFONT,
          NUMBERFONT,
          LABELOFFSET,
          OFFSET
        );
      } else {
        drawCircleCanvas(
          context,
          canvasData,
          colors,
          scaledCanvasWidth,
          scaledCanvasHeight,
          LABELFONT,
          NUMBERFONT,
          OFFSET
        );
      }

      // finally,
      if (currBody)
        drawBody(
          context,
          canvasData,
          scaledCanvasWidth,
          scaledCanvasHeight,
          currBody
        );

      // canvas.style.width = canvasWidth + "px !important";
      // canvas.style.height = canvasWidth + "px !important";
    }
  }, [canvasRef, canvasWidth, colors, canvasData, currBody]);

  return (
    <motion.div
      key={canvasData.isEyepieceMode ? "ep" : "cam"}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
    >
      <div className="container d-flex justify-content-center p-0">
        <div ref={containerRef} style={{ width: canvasWidth }}>
          <canvas
            ref={canvasRef}
            className={
              canvasData.isEyepieceMode
                ? "w-100 border rounded-circle"
                : "w-100"
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

Canvas.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  currCrowd: PropTypes.object.isRequired,
  canvasData: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
};

export default Canvas;
