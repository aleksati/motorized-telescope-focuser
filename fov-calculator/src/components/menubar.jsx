import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import FormInfo from "./forminfo";

const Menubar = (props) => (
  <div className="container">
    <div className="row">
      <BootstrapSwitchButton
        checked={props.menustate.formswitch}
        onlabel="Camera"
        onstyle="primary"
        offlabel="Eyepiece"
        offstyle="success"
        onChange={props.onFormSwitch}
        style="w-100 m-2"
      />
    </div>
    <div className="row">
      <Form
        formswitch={props.menustate.formswitch}
        formdata={props.menustate.formdata}
        onChange={props.onChange}
        onSubmit={props.onSubmit}
      />
    </div>
    <div className="row">
      <FormInfo menustate={props.menustate} onGridSwitch={props.onGridSwitch} />
    </div>
  </div>
);

export default Menubar;
