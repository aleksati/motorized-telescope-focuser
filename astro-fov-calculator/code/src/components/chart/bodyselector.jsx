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

const BODYWIDTH = "25px";
const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;

const BodySelector = (props) => {
  return (
    <div className="container d-flex justify-content-around p-0 mb-4">
      {props.isError ? (
        <img src={error} alt="ERROR..." width={BODYWIDTH} height={BODYWIDTH} />
      ) : props.isLoading ? (
        <img
          src={loading}
          alt="loading..."
          width={BODYWIDTH}
          height={BODYWIDTH}
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
            // Here I should really optiise so that only the images that need to be re-rendered are re-rendered
            return (
              <BodySelectorImage
                bodyName={props.currCrowd[key].string}
                key={props.currCrowd[key].string}
                isVisible={props.currCrowd[key].isVisible}
                bodyImg={props.currCrowd[key].img}
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
