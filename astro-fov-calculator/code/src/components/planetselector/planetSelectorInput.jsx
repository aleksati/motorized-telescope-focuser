import React from "react";
import { motion } from "framer-motion";

// https://www.framer.com/docs/examples/

const PlanetSelectorInput = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
      <img
        src={props.isVisible ? props.selectedX : props.planetImg}
        alt={props.planetName}
        width={props.planetWidth}
        onClick={(e) => {
          props.onPlanetSelect(e.target.alt);
        }}
        style={{ opacity: props.isVisible ? 0.3 : 1 }}
      />
    </motion.div>
  );
};

export default PlanetSelectorInput;
