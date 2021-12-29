import React from "react";
import { motion } from "framer-motion";
import { selectedX } from "../../data/body-data";
import BodySelectorImage from "./bodySelectorImage";
import BodySelectorMenu from "./bodySelectorMenu";

const BodySelector = (props) => {
  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      <BodySelectorMenu
        onCrowdSelection={props.onCrowdSelection}
        isEyepieceMode={props.isEyepieceMode}
        colors={props.colors}
        crowdArray={props.crowdArray}
        currentCrowd={props.currentCrowd}
      />
      {Object.keys(props.bodyData).map((key) => {
        return (
          <BodySelectorImage
            planetName={props.bodyData[key].string}
            key={props.bodyData[key].string}
            isVisible={props.bodyData[key].isVisible}
            planetImg={props.bodyData[key].img}
            selectedX={selectedX}
            onBodySelection={props.onBodySelection}
            planetWidth={"25px"}
          />
        );
      })}
    </div>
  );
};

export default BodySelector;
