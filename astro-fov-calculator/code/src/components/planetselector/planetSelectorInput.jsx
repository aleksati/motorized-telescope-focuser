import React from "react";
import { motion } from "framer-motion";

// https://www.framer.com/docs/examples/

const PlanetSelectorInput = (props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        props.onPlanetSelect(event.target.alt);
      }}
    >
      <img
        src={props.isVisible ? props.selectedX : props.planetImg}
        alt={props.planetName}
        width={props.planetWidth}
        // style={{ opacity: props.isVisible ? 0.3 : 1 }}
      />
    </motion.div>
  );
};

export default PlanetSelectorInput;
