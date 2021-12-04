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
                props.onGridChange(event.target.checked);
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
              checked={props.hasRedGrid}
              onChange={(event) => {
                props.onRedGridChange(event.target.checked);
              }}
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
                props.onLabelChange(event.target.checked);
              }}
            />
          }
          label="Labels"
          labelPlacement="start"
        />
        <CanvasZoom
          formswitch={props.formswitch}
          onZoomChange={props.onZoomChange}
          zoomValue={props.zoomValue}
        />
      </FormGroup>
    </div>
  );
};

export default CanvasOptions;
