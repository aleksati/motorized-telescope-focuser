let LABELOFFSET = 0; // We only use 5% of the canvas size to make room for labels.

let currentWidth = 0;
let currentHeight = 0;

const LABELFONT = "30px Arial";
const NUMBERFONT = "15px Arial";
const COZYOFFSET = 3;

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

  // let x = orgX;
  // let y = orgY;
  // return { x, y };
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

function getLabelOffset(hasLabel) {
  if (hasLabel && currentHeight && currentWidth) {
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

export function updateCanvasSize(
  cnv,
  cnvWidth,
  plotsizex,
  plotsizey,
  hasLabel
) {
  // for optimal canvas rendering on the current screen.
  currentWidth = cnvWidth;

  let unitY = plotsizey;
  let unitX = plotsizex;
  let pxPerUnitX = currentWidth / unitX; // pixel to size ratio
  currentHeight = pxPerUnitX * unitY;

  cnv.width = currentWidth;
  cnv.height = currentHeight;

  getLabelOffset(hasLabel);
}

export function paintBg(ctx) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, currentWidth, currentHeight);
}

export function paintOnSquare(
  ctx,
  plotsizex,
  plotsizey,
  plotdivisor,
  axislabel,
  hasLabel,
  hasGrid,
  hasRedGrid,
  redGridFactor,
  colors
) {
  let offsetHeight = (currentHeight / 100) * LABELOFFSET;
  let offsetWidth = (currentWidth / 100) * LABELOFFSET;

  let pxPerUnitX = (currentWidth - offsetWidth) / plotsizex;
  let pxPerUnitY = (currentHeight - offsetHeight) / plotsizey;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= plotsizex; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(
      pxPerUnitX * i + offsetWidth,
      currentHeight - offsetHeight
    );
    // paint X grid
    ctx.beginPath();
    if (i === 0 || i === plotsizex) {
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
    if (hasLabel) {
      if (i !== 0 && i % plotdivisor === 0 && i !== plotsizex) {
        // draw numbers along X axis
        ctx.textBaseline = "top";
        ctx.font = NUMBERFONT;
        ctx.fillText(
          i / plotdivisor,
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
      axislabel,
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
    ctx.fillText(axislabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= plotsizey; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(currentWidth + offsetWidth, pxPerUnitY * i);
    console.log(x, y);

    // paint Y grid
    ctx.beginPath();
    if (i === 0 || i === plotsizey) {
      // border
      ctx.strokeStyle = colors.canvasBorder;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    } else if (hasGrid) {
      ctx.strokeStyle = colors.canvasGrid;
      if (hasRedGrid) {
        if ((plotsizey - i) % redGridFactor === 0) {
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
      if (i !== 0 && i % plotdivisor === 0 && i !== plotsizey) {
        // draw numbers along Y axis
        ctx.font = NUMBERFONT;
        ctx.textBaseline = "bottom"; // hmmmm
        ctx.save();
        ctx.translate(
          offsetWidth - COZYOFFSET,
          currentHeight - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / plotdivisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

export function paintOnCircle(
  ctx,
  plotsizex,
  plotsizey,
  plotdivisor,
  axislabel,
  hasLabel,
  hasGrid,
  hasRedGrid,
  redGridFactor,
  colors
) {
  let pxPerUnitX = currentWidth / plotsizex;
  let pxPerUnitY = currentHeight / plotsizey;

  ctx.textAlign = "center";
  ctx.fillStyle = colors.canvasText; // text and numbers
  ctx.strokeStyle = colors.canvasGrid;
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= plotsizex; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(pxPerUnitX * i, 0);

    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if (i % redGridFactor === 0) {
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
      if (i !== 0 && i % plotdivisor === 0 && i !== plotsizex) {
        // draw numbers along axis
        let textHeight = hasRedGrid
          ? currentHeight - pxPerUnitY * redGridFactor
          : currentHeight / 2;

        ctx.font = NUMBERFONT;
        ctx.textBaseline = "top";
        ctx.fillText(
          i / plotdivisor,
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
    paintCircularText(axislabel, ctx, 45);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= plotsizey; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(0, pxPerUnitY * i);

    // paint grid
    if (hasGrid) {
      ctx.beginPath();
      if (hasRedGrid) {
        if ((i - plotsizey) % redGridFactor === 0) {
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
