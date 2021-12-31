import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import BodySelector from "./bodyselector";
import VisibleBody from "./visibleBody";
import initCrowdData from "../../data/crowd-data";
import getSolarSystemData from "../../utils/getSolarSystemData";

// props:
// canvasData
// colors

const Chart = (props) => {
  const [crowdData, setCrowdData] = useState(null);
  const [currCrowd, setCurrCrowd] = useState(null);
  const [currCrowdName, setCurrCrowdName] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch more space data.
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
      <Canvas canvasData={props.canvasData} colors={props.colors}>
        {(canvasRef, canvasWidth) => (
          <VisibleBody
            isLoading={isLoading}
            isError={isError}
            canvasRef={canvasRef}
            canvasWidth={canvasWidth ? canvasWidth : 0}
            currCrowd={currCrowd ? currCrowd : {}}
            canvasData={props.canvasData}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Chart;
