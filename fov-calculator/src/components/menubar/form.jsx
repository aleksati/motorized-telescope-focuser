import React from "react";
import FormInput from "./forminput";

const Form = (props) => {
  const SubmitBtnColor = () => {
    let className = "btn ml-1 mb-1 " + props.colors.text + " bg-";
    className += props.isEyepieceMode
      ? props.colors.eyepieceMode
      : props.colors.cameraMode;
    return className;
  };

  const inputAddonColor = () => {
    let className = "input-group-text " + props.colors.text + " bg-";
    className += props.isEyepieceMode
      ? props.colors.eyepieceMode
      : props.colors.cameraMode;
    return className;
  };

  const getCamSection = () => (
    <div
      className={
        "form-group border border-white rounded ml-1 mb-1 col bg-" +
        props.colors.background
      }
    >
      <h2 className={"ml-2 mt-1 " + props.colors.text}>Camera</h2>
      <FormInput
        title="Camera"
        items={[
          props.formData.pixelsize,
          props.formData.resolutionx,
          props.formData.resolutiony,
        ]}
        addoncolor={inputAddonColor()}
        onFormChange={props.onFormChange}
      />
    </div>
  );

  const getEyeSection = () => (
    <div
      className={
        "form-group border border-white rounded ml-1 mb-1 col bg-" +
        props.colors.background
      }
    >
      <h2 className={"ml-2 mt-1 " + props.colors.text}>Eyepiece</h2>
      <FormInput
        title="Eyepiece"
        items={[
          props.formData.eyepiecefocallength,
          props.formData.eyepieceafov,
        ]}
        addoncolor={inputAddonColor()}
        onFormChange={props.onFormChange}
      />
    </div>
  );

  return (
    <form className="d-flex" onSubmit={props.onFormSubmit}>
      <div
        className={
          "form-group border border-white rounded mb-1 col bg-" +
          props.colors.background
        }
      >
        <h2 className={"ml-2 mt-1 " + props.colors.text}>Telescope</h2>
        <FormInput
          title="Telescope"
          items={[
            props.formData.aperture,
            props.formData.focallength,
            props.formData.barlow,
          ]}
          onFormChange={props.onFormChange}
          addoncolor={inputAddonColor()}
        />
      </div>
      {props.isEyepieceMode ? getEyeSection() : getCamSection()}
      <input className={SubmitBtnColor()} type="submit" value="Plot!" />
    </form>
  );
};

export default Form;
