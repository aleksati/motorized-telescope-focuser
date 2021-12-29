import React from "react";
import { motion } from "framer-motion";

// https://www.framer.com/docs/examples/

const BodySelectorImage = (props) => {
  return (
    <motion.div
      initial={true}
      animate={{ x: [-100, 0] }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        props.onBodySelection(event.target.alt);
      }}
    >
      <img
        src={props.isVisible ? props.selectedX : props.planetImg}
        alt={props.planetName}
        width={props.planetWidth}
      />
    </motion.div>
  );
};

export default BodySelectorImage;
