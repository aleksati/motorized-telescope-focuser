let LABELOFFSET = 0; // We only use 5% of the canvas size to make room for labels.

let currentWidth = 0;
let currentHeight = 0;

const LABELFONT = "30px Arial";
const NUMBERFONT = "15px Arial";
const COZYOFFSET = 3;
const reducedGridFactor = 6;

const textColor = "#9C9C9C";
const borderColor = "#9C9C9C";
const gridColor = "#4c4c4c";

function nearestHalf(orgX, orgY) {
  // round to nearest 0.5
  // to light of single pixels instead of 2.
  // The screen can’t display half a pixel, so it expands the line to cover a total of two pixels.
  // thats why every line must go from .5 something to .5 something
  // http://diveintohtml5.info/canvas.html

  let x = Math.round(orgX - 0.5) + 0.5;
  x = x > currentWidth ? currentWidth - 0.5 : x;
  let y = Math.round(orgY - 0.5) + 0.5;
  y = y > currentHeight ? currentHeight - 0.5 : y;
  return { x, y };
}

function paintCircularText(label, ctx, angle) {
  let startAngle = angle;
  let clockwise = -1;
  let textHeight = Number(LABELFONT.slice(0, 2));
  ctx.translate(currentWidth / 2, currentHeight / 2);
  ctx.textBaseline = "middle";
  ctx.font = LABELFONT;

  // rotate 50% of total angle for center alignment
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width;
    startAngle += (charWid / (currentWidth / 2 - textHeight) / 2) * -clockwise;
  }

  ctx.rotate(startAngle);

  // Now for the fun bit: draw, rotate, and repeat
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width; // half letter
    // rotate half letter
    ctx.rotate((charWid / 2 / (currentWidth / 2 - textHeight)) * clockwise);
    // draw the character at "top" or "bottom"
    // depending on inward or outward facing
    ctx.fillText(label[j], 0, -1 * (0 - currentWidth / 2 + textHeight / 2));

    ctx.rotate((charWid / 2 / (currentWidth / 2 - textHeight)) * clockwise); // rotate half letter
  }
}

function getLabelOffset(label) {
  if (label && currentHeight && currentWidth) {
    // calculate how much we should shrink the canvas in order to fit the LABELFONT and NUMBERFONT nicely on the outside.
    // we base the calculation on whichever axis has the least pixels.
    let smllstSide =
      currentHeight < currentWidth ? currentHeight : currentWidth;
    // then we find how many % the the font and labels are of the axis with the least pixels.
    let spaceRequired =
      Number(LABELFONT.slice(0, 2)) +
      Number(NUMBERFONT.slice(0, 2)) +
      COZYOFFSET * 2;
    // then we set the LABELOFFSET as that percentage.
    LABELOFFSET = (spaceRequired / smllstSide) * 100;
  } else {
    LABELOFFSET = 0;
  }
}

export function updateCanvasSize(cnv, cnvWidth, chartinfo, text) {
  // for optimal canvas rendering on the current screen.
  currentWidth = cnvWidth;

  let unitY = chartinfo.plotSizeY;
  let unitX = chartinfo.plotSizeX;
  let pxPerUnitX = currentWidth / unitX; // pixel to size ratio
  currentHeight = pxPerUnitX * unitY;

  cnv.width = currentWidth;
  cnv.height = currentHeight;

  getLabelOffset(text);
}

export function paintBg(ctx) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, currentWidth, currentHeight);
}

export function paintOnSquare(ctx, chartinfo, hasLabel, hasGrid, hasRedGrid) {
  let offsetHeight = (currentHeight / 100) * LABELOFFSET;
  let offsetWidth = (currentWidth / 100) * LABELOFFSET;

  let pxPerUnitX = (currentWidth - offsetWidth) / chartinfo.plotSizeX;
  let pxPerUnitY = (currentHeight - offsetHeight) / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = textColor; // text and numbers
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(
      pxPerUnitX * i + offsetWidth,
      currentHeight - offsetHeight
    );
    // paint X grid
    ctx.beginPath();
    if (i === 0 || i === chartinfo.plotSizeX) {
      // the border
      ctx.strokeStyle = borderColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0.5);
    } else if (hasGrid) {
      ctx.strokeStyle = gridColor;
      if (hasRedGrid) {
        if (i % reducedGridFactor === 0) {
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
    if (hasLabel) {
      if (
        i !== 0 &&
        i % chartinfo.plotDivisor === 0 &&
        i !== chartinfo.plotSizeX
      ) {
        // draw numbers along X axis
        ctx.textBaseline = "top";
        ctx.font = NUMBERFONT;
        ctx.fillText(
          i / chartinfo.plotDivisor,
          pxPerUnitX * i + offsetWidth,
          currentHeight - offsetHeight + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (hasLabel) {
    // X label
    ctx.font = LABELFONT;
    ctx.fillText(
      chartinfo.axisLabel,
      currentWidth / 2 + offsetWidth,
      currentHeight -
        offsetHeight +
        COZYOFFSET +
        Number(NUMBERFONT.slice(0, 2)) +
        COZYOFFSET
    );

    // Y label
    ctx.save();
    ctx.textBaseline = "bottom";
    ctx.font = LABELFONT;
    ctx.translate(
      offsetWidth - COZYOFFSET - Number(NUMBERFONT.slice(0, 2)) - COZYOFFSET,
      currentHeight / 2 - offsetHeight
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(chartinfo.axisLabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(currentWidth + offsetWidth, pxPerUnitY * i);

    // paint Y grid
    ctx.beginPath();
    if (i === 0 || i === chartinfo.plotSizeY) {
      // border
      ctx.strokeStyle = borderColor;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    } else if (hasGrid) {
      ctx.strokeStyle = gridColor;
      if (hasRedGrid) {
        if ((chartinfo.plotSizeY - i) % reducedGridFactor === 0) {
          ctx.moveTo(0 + offsetWidth, y);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(0 + offsetWidth, y);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // paint numbers
    if (hasLabel) {
      if (
        i !== 0 &&
        i % chartinfo.plotDivisor === 0 &&
        i !== chartinfo.plotSizeY
      ) {
        // draw numbers along Y axis
        ctx.font = NUMBERFONT;
        ctx.textBaseline = "bottom"; // hmmmm
        ctx.save();
        ctx.translate(
          offsetWidth - COZYOFFSET,
          currentHeight - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / chartinfo.plotDivisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

export function paintOnCircle(ctx, chartinfo, hasLabel, hasGrid, hasRedGrid) {
  let pxPerUnitX = currentWidth / chartinfo.plotSizeX;
  let pxPerUnitY = currentHeight / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = textColor; // text and numbers
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(pxPerUnitX * i, 0);

    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if (i % reducedGridFactor === 0) {
          ctx.moveTo(x, currentHeight);
          ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(x, currentHeight);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // paint numbers
    if (hasLabel) {
      if (
        i !== 0 &&
        i % chartinfo.plotDivisor === 0 &&
        i !== chartinfo.plotSizeX
      ) {
        // draw numbers along axis
        let textHeight = hasRedGrid
          ? currentHeight - pxPerUnitY * reducedGridFactor
          : currentHeight / 2;

        ctx.font = NUMBERFONT;
        ctx.textBaseline = "top";
        ctx.fillText(
          i / chartinfo.plotDivisor,
          pxPerUnitX * i + COZYOFFSET * 2,
          textHeight + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (hasLabel) {
    // X labels
    ctx.save();
    paintCircularText(chartinfo.axisLabel, ctx, 45);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(0, pxPerUnitY * i);

    // paint grid
    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if ((i - chartinfo.plotSizeY) % reducedGridFactor === 0) {
          ctx.moveTo(x, y);
          ctx.lineTo(currentWidth, y);
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(currentWidth, y);
      }
      ctx.stroke();
    }
  }
}
