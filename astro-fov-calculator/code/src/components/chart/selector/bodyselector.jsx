import React from "react";
import Body from "./body";
import { DIVIMAGES } from "../../../data/img-data";
import PropTypes from "prop-types";

const BODYWIDTH = "35px";
const loading = DIVIMAGES.loading;
const error = DIVIMAGES.error;

const BodySelector = ({ isLoading, isError, onBodySelection, currCrowd }) => {
  return (
    <>
      {isError ? (
        <img src={error} alt="ERROR..." width={BODYWIDTH} height={BODYWIDTH} />
      ) : isLoading ? (
        <img
          src={loading}
          alt="loading..."
          width={BODYWIDTH}
          height={BODYWIDTH}
        />
      ) : (
        <>
          {Object.keys(currCrowd).map((key) => {
            return (
              <Body
                bodyName={currCrowd[key].string}
                key={currCrowd[key].string}
                isVisible={currCrowd[key].isVisible}
                bodyImg={currCrowd[key].img}
                onBodySelection={onBodySelection}
                bodyWidth={BODYWIDTH}
              />
            );
          })}
        </>
      )}
    </>
  );
};

BodySelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onBodySelection: PropTypes.func.isRequired,
  currCrowd: PropTypes.object.isRequired,
};

export default BodySelector;
