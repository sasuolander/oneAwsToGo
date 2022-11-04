import axios from "axios";
import {TemplateFormat} from "../interface/templateInterface";

export interface IDeploymentResult {
    httpStatus: number | undefined,
    deploymentId: string | undefined
}

export interface IPayload {
    templateId: number
    templateFormat: TemplateFormat
    deploymentName: string,
    parameters: string,
}

export interface ITemplatePayload {
    id: number | undefined
    name: string | undefined
    formConfig:string| undefined
    templateFormat:TemplateFormat| undefined
}

export class TemplatePayload implements ITemplatePayload{
    id: number | undefined
    name: string | undefined
    formConfig:string | undefined
    templateFormat:TemplateFormat| undefined

    constructor(id: number, name: string, formConfig: string, templateFormat: TemplateFormat) {
        this.id = id;
        this.name = name;
        this.formConfig = formConfig;
        this.templateFormat = templateFormat;
    }
}
export class Payload implements IPayload {
    templateFormat: TemplateFormat;
    templateId: number;
    deploymentName: string;
    parameters: string;
    constructor(templateId: number,templateFormat: TemplateFormat, deploymentName: string,parameters:string) {
        this.templateFormat = templateFormat
        this.templateId = templateId
        this.deploymentName = deploymentName
        this.parameters = parameters
    }
}

export interface IDeployedPayload {
    name: string | undefined,
    stackId: string | undefined,
    id: Number | undefined
}

export class DeployedPayload implements IDeployedPayload{
    name: string | undefined;
    stackId: string | undefined;
    id: Number | undefined;

    constructor(name:string, stackId: string, id: Number) {
        this.name = name;
        this.stackId = stackId;
        this.id = id;
    }
}

export const baseApi = "/api"
export default class Backend {

    static fetchTemplates():Promise<TemplatePayload[]> {
        return axios.get(baseApi as string + "/templates")
            .then(response => {
                return response.data.map((r:any) =>{ return new TemplatePayload(r.id, r.name, r.formConfig, r.templateFormat)})
            })
    }

    static triggerCreation(id: number, name: string,parameters:string): Promise<IDeploymentResult> {
        // TODO remove hard coded format when we start supporting different template format
        return axios.post(baseApi as string + "/trigger", new Payload(id, TemplateFormat.CloudFormation, name,parameters)).then(r => {
            return {httpStatus: r.data.httpStatus, deploymentId: r.data.deploymentId};
        })
    }

    static fetchDeployed():Promise<DeployedPayload[]> {
        return axios.get(baseApi as string + "/deployed")
            .then(response => {
                return response.data.map((response:any) =>{ return new DeployedPayload(response.name, response.stackId, response.id)})
        })
    }
}


