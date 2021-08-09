import React from "react";

const FormInfo = (props) => (
  <div className="form-group border border-white rounded m-2">
    <div className="d-flex">
      return (
      <div className="form-label-group">
        <input
          type={item.type}
          placeholder={item.name}
          id={item.ref}
          name={item.ref}
          onChange={props.onChange}
          value={item.value}
          required={item.required}
          className="form-control ml-2"
          aria-describedby="addon"
        />
        <label htmlFor={item.ref}>{item.name}</label>
        <div className="input-group-append">
          <span className={props.addoncolor} id={item.ref}>
            {item.unit}
          </span>
        </div>
      </div>
      );
    </div>
  </div>
);

// Here i Want:
// A viewer under the form which states the:
// FOCAL RATIO
// ASPECT RATIO of CAMERA
// How many pixels per unit of measure.
// MAKE OPTION TO SEE GRAPH GRID OR NOT
// THE WEATHER TONIGHT?

export default FormInfo;
