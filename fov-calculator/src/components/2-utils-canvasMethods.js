const WIDTH_THRESH = 690; // because of Bootstrap "container" class
const LABELOFFSET = 8; // We only use 8% of the canvas size to make room for labels.
const LABELFONT = "20px Arial";
const NUMBERFONT = "12px Arial";

export function paintHeight(cnv, chartinfo) {
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
}

export function paintGridOnSquare(ctx, chartinfo) {
  let height = ctx.canvas.height;
  let width = ctx.canvas.width;

  let offsetHeight = (height / 100) * LABELOFFSET;
  let offsetWidth = (width / 100) * LABELOFFSET;

  let pxPerUnitX = (width - offsetWidth) / chartinfo.plotSizeX;
  let pxPerUnitY = (height - offsetHeight) / chartinfo.plotSizeY;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";

  // paint X axis grid
  for (let i = 0; i <= chartinfo.plotSizeX; i++) {
    // include 0 and 20 to make the border
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(pxPerUnitX * i + offsetWidth, height - offsetHeight);
    ctx.lineTo(pxPerUnitX * i + offsetWidth, 0);
    ctx.stroke();

    if (ctx.canvas.width > WIDTH_THRESH) {
      // if the canvas is wider than X,
      if (i !== 0 && i % chartinfo.plotDivisor === 0) {
        // draw text
        ctx.font = NUMBERFONT;
        ctx.fillText(
          i,
          pxPerUnitX * i + offsetWidth,
          height - offsetHeight / 2 - 20 // this is just random
        );
      }
    }
  }

  // paint X axis label
  ctx.font = LABELFONT;
  ctx.fillText(
    chartinfo.axisLabel,
    width / 2 + offsetWidth,
    height - offsetHeight / 2 + 10
  );

  // paint Y axis grid
  for (let i = 0; i <= chartinfo.plotSizeY; i++) {
    // include 0 and 20 to make the border
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(0 + offsetWidth, pxPerUnitY * i);
    ctx.lineTo(width + offsetWidth, pxPerUnitY * i);
    ctx.stroke();

    if (ctx.canvas.width > WIDTH_THRESH) {
      // if the canvas is wider than X,
      if (i !== 0 && i % chartinfo.plotDivisor === 0) {
        // draw text on the divisor plane
        ctx.font = NUMBERFONT;
        ctx.fillText(
          i,
          0 + offsetWidth / 2 + 20,
          height - pxPerUnitY * i - offsetHeight
        );
      }
    }
  }

  // paint Y axis label
  ctx.save();
  ctx.font = LABELFONT;
  ctx.translate(offsetWidth / 2 - 10, height / 2 - offsetHeight);
  ctx.rotate(Math.PI / -2);
  ctx.fillText(chartinfo.axisLabel, 0, 0);
  ctx.restore();
}

// influencing variables:
// gridswitch
// formswitch
// paintGridOnSquare()
// paintGridOnCircle()
// paintNoGridOnSquare()
// paintNoGridOnCircle()

export function paintBg(ctx) {
  // paint background
  ctx.fillStyle = "#000000"; //"#138496";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
