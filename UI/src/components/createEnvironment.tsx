import React from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";

const deployService = new DeployService()

function CreateEnvironment() {
    deployService.makeComeCall("")

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/CreateEnvironment.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default CreateEnvironment;
