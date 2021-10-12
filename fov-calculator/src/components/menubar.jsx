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
        onstyle="info"
        offlabel="Eyepiece"
        offstyle="success"
        onChange={props.onFormSwitch}
        style="w-100 ml-1 mb-1 mr-1 mt-2"
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
      <FormInfo
        menustate={props.menustate}
        onGridSwitch={props.onGridSwitch}
        formswitch={props.menustate.formswitch}
      />
    </div>
  </div>
);

export default Menubar;
