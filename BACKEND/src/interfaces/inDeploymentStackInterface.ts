interface IInDeploymentStack {
    id: number;
    template_id: number;
    stack_id: string;
    status: string;
  };
export class InDeploymentStack implements IInDeploymentStack {
    id: number;
    template_id: number;
    stack_id: string;
    status: string;


    constructor(id: number, template_id: number, stack_id: string) {
        this.id = id;
        this.template_id = template_id;
        this.stack_id = stack_id;
        this.status = "Deploying";
    }

}

export default IInDeploymentStack;