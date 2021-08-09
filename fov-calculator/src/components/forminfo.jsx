import React from "react";

const FormInfo = (props) => {
  const getFocalRatio = () => {
    let barlow = Number(props.menustate.formdata.barlow.value);
    let flength = Number(props.menustate.formdata.focallength.value);
    let aperture = Number(props.menustate.formdata.aperture.value);

    if (flength <= 0 || aperture <= 0) return ["Focal Ratio", ""];
    if (barlow !== 0) flength *= barlow;
    let focalRatio = Math.floor((flength / aperture) * 10) / 10;
    if (focalRatio <= 0) return ["Focal Ratio", ""];

    return ["Focal Ratio", focalRatio];
  };

  const getAspectRatio = () => {
    if (props.menustate.formswitch) return ["Aspect Ratio", ""];

    let aspectX = 10000;
    let aspectY =
      (Number(props.menustate.formdata.resolutiony.value) /
        Number(props.menustate.formdata.resolutionx.value)) *
      10000;

    if (Number.isNaN(aspectX) || aspectX <= 0) return ["Aspect Ratio", ""];
    if (Number.isNaN(aspectY) || aspectY <= 0) return ["Aspect Ratio", ""];

    let factorX = [];
    let factorY = [];
    for (let i = 1; i <= aspectX; i++) {
      if (aspectX % i === 0) factorX.push(i);
      if (aspectY % i === 0) factorY.push(i);
    }

    if (!factorY.length || !factorX.length) return ["Aspect Ratio", ""];

    let commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
    let greatestCommonFactor = Math.max(...commonFactors);
    aspectX /= greatestCommonFactor;
    aspectY /= greatestCommonFactor;
    let aspectRatio = aspectX + ":" + aspectY;

    return ["Aspect Ratio", aspectRatio];
  };

  const getPixelPerUnit = () => {
    // hmmm
    // pixels per grid square
    // Need to know the total amount of pixels
    // and the amount of squares. (which is the hard part)
  };

  const funks = [getFocalRatio(), getAspectRatio()];

  return (
    <div className="form-group border border-white rounded m-2">
      <h2 className="ml-2 mt-1 text-light">Info</h2>
      <div className="d-flex">
        {funks.map((funk) => {
          const [name, value] = funk;
          return (
            <div className="form-label-group" key={name}>
              <input
                type="text"
                name={name}
                value={value}
                className="rounded ml-2"
                readOnly
              />
              <label htmlFor={name}>{name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// How many pixels per unit of measure.
// MAKE OPTION TO SEE GRAPH GRID OR NOT
// THE WEATHER TONIGHT?

export default FormInfo;
