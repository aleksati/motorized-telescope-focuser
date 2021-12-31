import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import BodySelector from "./bodyselector";
import { initCrowdData } from "../../data/crowd-data";
import { getSolarSystemData } from "./getSolarSystemData";

// props:
// canvasData
// colors

const Chart = (props) => {
  const [bodyData, setBodyData] = useState(initCrowdData["planets"]);
  const [currentCrowd, setCurrentCrowd] = useState(null);
  const [crowdData, setCrowdData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // contact API.
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        const newCrowdData = await getSolarSystemData(initCrowdData);
        const firstCrowdName = Object.keys(newCrowdData)[0];
        const firstCrowd = newCrowdData[firstCrowdName];

        setCrowdData(newCrowdData);
        setCurrentCrowd(firstCrowdName);
        setBodyData(firstCrowd);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const handleCrowdSelection = (crowdSelection) => {
    setCurrentCrowd(crowdSelection);
    setBodyData(crowdData[crowdSelection]);
  };

  const handleBodySelection = (bodyName) => {
    setBodyData((prevState) => {
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
        bodyData={bodyData} // this for displaying the current Crowd of bodies for selection
        currentCrowd={currentCrowd}
        crowdArray={Object.keys(crowdData)} // this is for setting the names in the dropdown menu
        colors={props.colors}
        isEyepieceMode={props.canvasData.isEyepieceMode}
      />
      <Canvas canvasData={props.canvasData} colors={props.colors}>
        {/* use render props to pass context to Children! */}
      </Canvas>
    </div>
  );
};

export default Chart;
