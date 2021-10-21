import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./1-2-form";
import FormInfo from "./1-3-forminfo";

const Menubar = (props) => (
  <div className="container">
    <BootstrapSwitchButton
      checked={props.menustate.formswitch}
      onlabel="Camera"
      onstyle="info"
      offlabel="Eyepiece"
      offstyle="success"
      onChange={props.onFormSwitch}
      style="w-100 ml-1 mb-1 mr-1 mt-2"
    />
    <Form
      formswitch={props.menustate.formswitch}
      formdata={props.menustate.formdata}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
    />
    <FormInfo
      menustate={props.menustate}
      onGridSwitch={props.onGridSwitch}
      formswitch={props.menustate.formswitch}
    />
  </div>
);

export default Menubar;
