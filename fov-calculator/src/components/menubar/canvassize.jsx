import React from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const CanvasSize = (props) => {
  return (
    <div className="d-flex ml-2">
      <Button
        variant="contained"
        size="small"
        color={props.formswitch ? "info" : "success"}
        className="ml-1 mb-2 mt-1"
      >
        <ZoomInIcon />
      </Button>
      <Button
        variant="contained"
        size="small"
        color={props.formswitch ? "info" : "success"}
        className="ml-1 mb-2 mt-1"
      >
        <ZoomOutIcon />
      </Button>
    </div>
  );
};

export default CanvasSize;
