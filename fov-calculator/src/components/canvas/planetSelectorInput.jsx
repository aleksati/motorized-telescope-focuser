import React from "react";

const PlanetSelectorInput = (props) => {
  return (
    <div>
      <img
        src={props.planetImg}
        alt={props.planetName}
        width={props.planetWidth}
        title={props.planetName}
        onClick={(e) => {
          props.onPlanetSelect(e.target.alt);
        }}
        style={{ opacity: props.isVisible ? 0.3 : 1 }}
      />
    </div>
  );
};

export default PlanetSelectorInput;
