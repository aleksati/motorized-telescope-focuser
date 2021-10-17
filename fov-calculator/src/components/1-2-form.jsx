import React from "react";
import FormInputs from "./1-2-2-form-inputs";

const Form = (props) => {
  const SubmitBtnColor = () => {
    let className = "btn text-light ml-1 mb-1 bg-";
    className += props.formswitch ? "gradient-info" : "gradient-success";
    return className;
  };

  const inputAddonColor = () => {
    let className = "input-group-text text-light mr-1 bg-";
    className += props.formswitch ? "gradient-info" : "gradient-success";
    return className;
  };

  const getCamSection = () => (
    <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
      <h2 className="ml-2 mt-1 text-light">Camera</h2>
      <FormInputs
        title="Camera"
        items={[
          props.formdata.pixelsize,
          props.formdata.resolutionx,
          props.formdata.resolutiony,
        ]}
        addoncolor={inputAddonColor()}
        onChange={props.onChange}
      />
    </div>
  );

  const getEyeSection = () => (
    <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
      <h2 className="ml-2 mt-1 text-light">Eyepiece</h2>
      <FormInputs
        title="Eyepiece"
        items={[
          props.formdata.eyepiecefocallength,
          props.formdata.eyepieceafov,
        ]}
        addoncolor={inputAddonColor()}
        onChange={props.onChange}
      />
    </div>
  );

  return (
    <form className="d-flex" onSubmit={props.onSubmit}>
      <div className="form-group border border-white rounded ml-1 mb-1 bg-gradient-dark col">
        <h2 className="ml-2 mt-1 text-light">Telescope</h2>
        <FormInputs
          title="Telescope"
          items={[
            props.formdata.aperture,
            props.formdata.focallength,
            props.formdata.barlow,
          ]}
          onChange={props.onChange}
          addoncolor={inputAddonColor()}
        />
      </div>
      {props.formswitch ? getEyeSection() : getCamSection()}
      <input className={SubmitBtnColor()} type="submit" value="Plot!" />
    </form>
  );
};

export default Form;
