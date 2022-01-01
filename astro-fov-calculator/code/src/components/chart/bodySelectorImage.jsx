import React from "react";
import { motion } from "framer-motion";
import { DIVIMAGES } from "../../data/img-data";

// https://www.framer.com/docs/examples/
// include some error-handling

const BODYWIDTH = "25px";
const SELECTEDX = DIVIMAGES.selectedX;

const BodySelectorImage = ({
  bodyName,
  isVisible,
  bodyImg,
  onBodySelection,
}) => {
  return (
    <motion.div
      initial={true}
      animate={{ x: [-100, 0] }}
      transition={{ ease: "easeOut", duration: 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        onBodySelection(event.target.alt);
      }}
    >
      <img
        src={isVisible ? SELECTEDX : bodyImg}
        alt={bodyName}
        width={BODYWIDTH}
        style={{ opacity: isVisible ? 0.4 : 1, cursor: "pointer" }}
      />
    </motion.div>
  );
};

export default BodySelectorImage;
