import React from "react";
import { motion } from "framer-motion";
import { DIVIMAGES } from "../../data/img-data";

// https://www.framer.com/docs/examples/
// include some error-handling

const SELECTEDX = DIVIMAGES.selectedX;

const BodySelectorImage = ({
  bodyName,
  isVisible,
  bodyImg,
  onBodySelection,
  bodyWidth,
}) => {
  return (
    <motion.div
      //   initial={true}
      animate={{ x: [-100, 0], rotate: 360 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        onBodySelection(event.target.alt);
      }}
    >
      <img
        src={isVisible ? SELECTEDX : bodyImg}
        alt={bodyName}
        width={bodyWidth}
        style={{ opacity: isVisible ? 0.4 : 1, cursor: "pointer" }}
      />
    </motion.div>
  );
};

export default BodySelectorImage;
