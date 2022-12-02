interface IDeployedStack {
    id: number;
    name: string;
    template_id: number;
    stack_id: string;
    status: string;
  }
export class DeployedStack implements IDeployedStack {
    id: number;
    name: string;
    template_id: number;
    stack_id: string;
    status: string;


    constructor(id: number, name: string,template_id: number, stack_id: string) {
        this.id = id;
        this.name =name;
        this.template_id = template_id;
        this.stack_id = stack_id;
        this.status = "Deploying";
    }

}

export default IDeployedStack;
