//// DRAW THE CANVAS ///
function drawCanvasBg(ctx, width, height) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, width, height);
}

function nearestHalf(orgX, orgY) {
  // round to nearest 0.5
  // to light of single pixels instead of 2.
  // The screen can’t display half a pixel, so it expands the line to cover a total of two pixels.
  // thats why every line must go from .5 something to .5 something
  // http://diveintohtml5.info/canvas.html

  //  let x = Math.round(orgX - 0.5) + 0.5;
  //  x =
  //    x < scaledCanvasWidth
  //      ? x
  //      : Number.isInteger(scaledCanvasWidth - 0.5)
  //      ? scaledCanvasWidth - 1
  //      : scaledCanvasWidth - 0.5;
  //
  //  let y = Math.round(orgY - 0.5) + 0.5;
  //  y =
  //    y < scaledCanvasHeight
  //      ? y
  //      : Number.isInteger(scaledCanvasHeight - 0.5)
  //      ? scaledCanvasHeight - 1
  //      : scaledCanvasHeight - 0.5;
  //
  // console.log("current width and heigh: ", scaledCanvasWidth, scaledCanvasHeight);
  // console.log("orginal and scaled x: ", orgX, x);
  // console.log("orginal and scaled y: ", orgY, y);
  //return { x, y };

  let x = Math.round(orgX);
  let y = Math.round(orgY);
  return { x, y };
}

function drawSquareCanvas(
  ctx,
  canvasData,
  colors,
  scaledCanvasWidth,
  scaledCanvasHeight,
  labelFont,
  numberFont,
  labelOffset,
  offset
) {
  const {
    plotSizeX,
    plotSizeY,
    plotDivisor,
    axisLabel,
    hasLabels,
    hasGrid,
    hasRedGrid,
    redGridFactor,
  } = canvasData;

  const offsetHeight = (scaledCanvasHeight / 100) * labelOffset;
  const offsetWidth = (scaledCanvasWidth / 100) * labelOffset;
  const pxPerUnitX = (scaledCanvasWidth - offsetWidth) / plotSizeX;
  const pxPerUnitY = (scaledCanvasHeight - offsetHeight) / plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(
      pxPerUnitX * i + offsetWidth,
      scaledCanvasHeight - offsetHeight
    );
    // paint X grid
    ctx.beginPath();
    if (i === 0 || i === plotSizeX) {
      // the border
      ctx.strokeStyle = colors.canvasBorder;
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0.5);
    } else if (hasGrid) {
      ctx.strokeStyle = colors.canvasGrid;
      if (hasRedGrid) {
        if (i % redGridFactor === 0) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, 0.5);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, 0.5);
      }
    }
    ctx.stroke();

    // paint numbers
    if (hasLabels) {
      if (i !== 0 && i % plotDivisor === 0 && i !== plotSizeX) {
        // draw numbers along X axis
        ctx.textBaseline = "top";
        ctx.font = numberFont;
        ctx.fillText(
          i / plotDivisor,
          pxPerUnitX * i + offsetWidth,
          scaledCanvasHeight - offsetHeight + offset // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (hasLabels) {
    // X label
    ctx.font = labelFont;
    ctx.fillText(
      axisLabel,
      scaledCanvasWidth / 2 + offsetWidth,
      scaledCanvasHeight -
        offsetHeight +
        offset +
        Number(numberFont.slice(0, 2)) +
        offset
    );

    // Y label
    ctx.save();
    ctx.textBaseline = "bottom";
    ctx.font = labelFont;
    ctx.translate(
      offsetWidth - offset - Number(numberFont.slice(0, 2)) - offset,
      scaledCanvasHeight / 2 - offsetHeight
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(axisLabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= plotSizeY; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(scaledCanvasWidth + offsetWidth, pxPerUnitY * i);

    // paint Y grid
    ctx.beginPath();
    if (i === 0 || i === plotSizeY) {
      // border
      ctx.strokeStyle = colors.canvasBorder;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    } else if (hasGrid) {
      ctx.strokeStyle = colors.canvasGrid;
      if (hasRedGrid) {
        if ((plotSizeY - i) % redGridFactor === 0) {
          ctx.moveTo(0.5 + offsetWidth, y);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(0.5 + offsetWidth, y);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // paint numbers
    if (hasLabels) {
      if (i !== 0 && i % plotDivisor === 0 && i !== plotSizeY) {
        // draw numbers along Y axis
        ctx.font = numberFont;
        ctx.textBaseline = "bottom"; // hmmmm
        ctx.save();
        ctx.translate(
          offsetWidth - offset,
          scaledCanvasHeight - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / plotDivisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

function paintCircularText(
  label,
  ctx,
  angle,
  labelFont,
  scaledCanvasWidth,
  scaledCanvasHeight
) {
  let startAngle = angle;
  let clockwise = -1;
  let textHeight = Number(labelFont.slice(0, 2));
  ctx.translate(scaledCanvasWidth / 2, scaledCanvasHeight / 2);
  ctx.textBaseline = "middle";
  ctx.font = labelFont;

  // rotate 50% of total angle for center alignment
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width;
    startAngle +=
      (charWid / (scaledCanvasWidth / 2 - textHeight) / 2) * -clockwise;
  }

  ctx.rotate(startAngle);

  // Now for the fun bit: draw, rotate, and repeat
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width; // half letter
    // rotate half letter
    ctx.rotate(
      (charWid / 2 / (scaledCanvasWidth / 2 - textHeight)) * clockwise
    );
    // draw the character at "top" or "bottom"
    // depending on inward or outward facing
    ctx.fillText(
      label[j],
      0,
      -1 * (0 - scaledCanvasWidth / 2 + textHeight / 2)
    );

    ctx.rotate(
      (charWid / 2 / (scaledCanvasWidth / 2 - textHeight)) * clockwise
    ); // rotate half letter
  }
}

function drawCircleCanvas(
  ctx,
  canvasData,
  colors,
  scaledCanvasWidth,
  scaledCanvasHeight,
  labelFont,
  numberFont,
  offset
) {
  let {
    plotSizeX,
    plotSizeY,
    plotDivisor,
    axisLabel,
    hasLabels,
    hasGrid,
    hasRedGrid,
    redGridFactor,
  } = canvasData;
  let pxPerUnitX = scaledCanvasWidth / plotSizeX;
  let pxPerUnitY = scaledCanvasHeight / plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.strokeStyle = colors.canvasGrid;
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(pxPerUnitX * i, 0.5);

    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if (i % redGridFactor === 0) {
          ctx.moveTo(x, scaledCanvasHeight);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(x, scaledCanvasHeight);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // paint numbers
    if (hasLabels) {
      if (i !== 0 && i % plotDivisor === 0 && i !== plotSizeX) {
        // draw numbers along axis
        let textHeight = hasRedGrid
          ? scaledCanvasHeight - pxPerUnitY * redGridFactor
          : scaledCanvasHeight / 2;

        ctx.font = numberFont;
        ctx.textBaseline = "top";
        ctx.fillText(
          i / plotDivisor,
          pxPerUnitX * i + offset * 2,
          textHeight + offset // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (hasLabels) {
    // X labels
    ctx.save();
    paintCircularText(
      axisLabel,
      ctx,
      45,
      labelFont,
      scaledCanvasWidth,
      scaledCanvasHeight
    );
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= plotSizeY; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(0.5, pxPerUnitY * i);

    // paint grid
    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if ((i - plotSizeY) % redGridFactor === 0) {
          ctx.moveTo(x, y);
          ctx.lineTo(scaledCanvasWidth, y);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(scaledCanvasWidth, y);
      }
      ctx.stroke();
    }
  }
}

export { drawCanvasBg, drawSquareCanvas, drawCircleCanvas };
