import React from "react";

const InfoInput = (props) => {
  return (
    <div className="form-label-group mb-0 mt-2">
      <p className={"mr-1 " + props.colors.text}>
        <small>{props.name}</small>
      </p>
      <p className={props.borderStyle}>{props.value}</p>
    </div>
  );
};

export default InfoInput;
