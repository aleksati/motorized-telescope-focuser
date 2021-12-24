import React from "react";

const FormInput = (props) => (
  <div className="d-flex">
    {props.items.map((item) => {
      return (
        <div className="form-label-group" key={item.ref}>
          <input
            type={item.type}
            placeholder={item.name}
            id={item.ref}
            name={item.ref}
            onChange={props.onFormChange}
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
);

export default FormInput;
