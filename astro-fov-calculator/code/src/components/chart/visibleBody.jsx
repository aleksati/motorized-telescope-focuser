import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// ja.. dette var en dårlig idee. Unødvendig komplisert. men morsomt!

const VisibleBody = ({
  isLoading,
  isError,
  currCrowd,
  canvasData,
  canvasRef,
  canvasWidth,
}) => {
  const [currBody, setCurrBody] = useState(null);

  // Add currBody from currCrowd
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

  // Paint the planet
  useEffect(() => {
    if (currBody) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      //   ctx.fillStyle = "rgb(255, 0, 0)";
      //   ctx.lineWidth = 14;
      //   ctx.beginPath();
      //   ctx.moveTo(250, 500);
      //   ctx.lineTo(100, 100);
      //   ctx.stroke();
      let img = new Image();
      img.src = currBody.img;
      //console.log(typeof img, img);
      ctx.drawImage(img, 255, 255, 50, 50);
    } else {
      console.log("remove");
      //recall the canvas method.
    }
  }, [currBody, canvasWidth, canvasData, canvasRef]);

  return <></>;
};

VisibleBody.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  currCrowd: PropTypes.object.isRequired,
  canvasData: PropTypes.object.isRequired,
  canvasRef: PropTypes.object.isRequired,
  canvasWidth: PropTypes.number.isRequired,
};

export default VisibleBody;
