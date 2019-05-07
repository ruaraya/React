import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  {
    /*we use "rest operator" to assing attribute and variables with identical names*/
  }
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />

      {error && <div className="alert alert-danger">{error}</div>}
      {/* using && we will return something if error is not empty */}
    </div>
  );
};

export default Input;
