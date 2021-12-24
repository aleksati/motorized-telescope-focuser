import React, { useEffect } from "react";
import { PIMAGES } from "../../img/planets/pimages";
import PlanetSelectorInput from "./planetSelectorInput";

const PlanetSelector = (props) => {
  return (
    <div className="container p-0">
      <div className="mb-4">
        <div className="d-flex justify-content-around">
          {Object.keys(props.planetData).map((key) => {
            return (
              <PlanetSelectorInput
                planetName={props.planetData[key].string}
                key={props.planetData[key].string}
                isVisible={props.planetData[key].isVisible}
                planetImg={props.planetData[key].img}
                selectedX={PIMAGES.selectedX}
                onPlanetSelect={props.onPlanetSelect}
                planetWidth={"25px"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanetSelector;
