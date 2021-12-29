import React from "react";
import { motion } from "framer-motion";

// https://www.framer.com/docs/examples/

const BodySelectorImage = (props) => {
  return (
    <motion.div
      initial={true}
      animate={{ x: [-100, 0] }}
      transition={{ ease: "easeOut", duration: 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        props.onBodySelection(event.target.alt);
      }}
    >
      <img
        src={props.isVisible ? props.selectedX : props.bodyImg}
        alt={props.bodyName}
        width={props.bodyWidth}
        style={{ opacity: props.isVisible ? 0.4 : 1, cursor: "pointer" }}
      />
    </motion.div>
  );
};

export default BodySelectorImage;
