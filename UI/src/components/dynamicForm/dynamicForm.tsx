// @ts-nocheck
import {useState, useEffect} from "react";
import Element from "./components/Element";
import {FormContext} from "./FormContext";
import "../../styles/dynamicForm.css";
import LoadingButton from "@mui/lab/LoadingButton"
import CloudUpload from '@mui/icons-material/CloudUpload';

// TODO add typing in some later time
function DynamicForm({defaultValues, config, submitFormExec, metaData, buttonLoading}) {
    const [elements, setElements] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const json = JSON.parse(config)
        json[0].fields.unshift(defaultValues)
        setElements(json[0]);
    }, [config, formErrors]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(elements));
        setIsSubmit(true);
        const parameters = elements.fields.map((r) => {
            return {field_id: r.field_id, field_value: r.field_value}
        })
        submitFormExec(metaData, parameters)
    };
    const handleChange = (id, event) => {
        const newElements = {...elements};
        newElements.fields.forEach((field) => {
            const {field_type, field_id, field_value, field_error} = field;
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
    };

    const validate = (values) => {
        const newElements = {...elements};
        const errors = {};
        newElements.fields.forEach((field) => {
            const {field_type, field_id, field_value, field_error} = field;
            if (field["field_error"]) {
                errors.errorvalue = field["field_error"];
            }
        });
        return errors;
    };
    const {fields, page_label} = elements ?? {};
    return (
        <FormContext.Provider value={{handleChange}}>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h3>{page_label}</h3>
                    {fields
                        ? fields.map((field, i) => (
                            <>
                                <Element key={i} field={field}/>
                                <p></p>
                            </>
                        ))
                        : null}
                    <LoadingButton type="submit" startIcon={<CloudUpload/>} loading={buttonLoading} 
                    loadingPosition="start" className="btn btn-primary" variant="contained">Create</LoadingButton>    
                </form>
            </div>
        </FormContext.Provider>
    );
}

export default DynamicForm;
