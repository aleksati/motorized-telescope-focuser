import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasZoom from "./canvaszoom";

const CanvasOptions = (props) => {
  return (
    <div className="border border-white rounded mb-3 bg-gradient-dark">
      <FormGroup className="text-light justify-content-around" row>
        <FormControlLabel
          control={
            <Switch
              inputProps={{ "aria-label": "Gridswitch" }}
              color={props.formswitch ? "info" : "success"}
              checked={props.gridswitch}
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
              inputProps={{ "aria-label": "Reduce Gridlines" }}
              color={props.formswitch ? "info" : "success"}
            />
          }
          label="Reduce Gridlines"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              inputProps={{ "aria-label": "Labels" }}
              color={props.formswitch ? "info" : "success"}
              checked={props.canvasLabels}
              onChange={(event) => {
                props.onLabelSwitch(event.target.checked);
              }}
            />
          }
          label="Labels"
          labelPlacement="start"
        />
        <CanvasZoom
          formswitch={props.formswitch}
          onZoomSwitch={props.onZoomSwitch}
          zoomValue={props.zoomValue}
        />
      </FormGroup>
      {/* <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
        <h2 className="m-1 text-light">Presets</h2>
      </div> */}
    </div>
  );
};

export default CanvasOptions;
