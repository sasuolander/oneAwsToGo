import React, {useEffect, useState} from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";
import FetchTemplateService from "../service/fetchTemplateService";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ITemplate from '../interface/templateInterface';

const deployService = new DeployService();
const templateService = new FetchTemplateService();

function CreateEnvironment() {

  const [envId, setEnvId] = useState("");
  const [templId, setTemplId] = useState("");
  const [templates, setTemplates] = useState<ITemplate[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert("ID: " + envId + "\n" + "template: " + templId + "\n");
  }

  useEffect(() => {
    const promise = templateService.getTemplates();
    promise.then(function(data) {
      setTemplates(data);
    });
  });
  
  return (
    <div className="create-environment-component">
      <h2>Create an environment</h2>
      <form id="form-ctrl" onSubmit={handleSubmit}>
        <div className="form-div">
          <TextField id="id-textfield" label="ID" variant="outlined" helperText="Enter an identifier for the environment" 
          value={envId} onChange={(e) => setEnvId(e.target.value)} required></TextField> 
        </div>
        <div className="form-div">
          <TextField id="template-dropdown" label="Template" helperText="Select a template" variant="outlined" 
          value={templId} onChange={(e) => setTemplId(e.target.value)}select required>
              {templates.map((template) => {     
                return (
                  <MenuItem key={template.id} value={template.id}>{template.name}</MenuItem>
                );
              })}    
          </TextField>                   
        </div>
        <div className="form-div">
          <Button type="submit" id="form-submit" variant="contained">Create</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateEnvironment;
