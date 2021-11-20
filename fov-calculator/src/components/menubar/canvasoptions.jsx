import React from "react";
import CanvasInputs from "./canvasinputs";

const CanvasOptions = (props) => {
  return (
    <div className="d-flex">
      <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col-7">
        <h2 className="ml-2 mt-1 text-light">Canvas</h2>
        <CanvasInputs
          menustate={props.menustate}
          onGridSwitch={props.onGridSwitch}
          formswitch={props.formswitch}
        />
      </div>
      <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
        <h2 className="m-1 text-light">Presets</h2>
      </div>
    </div>
  );
};

export default CanvasOptions;
