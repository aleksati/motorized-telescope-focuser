import React from "react";
import InputSection from "./inputsection.jsx";

const Form = (props) => {
  const SubmitBtnColor = () => {
    let className = "btn m-2 btn-";
    className += props.formswitch ? "primary" : "success";
    return className;
  };

  const inputAddonColor = () => {
    let className = "input-group-text text-light mr-2 bg-";
    className += props.formswitch ? "primary" : "success";
    return className;
  };

  const getCamSection = () => (
    <InputSection
      title="Camera"
      items={[
        props.formdata.pixelsize,
        props.formdata.resolutionx,
        props.formdata.resolutiony,
      ]}
      addoncolor={inputAddonColor()}
      onChange={props.onChange}
    />
  );

  const getEyeSection = () => (
    <InputSection
      title="Eyepiece"
      items={[props.formdata.eyepiecefocallength, props.formdata.eyepieceafov]}
      addoncolor={inputAddonColor()}
      onChange={props.onChange}
    />
  );

  return (
    <form className="d-flex" onSubmit={props.onSubmit}>
      <InputSection
        title="Telescope"
        items={[
          props.formdata.aperture,
          props.formdata.focallength,
          props.formdata.barlow,
        ]}
        onChange={props.onChange}
        addoncolor={inputAddonColor()}
      />
      {props.formswitch ? getEyeSection() : getCamSection()}
      <input className={SubmitBtnColor()} type="submit" value="Pikk!" />
    </form>
  );
};

export default Form;
