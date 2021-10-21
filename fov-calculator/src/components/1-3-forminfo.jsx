import React from "react";
import FormInfoInputs from "./1-3-3-forminfo-inputs";
import TheWeatherTonight from "./1-3-3-forminfo-theweather";

const FormInfo = (props) => {
  return (
    <div className="d-flex">
      <div className="form-group border border-white rounded ml-1 bg-gradient-dark col-6">
        <h2 className="ml-2 mt-1 text-light">Info</h2>
        <FormInfoInputs
          menustate={props.menustate}
          onGridSwitch={props.onGridSwitch}
          formswitch={props.formswitch}
        />
      </div>
      <div className="form-group border border-white rounded ml-1 bg-gradient-dark col-2">
        <h2 className="m-1 d-flex justify-content-center text-light">
          Forecast
        </h2>
        <TheWeatherTonight />
      </div>
      <div className="form-group border border-white rounded ml-1 bg-gradient-dark col">
        <h2 className="m-1 text-light">Presets</h2>
      </div>
    </div>
  );
};

export default FormInfo;
