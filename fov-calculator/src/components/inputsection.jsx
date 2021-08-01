import React from "react";

const InputSection = (props) => {
  return (
    <div className="form-group border border-white rounded m-2">
      <h2 className="ml-2 mt-2 text-light">{props.title}</h2>
      <div className="d-flex">
        {props.items.map((item) => {
          return (
            <div className="input-group mb-2">
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
              <div className="input-group-append">
                <span className={props.addonColor} id="addon" key={item.ref}>
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputSection;
