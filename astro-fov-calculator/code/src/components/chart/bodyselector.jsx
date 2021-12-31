import React from "react";
import { DIVIMAGES } from "../../data/img-data";
import BodySelectorImage from "./bodyselectorimage";
import BodySelectorMenu from "./bodyselectormenu";

// props:
// isLoading
// isError
// onBodySelection
// onCrowdSelection
// crowdNamesArray
// currCrowdName
// colors
// currCrowd
// isEyepieceMode

const BodySelector = (props) => {
  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      {props.isError ? (
        <img src={DIVIMAGES.error} alt="ERROR..." width="25px" height="25px" />
      ) : props.isLoading ? (
        <img
          src={DIVIMAGES.loading}
          alt="loading..."
          width="25px"
          height="25px"
        />
      ) : (
        <>
          <BodySelectorMenu
            isEyepieceMode={props.isEyepieceMode}
            colors={props.colors}
            onCrowdSelection={props.onCrowdSelection}
            currCrowdName={props.currCrowdName}
            crowdNamesArray={props.crowdNamesArray}
          />
          {Object.keys(props.currCrowd).map((key) => {
            return (
              <BodySelectorImage
                bodyName={props.currCrowd[key].string}
                bodyWidth={"25px"}
                key={props.currCrowd[key].string}
                isVisible={props.currCrowd[key].isVisible}
                bodyImg={props.currCrowd[key].img}
                selectedX={DIVIMAGES.selectedX}
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
