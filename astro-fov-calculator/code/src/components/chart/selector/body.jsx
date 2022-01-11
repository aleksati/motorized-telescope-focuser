import React from "react";
import { motion } from "framer-motion";
import { DIVIMAGES } from "../../../data/img-data";
import PropTypes from "prop-types";

// https://www.framer.com/docs/examples/

const SELECTEDX = DIVIMAGES.selectedX;

const Body = ({ bodyName, isVisible, bodyImg, onBodySelection, bodyWidth }) => {
  return (
    <motion.div
      //   initial={true}
      animate={{ x: [-100, 0], rotate: 360 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onTap={(event) => {
        onBodySelection(event.target.alt);
      }}
    >
      <img
        src={isVisible ? SELECTEDX : bodyImg}
        alt={bodyName}
        width={isVisible ? bodyWidth.slice(0, 2) - 7 + "px" : bodyWidth}
        style={{
          opacity: isVisible ? 0.4 : 1,
          cursor: "pointer",
          margin: isVisible ? "10%" : "0",
        }}
      />
    </motion.div>
  );
};

Body.propTypes = {
  bodyName: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  bodyImg: PropTypes.string.isRequired,
  onBodySelection: PropTypes.func.isRequired,
};

export default Body;
