import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "./form";
import FormInfo from "./forminfo";

const Menubar = (props) => (
  <div className="container">
    <div className="row p-1">
      <BootstrapSwitchButton
        checked={props.menustate.formswitch}
        onlabel="Camera"
        onstyle="primary"
        offlabel="Eyepiece"
        offstyle="success"
        onChange={props.onFormSwitch}
        style="w-100"
      />
    </div>
    <div className="row p-1">
      <Form
        formswitch={props.menustate.formswitch}
        formdata={props.menustate.formdata}
        onChange={props.onChange}
        onSubmit={props.onSubmit}
      />
    </div>
    {/* Here the FORMINFO will go */}
  </div>
);

export default Menubar;
