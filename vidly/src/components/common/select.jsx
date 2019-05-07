import React from "react";

const Select = ({ name, label, values, selectedValue, error, ...rest }) => {
  {
    /*we use "rest operator" to assing attribute and variables with identical names*/
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select
        value={selectedValue}
        {...rest}
        name={name}
        id={name}
        className="form-control"
      >
        {values.map(value => (
          <option value={value._id} key={value._id}>
            {value.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* using && we will return something if error is not empty */}
    </div>
  );
};

export default Select;
