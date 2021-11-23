import React from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";

const CanvasZoom = (props) => {
  return (
    <Tooltip title={props.zoomValue + "%"} placement="bottom">
      <ButtonGroup
        variant="contained"
        size="small"
        color={props.formswitch ? "info" : "success"}
        className="mb-2 mt-1"
      >
        <Button
          onClick={() => {
            props.onCanvasZoom(
              props.zoomValue - 1 <= 10 ? 10 : props.zoomValue - 1
            );
          }}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          onClick={() => {
            props.onCanvasZoom(
              props.zoomValue + 1 > 100 ? 100 : props.zoomValue + 1
            );
          }}
        >
          <ZoomInIcon />
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
};

export default CanvasZoom;
