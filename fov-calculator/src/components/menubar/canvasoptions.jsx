import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasPlusMinus from "./canvasplusminus";

const CanvasOptions = (props) => {
  return (
    <div className="border border-white rounded ml-1 mb-3 bg-gradient-dark">
      {/* <h2 className="m-1">Canvas</h2> */}
      <FormGroup className="text-light justify-content-around" row>
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
        <CanvasPlusMinus formswitch={props.formswitch} />
      </FormGroup>
      {/* <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
        <h2 className="m-1 text-light">Presets</h2>
      </div> */}
    </div>
  );
};

export default CanvasOptions;
