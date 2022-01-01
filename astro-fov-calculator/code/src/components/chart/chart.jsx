import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import BodySelector from "./bodyselector";
import initCrowdData from "../../data/crowd-data";
import getSolarSystemData from "../../utils/requests/getSolarSystemData";

// props:
// canvasData
// colors

const Chart = (props) => {
  const [crowdData, setCrowdData] = useState(null);
  const [currCrowd, setCurrCrowd] = useState(null);
  const [currCrowdName, setCurrCrowdName] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch current API data on celestial objects (AU, distance from earth etc.)
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        const newCrowdData = await getSolarSystemData(initCrowdData);
        const firstCrowdName = Object.keys(newCrowdData)[0];
        const firstCrowd = newCrowdData[firstCrowdName];

        setCrowdData(newCrowdData);
        setCurrCrowd(firstCrowd);
        setCurrCrowdName(firstCrowdName);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const handleCrowdSelection = (crowdSelection) => {
    setCurrCrowdName(crowdSelection);
    setCurrCrowd(crowdData[crowdSelection]);
  };

  const handleBodySelection = (bodyName) => {
    setCurrCrowd((prevState) => {
      let stateCopy = JSON.parse(JSON.stringify(prevState));
      Object.keys(stateCopy).forEach((key) => {
        stateCopy[key].isVisible =
          String(bodyName) === String(key) ? !stateCopy[key].isVisible : false;
      });
      return { ...stateCopy };
    });
  };

  return (
    <div className="container p-0">
      <BodySelector
        isLoading={isLoading}
        isError={isError}
        onBodySelection={handleBodySelection}
        onCrowdSelection={handleCrowdSelection}
        crowdNamesArray={crowdData ? Object.keys(crowdData) : []}
        currCrowdName={currCrowdName ? currCrowdName : ""}
        colors={props.colors}
        currCrowd={currCrowd}
        isEyepieceMode={props.canvasData.isEyepieceMode}
      />
      {/* Canvas passes some props as children render props to visible body */}
      <Canvas
        isLoading={isLoading}
        isError={isError}
        canvasData={props.canvasData}
        colors={props.colors}
        currCrowd={currCrowd ? currCrowd : {}}
      ></Canvas>
    </div>
  );
};

export default Chart;
