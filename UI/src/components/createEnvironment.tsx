import React, {useEffect, useState} from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";
import FetchTemplateService from "../service/fetchTemplateService";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ITemplate from '../interface/templateInterface';

// TODO think out injection or provider system when using service in react
const deployService = new DeployService();
const templateService = new FetchTemplateService();

interface IEventChange  extends  React.ChangeEvent<HTMLInputElement>{

}

interface IEventSubmit  extends React.FormEvent<HTMLFormElement>{

}

function CreateEnvironment() {

  const [envId, setEnvId] = useState("");
  const [templId, setTempId] = useState(0);
  const [templates, setTemplates] = useState<ITemplate[]>([])

  const handleSubmit = (event: IEventSubmit) => {
      if (templId!==0){
          deployService.triggerCreation(templId,envId)
      }
  }

  useEffect(() => {
    const promise = templateService.getTemplates();
    promise.then(function(response) {
        console.log(response.data)
      setTemplates(response.data);
    });
  });


  return (
    <div className="create-environment-component">
      <h2>Create an environment</h2>
      <form id="form-ctrl" onSubmit={handleSubmit}>
        <div className="form-div">
          <TextField id="id-textfield" label="ID" variant="outlined" helperText="Enter an identifier for the environment"
          value={envId} onChange={(e:IEventChange) => setEnvId(e.target.value)} required></TextField>
        </div>
        <div className="form-div">
          <TextField id="template-dropdown" label="Template" helperText="Select a template" variant="outlined"
          value={templId} onChange={(e:IEventChange) => setTempId(Number(e.target.value))} select required>
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
