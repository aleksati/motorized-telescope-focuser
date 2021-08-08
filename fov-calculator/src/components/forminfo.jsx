import React from "react";

const FormInfo = (props) => (
  <div className="form-group border border-white rounded m-2">
    <h2 className="ml-2 mt-2 text-light">{props.title}</h2>
    <div className="d-flex">
      {props.items.map((item) => {
        return (
          <div className="form-label-group" key={item.ref}>
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
      })}
    </div>
  </div>
);

// Here i Want:
// A viewer under the form which states the:
// Focal Ratio
// Aspect Ratio of the camera.
// How many pixels per unit of measure.
// Grid switch

export default FormInfo;
