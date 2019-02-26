import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputText = ({
  type,
  error,
  icon,
  name,
  placeholder,
  value,
  onChange
}) => {
  return (
    <div className="form-group">
      <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
          <span className={classnames(`input-group-text ${icon}`)} />
        </div>
        <input
          type={type}
          name={name}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
InputText.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputText.defaultProps = {
  type: "text"
};

export default InputText;
