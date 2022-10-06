import React from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";
import EnvForm from "../components/envForm";

const deployService = new DeployService()

function CreateEnvironment() {
  deployService.makeComeCall("")

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h2>Create an environment</h2>
      <EnvForm></EnvForm>
    </div>
  );
}

export default CreateEnvironment;
