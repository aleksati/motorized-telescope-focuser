let LABELOFFSET = 0; // We only use 5% of the canvas size to make room for labels.

let globalWidth = 0;
let globalHeight = 0;

const LABELFONT = "30px Arial";
const NUMBERFONT = "15px Arial";
const COZYOFFSET = 3;

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
  x = x > globalWidth ? globalWidth - 0.5 : x;
  let y = Math.round(orgY - 0.5) + 0.5;
  y = y > globalHeight ? globalHeight - 0.5 : y;
  return { x, y };
}

function paintCircularText(label, ctx, angle) {
  let startAngle = angle;
  let clockwise = -1;
  let textHeight = Number(LABELFONT.slice(0, 2));
  ctx.translate(globalWidth / 2, globalHeight / 2);
  ctx.textBaseline = "middle";
  ctx.font = LABELFONT;

  // rotate 50% of total angle for center alignment
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width;
    startAngle += (charWid / (globalWidth / 2 - textHeight) / 2) * -clockwise;
  }

  ctx.rotate(startAngle);

  // Now for the fun bit: draw, rotate, and repeat
  for (let j = 0; j < label.length; j++) {
    let charWid = ctx.measureText(label[j]).width; // half letter
    // rotate half letter
    ctx.rotate((charWid / 2 / (globalWidth / 2 - textHeight)) * clockwise);
    // draw the character at "top" or "bottom"
    // depending on inward or outward facing
    ctx.fillText(label[j], 0, -1 * (0 - globalWidth / 2 + textHeight / 2));

    ctx.rotate((charWid / 2 / (globalWidth / 2 - textHeight)) * clockwise); // rotate half letter
  }
}

export function setupCanvas(cnv, chartinfo, text) {
  // set the correct size of the canvas and update variables.
  // the width is always 100% by default.
  // returns the context

  // for optimal canvas rendering on the current screen.
  let dpr = window.devicePixelRatio || 1;
  let context = cnv.getContext("2d");
  context.scale(dpr, dpr);

  let { width } = cnv.getBoundingClientRect();
  cnv.width = width * dpr;
  globalWidth = cnv.width;

  let unitY = chartinfo.plotSizeY;
  let unitX = chartinfo.plotSizeX;
  let pxPerUnitX = cnv.width / unitX; // pixel to size ratio
  let newHeight = pxPerUnitX * unitY;
  cnv.height = newHeight;
  globalHeight = cnv.height;

  if (text) {
    // calculate how much we should shrink the canvas in order to fit the LABELFONT and NUMBERFONT nicely on the outside.
    // we base the calculation on whichever axis has the least pixels.
    let smllstSide = globalHeight < globalWidth ? globalHeight : globalWidth;
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
  return context;
}

export function paintBg(ctx) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, globalWidth, globalHeight);
}

export function paintOnSquare(ctx, chartinfo, text, grid) {
  let offsetHeight = (globalHeight / 100) * LABELOFFSET;
  let offsetWidth = (globalWidth / 100) * LABELOFFSET;

  let pxPerUnitX = (globalWidth - offsetWidth) / chartinfo.plotSizeX;
  let pxPerUnitY = (globalHeight - offsetHeight) / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = textColor; // text and numbers
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(
      pxPerUnitX * i + offsetWidth,
      globalHeight - offsetHeight
    );

    // paint X grid
    ctx.beginPath();
    if (i === 0 || i === chartinfo.plotSizeX) {
      // the border
      ctx.strokeStyle = borderColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0.5);
    } else if (grid) {
      ctx.strokeStyle = gridColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0.5);
    }
    ctx.stroke();

    // paint numbers
    if (text) {
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
          globalHeight - offsetHeight + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (text) {
    // X label
    ctx.font = LABELFONT;
    ctx.fillText(
      chartinfo.axisLabel,
      globalWidth / 2 + offsetWidth,
      globalHeight -
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
      globalHeight / 2 - offsetHeight
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(chartinfo.axisLabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    let { x, y } = nearestHalf(globalWidth + offsetWidth, pxPerUnitY * i);

    // paint Y grid
    ctx.beginPath();
    if (i === 0 || i === chartinfo.plotSizeY) {
      // border
      ctx.strokeStyle = borderColor;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    } else if (grid) {
      ctx.strokeStyle = gridColor;
      ctx.moveTo(0 + offsetWidth, y);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // paint numbers
    if (text) {
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
          globalHeight - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / chartinfo.plotDivisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

export function paintOnCircle(ctx, chartinfo, text, grid) {
  let pxPerUnitX = globalWidth / chartinfo.plotSizeX;
  let pxPerUnitY = globalHeight / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.fillStyle = textColor; // text and numbers
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    let { x, y } = nearestHalf(pxPerUnitX * i, 0);

    if (grid) {
      ctx.beginPath();
      ctx.moveTo(x, globalHeight);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // paint numbers
    if (text) {
      if (
        i !== 0 &&
        i % chartinfo.plotDivisor === 0 &&
        i !== chartinfo.plotSizeX
      ) {
        // draw numbers along axis
        ctx.font = NUMBERFONT;
        ctx.textBaseline = "top";
        ctx.fillText(
          i / chartinfo.plotDivisor,
          pxPerUnitX * i + COZYOFFSET * 2,
          globalHeight / 2 + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis labels
  if (text) {
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
    if (grid) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(globalWidth, y);
      ctx.stroke();
    }
  }
}
