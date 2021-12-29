import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import BodySelector from "./bodyselector";
import { initPlanetData, initMoonData } from "../../data/body-data";

// props:
// canvasData
// colors

const Chart = (props) => {
  const [bodyData, setBodyData] = useState(initPlanetData);
  const [currentCrowd, setCurrentCrowd] = useState("");
  const [crowdData, setCrowdData] = useState({
    planets: initPlanetData,
    moons: initMoonData,
  });

  // contact API.
  useEffect(() => {
    // get all the astronomical data from all the crowd data.
    // set Crowdata with all new info
    // init currentCrowd to "planets"
  }, []);

  // set new bodyData on new crowd selection
  useEffect(() => {
    setBodyData({ ...crowdData[currentCrowd] });
  }, [currentCrowd, crowdData]);

  const handleCrowdSelection = (CrowdSelection) => {
    setCurrentCrowd(CrowdSelection);
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
