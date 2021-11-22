import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasSize from "./canvassize";

const CanvasOptions = (props) => {
  return (
    <div className="d-flex">
      <div className="text-light border border-white rounded ml-1 mb-1 bg-gradient-dark col-7">
        <h2 className="m-1">Canvas</h2>
        <FormGroup row>
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
          <FormControlLabel
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                color={props.formswitch ? "info" : "success"}
              />
            }
            label="Reduce Gridlines"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                color={props.formswitch ? "info" : "success"}
              />
            }
            label="Labels"
            labelPlacement="start"
          />
          <CanvasSize formswitch={props.formswitch} />
        </FormGroup>
      </div>
      <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
        <h2 className="m-1 text-light">Presets</h2>
      </div>
    </div>
  );
};

export default CanvasOptions;
