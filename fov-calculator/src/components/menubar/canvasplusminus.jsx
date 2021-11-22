import React from "react";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const CanvasPlusMinus = (props) => {
  return (
    <FormGroup className="mb-2 mt-1 ml-2" row>
      <Button
        variant="contained"
        size="small"
        color={props.formswitch ? "info" : "success"}
        className=""
      >
        <ZoomOutIcon />
      </Button>
      <Button
        variant="contained"
        size="small"
        color={props.formswitch ? "info" : "success"}
        className="ml-1"
      >
        <ZoomInIcon />
      </Button>
    </FormGroup>
  );
};

export default CanvasPlusMinus;
