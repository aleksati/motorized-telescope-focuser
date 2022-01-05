import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import BodySelector from "./bodyselector";
import CrowdSelector from "./crowdselector";
import initCrowdData from "../../data/crowd-data";
import { getSolarSystemData } from "../../utils/requests/getSolarsystemdata";

const Chart = ({ canvasData, colors }) => {
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
        alert(error);
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
      <div className="container d-flex justify-content-around p-0 mb-4">
        <CrowdSelector
          isEyepieceMode={canvasData.isEyepieceMode}
          colors={colors}
          onCrowdSelection={handleCrowdSelection}
          currCrowdName={currCrowdName ? currCrowdName : ""}
          crowdNamesArray={crowdData ? Object.keys(crowdData) : []}
        />
        <BodySelector
          isLoading={isLoading}
          isError={isError}
          onBodySelection={handleBodySelection}
          currCrowd={currCrowd}
        />
      </div>
      <Canvas
        isLoading={isLoading}
        isError={isError}
        canvasData={canvasData}
        colors={colors}
        currCrowd={currCrowd ? currCrowd : {}}
      ></Canvas>
    </div>
  );
};

export default Chart;
