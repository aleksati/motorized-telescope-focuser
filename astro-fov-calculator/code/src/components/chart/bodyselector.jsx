import React from "react";
import { motion } from "framer-motion";
import { selectedX } from "../../data/crowd-data";
import loading from "../../img/error-loading/loading.gif";
import error from "../../img/error-loading/error.gif";
import BodySelectorImage from "./bodySelectorImage";
import BodySelectorMenu from "./bodySelectorMenu";

const BodySelector = (props) => {
  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      {props.isError ? (
        <img src={error} alt="ERROR..." width="25px" height="25px" />
      ) : props.isLoading ? (
        <img src={loading} alt="loading..." width="25px" height="25px" />
      ) : (
        <>
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
                bodyName={props.bodyData[key].string}
                bodyWidth={"25px"}
                key={props.bodyData[key].string}
                isVisible={props.bodyData[key].isVisible}
                bodyImg={props.bodyData[key].img}
                selectedX={selectedX}
                onBodySelection={props.onBodySelection}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default BodySelector;
