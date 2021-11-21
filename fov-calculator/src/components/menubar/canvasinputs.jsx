import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// canvasOptions

const CanvasInputs = (props) => {
  return (
    <FormGroup className="d-flex">
      <FormControlLabel
        control={
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            color={props.formswitch ? "info" : "success"}
            checked={props.menustate.gridswitch}
            onChange={(event) => {
              props.onGridSwitch(event.target.checked);
            }}
          />
        }
        label="Grid"
        labelPlacement="start"
      />
    </FormGroup>
  );
};

export default CanvasInputs;
