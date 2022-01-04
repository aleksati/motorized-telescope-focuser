import React, { useEffect, useState, useRef } from "react";
import Forecast from "./forecast";
import InfoInput from "./infoinput";
import * as calc from "../../utils/calc";

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
  // for get pxPerSquare (Grid)
  const prevRedGridState = useRef(props.hasRedGrid);
  const prevGridState = useRef(props.hasGrid);

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

  // get Focal Ratio
  useEffect(() => {
    const focalRatio = calc.getFratio(
      props.focallength.value,
      props.barlow.value,
      props.aperture.value
    );

    setState((prevState) => ({
      ...prevState,
      focalRatio: {
        ...prevState.focalRatio,
        value: focalRatio,
        isChanged: true,
      },
    }));
  }, [props.barlow, props.focallength, props.aperture]);

  // get Aspect Ratio
  useEffect(() => {
    const aspectRatio = calc.getAspectRatio(
      props.resolutionx.value,
      props.resolutiony.value
    );

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
    const flengthScope = calc.getFlength(
      props.focallength.value,
      props.barlow.value
    );
    const mag = calc.getMag(flengthScope, props.eyepiecefocallength.value);

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
    const maxMag = calc.getMaxMag(
      props.focallength.value,
      props.aperture.value
    );
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
  useEffect(() => {
    const pxPerGridSquare = calc.getPxPerGridSquare(
      props.resolutionx.value,
      props.resolutiony.value,
      props.plotsizex,
      props.plotsizey,
      props.hasGrid,
      props.hasRedGrid,
      props.redGridFactor
    );

    setState((prevState) => ({
      ...prevState,
      pxPerSquare: {
        ...prevState.pxPerSquare,
        value: pxPerGridSquare,
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
      const sensorXsizeMM = calc.mic2mm(resX, pixelSize);
      const sensorYsizeMM = calc.mic2mm(resY, pixelSize);
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
