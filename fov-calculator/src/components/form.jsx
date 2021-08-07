import React, { Component } from "react";
import InputSection from "./inputsection.jsx";
import FormInfo from "./forminfo";
import { getFormDataInfo, camChartSize, eyepieceChartSize } from "./utils.js";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        aperture: {
          ref: "aperture",
          value: "",
          required: true,
          type: "number",
          name: "Aperture",
          unit: "mm",
        },
        focallength: {
          ref: "focallength",
          value: "",
          required: true,
          type: "number",
          name: "Focal Length",
          unit: "mm",
        },
        barlow: {
          ref: "barlow",
          value: "",
          required: false,
          type: "number",
          name: "Barlow",
          unit: "x",
        },
        pixelsize: {
          ref: "pixelsize",
          value: "",
          required: true,
          type: "number",
          name: "Pixel Size",
          unit: "μm²",
        },
        resolutionx: {
          ref: "resolutionx",
          value: "",
          required: true,
          type: "number",
          name: "Res (X)",
          unit: "px",
        },
        resolutiony: {
          ref: "resolutiony",
          value: "",
          required: true,
          type: "number",
          name: "Res (Y)",
          unit: "px",
        },
        eyepiecefocallength: {
          ref: "eyepiecefocallength",
          value: "",
          required: true,
          type: "number",
          name: "Focal Length",
          unit: "mm",
        },
        eyepiecefov: {
          ref: "eyepiecefov",
          value: "",
          required: false,
          type: "number",
          name: "FOV",
          unit: "°",
        },
      },
      formdatainfo: {
        focalratio: {
          value: "",
          ref: "focalratio",
          name: "Focal Ratio",
          type: "number",
          unit: "",
        },
        aspectratio: {
          value: "",
          ref: "aspectratio",
          name: "Aspect Ratio",
          type: "number",
          unit: "",
        },
        pxperunit: {
          value: "",
          ref: "pxperunit",
          name: "Pixels Per Unit Measure",
          unit: "",
        },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  SubmitBtnColor = () => {
    let className = "btn m-2 btn-";
    className += this.props.formswitch ? "primary" : "success";
    return className;
  };

  inputAddonColor = () => {
    let className = "input-group-text text-light mr-2 bg-";
    className += this.props.formswitch ? "primary" : "success";
    return className;
  };

  handleChange(e) {
    let newValue = e.target.value;
    let itemRef = e.target.id;
    let stateCopy = { ...this.state.formdata };
    let itemCopy = { ...stateCopy[itemRef] };
    itemCopy.value = newValue;
    stateCopy[itemRef] = itemCopy;
    this.setState({ formdata: stateCopy });
  }

  handleSubmit(e) {
    e.preventDefault();

    // update the chart size and config
    let newchartinfo = this.props.formswitch
      ? eyepieceChartSize(this.state.formdata)
      : camChartSize(this.state.formdata);
    this.props.onChartinfo(newchartinfo);

    // update the form data info
    let newformdatainfo = getFormDataInfo(this.state.formdata);
    this.setState({ formdatainfo: newformdatainfo });
  }

  getCamSection = () => {
    return (
      <InputSection
        title="Camera"
        items={[
          this.state.formdata.pixelsize,
          this.state.formdata.resolutionx,
          this.state.formdata.resolutiony,
        ]}
        addoncolor={this.inputAddonColor()}
        onChange={this.handleChange}
      />
    );
  };

  getEyeSection = () => {
    return (
      <InputSection
        title="Eyepiece"
        items={[
          this.state.formdata.eyepiecefocallength,
          this.state.formdata.eyepiecefov,
        ]}
        addoncolor={this.inputAddonColor()}
        onChange={this.handleChange}
      />
    );
  };

  render() {
    return (
      <div>
        <div className="row">
          <form className="d-flex" onSubmit={this.handleSubmit}>
            <InputSection
              title="Telescope"
              items={[
                this.state.formdata.aperture,
                this.state.formdata.focallength,
                this.state.formdata.barlow,
              ]}
              onChange={this.handleChange}
              addoncolor={this.inputAddonColor()}
            />
            {this.props.formswitch
              ? this.getEyeSection()
              : this.getCamSection()}
            <input
              className={this.SubmitBtnColor()}
              type="submit"
              value="Plot!"
            />
          </form>
        </div>
        {/* <div className="row">
          <FormInfo items=[]/>
        </div> */}
      </div>
    );
  }
}

export default Form;
