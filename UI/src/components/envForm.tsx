import '../styles/envForm.css';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const EnvForm = () => {

    const [envId, setEnvId] = useState("");
    const [templId, setTemplId] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        alert("ID: " + envId + "\n" + "template: " + templId + "\n");
      }

    return (  
            <form id="form-ctrl" onSubmit={handleSubmit}>
                <div className="form-div">
                        <TextField id="id-textfield" label="ID" variant="outlined" helperText="Enter an identifier for the environment" 
                        value={envId} onChange={(e) => setEnvId(e.target.value)} required></TextField> 
                </div>
                <div className="form-div">
                    <TextField id="template-dropdown" label="Template" helperText="Select a template" variant="outlined" 
                    value={templId} onChange={(e) => setTemplId(e.target.value)}select required>
                        <MenuItem value="dummy1">Dummy 1</MenuItem>
                        <MenuItem value="dummy2">Dummy 2</MenuItem>
                    </TextField>                   
                </div>
                <div className="form-div">
                    <Button type="submit" id="form-submit" variant="contained">Create</Button>
                </div>
            </form>
    ) 
}
    
export default EnvForm;


