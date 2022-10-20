// @ts-nocheck
import formJSON from "./formElement.json";

import { useState, useEffect } from "react";
import Element from "./components/Element";
import { FormContext } from "./FormContext";
import "./dynamicForm.css";

console.log("formJSON", formJSON);

function DynamicForm() {
  const [elements, setElements] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setElements(config[0]);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(elements);
      console.log("Form submitted");
    } else {
      console.log(Object.keys(formErrors));
    }
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(elements));
    setIsSubmit(true);

  };
  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id, field_value, field_error } = field;
      if (id === field_id) {
        field["field_error"] = "";
        field["field_value"] = event.target.value;
        var regex = new RegExp(field["field_regex"]);
        if (!field["field_value"]) {
          field["field_error"] = "Required";
        } else if (!regex.test(field["field_value"])) {
          field["field_error"] = "Not valid";
        } else if (field["field_value"].length > field["field_max"]) {
          field["field_error"] =
            "Cannot be more than " + field["field_max"] + " characters";
        } else if (field["field_value"].length < field["field_min"]) {
          field["field_error"] =
            "Cannot be less than " + field["field_min"] + " characters";
        }
      }
      setElements(newElements);
    });
    //console.log(elements);
  };

  const validate = (values) => {
    const newElements = { ...elements };
    const errors = {};
    newElements.fields.forEach((field) => {
      const { field_type, field_id, field_value, field_error } = field;
      if (field["field_error"]) {
        errors.errorvalue = field["field_error"];
      }
    });
    return errors;
  };
  const { fields, page_label } = elements ?? {};
  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>{page_label}</h3>
          {fields
            ? fields.map((field, i) => (
                <>
                  <Element key={i} field={field} />
                  <p></p>
                </>
              ))
            : null}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {Object.keys(formErrors).length === 0 && isSubmit
          ? console.log(elements)
          : console.log(formErrors)}
      </div>
    </FormContext.Provider>
  );
}

export default DynamicForm;
