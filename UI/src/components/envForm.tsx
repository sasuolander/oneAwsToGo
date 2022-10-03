import '../styles/envForm.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

class EnvForm extends React.Component {

    override render() {
        return (  
                <FormControl id="form-ctrl">
                    <div className="form-div">
                        <TextField id="id-textfield" label="ID" variant="outlined" helperText="Enter an identifier for the environment" required></TextField> 
                    </div>
                    <div className="form-div">
                        <TextField id="template-dropdown" label="Template" helperText="Select a template" variant="outlined" select required>
                            <MenuItem value="dummy1">Dummy 1</MenuItem>
                            <MenuItem value="dummy2">Dummy 2</MenuItem>
                        </TextField>                   
                    </div>
                    <div className="form-div">
                        <Button id="form-submit" variant="contained">Create</Button>
                    </div>
                </FormControl>
        )    
    }
}

export default EnvForm;


