import React from "react";

const InfoInput = (props) => {
  return (
    <div className="form-label-group mb-0 mt-2">
      <p className="text-light mr-1">
        <small>{props.name}</small>
      </p>
      <p className={props.borderStyle}>{props.value}</p>
    </div>
  );
};

export default InfoInput;
