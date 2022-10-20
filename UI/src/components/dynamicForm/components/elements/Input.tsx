// @ts-nocheck
import React, { useContext } from "react";
import { FormContext } from "../../FormContext";

const Input = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_error,
}) => {
  const { handleChange } = useContext(FormContext);
  return (
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">{field_label}</label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        // aria-describedby="emailHelp"
        placeholder={field_placeholder ? field_placeholder : " "}
        value={field_value}
        name="field_value"
        onChange={(event) => handleChange(field_id, event)}
      />
      <p>{field_error}</p>
    </div>
  );
};

export default Input;
