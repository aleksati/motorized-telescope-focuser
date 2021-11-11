let LABELOFFSET = 0; // We only use 5% of the canvas size to make room for labels.
const LABELFONT = "20px Arial";
const NUMBERFONT = "12px Arial";
const COZYOFFSET = 3;

export function paintHeight(cnv, chartinfo, text) {
  // Set the height of the canvas based on the
  // aspect ratio between plotSizeX and Y.
  const { width } = cnv.getBoundingClientRect();
  if (cnv.width !== width) {
    cnv.width = width;
  }

  let unitY = chartinfo.plotSizeY;
  let unitX = chartinfo.plotSizeX;
  let pxPerUnitX = cnv.width / unitX; // pixel to size ratio
  let newHeight = pxPerUnitX * unitY;

  cnv.height = newHeight;

  if (text) {
    // calculate how much we should shrink the canvas in order to fit the LABELFONT and NUMBERFONT nicely on the outside.
    // we base the calculation on whichever axis has the least pixels.
    let smllstSide = cnv.height < cnv.width ? cnv.height : cnv.width;
    // then we find how many % the the font and labels are of the axis with the least pixels.
    let spaceRequired =
      Number(LABELFONT.slice(0, 2)) +
      Number(NUMBERFONT.slice(0, 2)) +
      COZYOFFSET * 2;
    // then we set the LABELOFFSET as that percentage.
    LABELOFFSET = (spaceRequired / smllstSide) * 100;
    return;
  }
  LABELOFFSET = 0;
}

export function paintOnSquare(ctx, chartinfo, text, grid) {
  let height = ctx.canvas.height;
  let width = ctx.canvas.width;

  let offsetHeight = (height / 100) * LABELOFFSET;
  let offsetWidth = (width / 100) * LABELOFFSET;

  let pxPerUnitX = (width - offsetWidth) / chartinfo.plotSizeX;
  let pxPerUnitY = (height - offsetHeight) / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.textBaseline = "bottom"; // hmmmm
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    ctx.beginPath();
    if (grid) {
      ctx.moveTo(pxPerUnitX * i + offsetWidth, height - offsetHeight);
      ctx.lineTo(pxPerUnitX * i + offsetWidth, 0);
    } else if (i === 0 || i === chartinfo.plotSizeX) {
      ctx.moveTo(pxPerUnitX * i + offsetWidth, height - offsetHeight);
      ctx.lineTo(pxPerUnitX * i + offsetWidth, 0);
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
        ctx.font = NUMBERFONT;
        ctx.fillText(
          i / chartinfo.plotDivisor,
          pxPerUnitX * i + offsetWidth,
          height - offsetHeight + Number(NUMBERFONT.slice(0, 2)) + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis label
  if (text) {
    // X labels
    ctx.font = LABELFONT;
    ctx.fillText(
      chartinfo.axisLabel,
      width / 2 + offsetWidth,
      height -
        offsetHeight +
        Number(NUMBERFONT.slice(0, 2)) +
        Number(LABELFONT.slice(0, 2)) +
        COZYOFFSET
    );

    // Y labels
    ctx.save();
    ctx.font = LABELFONT;
    ctx.translate(
      offsetWidth - Number(LABELFONT.slice(0, 2)) - COZYOFFSET,
      height / 2 - offsetHeight
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(chartinfo.axisLabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    ctx.beginPath();
    if (grid) {
      ctx.moveTo(0 + offsetWidth, pxPerUnitY * i);
      ctx.lineTo(width + offsetWidth, pxPerUnitY * i);
    } else if (i === 0 || i === chartinfo.plotSizeY) {
      ctx.moveTo(0 + offsetWidth, pxPerUnitY * i);
      ctx.lineTo(width + offsetWidth, pxPerUnitY * i);
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
        ctx.save();
        ctx.translate(
          offsetWidth - COZYOFFSET,
          height - pxPerUnitY * i - offsetHeight
        );
        ctx.rotate(Math.PI / -2);
        ctx.fillText(i / chartinfo.plotDivisor, 0, 0);
        ctx.restore();
      }
    }
  }
}

export function paintOnCircle(ctx, chartinfo, text, grid) {
  let height = ctx.canvas.height;
  let width = ctx.canvas.width;

  let pxPerUnitX = width / chartinfo.plotSizeX;
  let pxPerUnitY = height / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  // paint X axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    //i = 0 and 20 to make the border
    if (grid) {
      ctx.beginPath();
      ctx.moveTo(pxPerUnitX * i, height);
      ctx.lineTo(pxPerUnitX * i, 0);
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
        ctx.fillText(
          i / chartinfo.plotDivisor,
          pxPerUnitX * i + 5,
          height / 2 + Number(NUMBERFONT.slice(0, 2)) + COZYOFFSET // offsett the pixel size chosen above
        );
      }
    }
  }

  // paint X and Y axis label
  if (text) {
    // X labels
    ctx.font = LABELFONT;
    ctx.fillText(
      chartinfo.axisLabel,
      width / 2,
      height +
        Number(NUMBERFONT.slice(0, 2)) +
        Number(LABELFONT.slice(0, 2)) +
        3
    );

    // Y labels
    ctx.save();
    ctx.font = LABELFONT;
    ctx.translate(
      Number(NUMBERFONT.slice(0, 2)) - Number(LABELFONT.slice(0, 2)),
      height / 2
    );
    ctx.rotate(Math.PI / -2);
    ctx.fillText(chartinfo.axisLabel, 0, 0);
    ctx.restore();
  }

  // paint Y axis grid and numbers
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    if (grid) {
      ctx.beginPath();
      ctx.moveTo(0, pxPerUnitY * i);
      ctx.lineTo(width, pxPerUnitY * i);
      ctx.stroke();
    }

    // paint numbers
    // if (text) {
    //   if (
    //     i !== 0 &&
    //     i % chartinfo.plotDivisor === 0 &&
    //     i !== chartinfo.plotSizeY
    //   ) {
    //     // draw numbers along Y axis
    //     ctx.font = NUMBERFONT;
    //     ctx.fillText(
    //       i / chartinfo.plotDivisor,
    //       width / 2 - Number(NUMBERFONT.slice(0, 2)),
    //       height - pxPerUnitY * i
    //     );
    //   }
    // }
  }
}

export function paintBg(ctx) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
