import React from "react";
import InputSection from "./inputsection.jsx";

const Form = (props) => {
  const getCamSection = () => {
    return (
      <InputSection
        title="Camera"
        items={[
          props.formData.pixelsize,
          props.formData.resolutionx,
          props.formData.resolutiony,
        ]}
        addonColor={inputAddonColor()}
        onChange={props.onChange}
        switchState={props.switchState}
      />
    );
  };

  const getEyeSection = () => {
    return (
      <InputSection
        title="Eyepiece"
        items={[props.formData.eyepiecefocallength, props.formData.eyepiecefov]}
        addonColor={inputAddonColor()}
        onChange={props.onChange}
        switchState={props.switchState}
      />
    );
  };

  const SubmitBtnColor = () => {
    let className = "btn m-2 btn-";
    className += props.switchState ? "primary" : "success";
    return className;
  };

  const inputAddonColor = () => {
    let className = "input-group-text text-light mr-2 bg-";
    className += props.switchState ? "primary" : "success";
    return className;
  };

  return (
    <form className="d-flex" onSubmit={props.onSubmit}>
      <InputSection
        title="Telescope"
        items={[
          props.formData.apature,
          props.formData.focallength,
          props.formData.barlow,
        ]}
        onChange={props.onChange}
        switchState={props.switchState}
        addonColor={inputAddonColor()}
      />
      {props.switchState ? getEyeSection() : getCamSection()}
      <input className={SubmitBtnColor()} type="submit" value="Plot!" />
    </form>
  );
};

export default Form;
