interface IInDeploymentStack {
    id: number;
    name: string;
    stackId: string;
    status: string;
  };
export class InDeploymentStack implements IInDeploymentStack {
    id: number;
    name: string;
    stackId: string;
    status: string;


    constructor(id: number, name: string, stackId: string) {
        this.id = id;
        this.name = name;
        this.stackId = stackId;
        this.status = "Deploying";
    }

}

export default IInDeploymentStack;