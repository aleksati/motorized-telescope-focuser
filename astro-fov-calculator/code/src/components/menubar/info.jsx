import React, { useEffect, useState, useRef } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import microns2milimeter from "../../utils/microns2milimeter";

const Info = (props) => {
  const [state, setState] = useState({
    focalRatio: {
      name: "FR",
      value: "",
      isEyepieceInfo: true,
      isChanged: true,
    },
    aspectRatio: {
      name: "AR",
      value: "",
      isEyepieceInfo: false,
      isChanged: true,
    },
    magnification: {
      name: "CurrMag",
      value: "",
      isEyepieceInfo: true,
      isChanged: false,
    },
    maxMagnification: {
      name: "MaxMag",
      value: "",
      isEyepieceInfo: true,
      isChanged: false,
    },
    pxPerSquare: {
      name: "Grid □",
      value: "",
      isEyepieceInfo: false,
      isChanged: false,
    },
    chipSize: {
      name: "Chip",
      value: "",
      isEyepieceInfo: false,
      isChanged: false,
    },
  });

  // When I submit, I set the isChanged fla to false
  // Whenever the info boxes is changed after submit, the text color changes.
  useEffect(() => {
    setState((prevState) => {
      let stateCopy = JSON.parse(JSON.stringify(prevState));
      Object.keys(stateCopy).forEach((key) => {
        stateCopy[key].isChanged = false;
      });
      return { ...stateCopy };
    });
  }, [props.isSubmit]);

  // get Focal Ratio (F number)
  useEffect(() => {
    let barlow =
      Number(props.barlow.value) <= 0 ? 1 : Number(props.barlow.value);
    let flength =
      Number(props.focallength.value) <= 0
        ? 0
        : Number(props.focallength.value) * barlow;
    let aperture =
      Number(props.aperture.value) <= 0 ? 0 : Number(props.aperture.value);

    let focalRatio =
      aperture !== 0 && flength !== 0
        ? Math.floor((flength / aperture) * 10) / 10
        : "";

    setState((prevState) => ({
      ...prevState,
      focalRatio: {
        ...prevState.focalRatio,
        value: focalRatio,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.aperture]);

  // get Aspect Ratio (Ar)
  useEffect(() => {
    let aspectRatio = "";

    let resX =
      Number(props.resolutionx.value) <= 0
        ? 0
        : Number(props.resolutionx.value);
    let resY =
      Number(props.resolutiony.value) <= 0
        ? 0
        : Number(props.resolutiony.value);

    let aspectX = 10000;
    let aspectY =
      resX === 0 || resY === 0
        ? 0
        : (Number(props.resolutiony.value) / Number(props.resolutionx.value)) *
          10000;

    if (aspectY !== 0) {
      let factorX = [];
      let factorY = [];
      for (let i = 1; i <= aspectX; i++) {
        if (aspectX % i === 0) factorX.push(i);
        if (aspectY % i === 0) factorY.push(i);
      }

      if (factorY.length && factorX.length) {
        let commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
        let greatestCommonFactor = Math.max(...commonFactors);
        aspectX /= greatestCommonFactor;
        aspectY /= greatestCommonFactor;
        aspectRatio = aspectX + ":" + aspectY;
      }
    }

    setState((prevState) => ({
      ...prevState,
      aspectRatio: {
        ...prevState.aspectRatio,
        value: aspectRatio,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony]);

  // get Magnification (Mag)
  useEffect(() => {
    let barlow =
      Number(props.barlow.value) <= 0 ? 1 : Number(props.barlow.value);
    let flength =
      Number(props.focallength.value) <= 0
        ? 0
        : Number(props.focallength.value) * barlow;
    let eyeflength =
      Number(props.eyepiecefocallength.value) <= 0
        ? 0
        : Number(props.eyepiecefocallength.value);

    let mag =
      eyeflength !== 0 && flength !== 0
        ? Math.round((flength / eyeflength) * 10) / 10
        : "";

    setState((prevState) => ({
      ...prevState,
      magnification: {
        ...prevState.magnification,
        value: mag,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.eyepiecefocallength]);

  // get Max Magnification (Max Mag)
  useEffect(() => {
    let flength =
      Number(props.focallength.value) <= 0
        ? 0
        : Number(props.focallength.value);
    let aperture =
      Number(props.aperture.value) <= 0 ? 0 : Number(props.aperture.value);

    let maxMag =
      flength !== 0 && aperture !== 0 ? Math.round(aperture * 2 * 10) / 10 : "";

    setState((prevState) => ({
      ...prevState,
      maxMagnification: {
        ...prevState.maxMagnification,
        value: maxMag,
        isChanged: true,
      },
    }));
  }, [props.focallength, props.aperture]);

  // get pxPerSquare (Grid)
  const prevRedGridState = useRef(props.hasRedGrid);
  const prevGridState = useRef(props.hasGrid);
  useEffect(() => {
    let resX =
      Number(props.resolutionx.value) <= 0
        ? 0
        : Number(props.resolutionx.value);
    let resY =
      Number(props.resolutiony.value) <= 0
        ? 0
        : Number(props.resolutiony.value);
    let plotX = Number(props.plotsizex) <= 0 ? 1 : Number(props.plotsizex);
    let plotY = Number(props.plotsizey) <= 0 ? 1 : Number(props.plotsizey);
    let result = "";

    // if the grid switch is ON and none of the numbers above are 0, we calcuate the grid pixel size.
    if (props.hasGrid && [resX, resY, plotX, plotY].indexOf(0) === -1) {
      let pixelsPerUnitX = Math.round((resX / plotX) * 10) / 10;
      let pixelsPerUnitY = Math.round((resY / plotY) * 10) / 10;

      result = Math.round(pixelsPerUnitX * pixelsPerUnitY * 10) / 10;

      // if hasRedGrid, then the px² should be the: result * redGridFactor²?
      result = props.hasRedGrid
        ? result * (props.redGridFactor * props.redGridFactor) + "px²"
        : result + "px²";
    }

    setState((prevState) => ({
      ...prevState,
      pxPerSquare: {
        ...prevState.pxPerSquare,
        value: result,
        isChanged:
          props.hasRedGrid !== prevRedGridState.current ||
          props.hasGrid !== prevGridState.current
            ? prevState.pxPerSquare.isChanged
            : true,
      },
    }));

    prevRedGridState.current = props.hasRedGrid;
    prevGridState.current = props.hasGrid;
  }, [
    props.resolutionx,
    props.resolutiony,
    props.plotsizex,
    props.plotsizey,
    props.hasGrid,
    props.hasRedGrid,
    props.redGridFactor,
  ]);

  // get Chip Size (Chip)
  useEffect(() => {
    let resX =
      Number(props.resolutionx.value) <= 0
        ? 0
        : Number(props.resolutionx.value);
    let resY =
      Number(props.resolutiony.value) <= 0
        ? 0
        : Number(props.resolutiony.value);
    let pixelSize =
      Number(props.pixelsize.value) <= 0 ? 0 : Number(props.pixelsize.value);
    let result = "";
    // any none of the the var above are 0.
    if ([resX, resY, pixelSize].indexOf(0) === -1) {
      let { sensorXsizeMM, sensorYsizeMM } = microns2milimeter(
        resX,
        resY,
        pixelSize
      );
      result = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";
    }

    setState((prevState) => ({
      ...prevState,
      chipSize: {
        ...prevState.chipSize,
        value: result,
        isChanged: true,
      },
    }));
  }, [props.resolutionx, props.resolutiony, props.pixelsize]);

  return (
    <div
      className={
        "border border-white rounded mb-1 bg-" + props.colors.background
      }
    >
      <div className="d-flex justify-content-around">
        {Object.values(state).map((item) => {
          if (props.isEyepieceMode && item.isEyepieceInfo) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
          if (
            (!props.isEyepieceMode && !item.isEyepieceInfo) ||
            item.name === "FR"
          ) {
            return (
              <InfoInput
                colors={props.colors}
                borderColor={
                  props.isEyepieceMode
                    ? props.colors.eyepieceMode
                    : props.colors.cameraMode
                }
                key={item.name}
                name={item.name}
                value={item.value}
                isChanged={item.isChanged}
              />
            );
          }
        })}
        <Forecast isEyepieceMode={props.isEyepieceMode} colors={props.colors} />
      </div>
    </div>
  );
};

export default Info;
