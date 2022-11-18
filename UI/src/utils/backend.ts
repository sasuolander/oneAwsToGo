import axios from "axios";
import {TemplateFormat} from "../interface/templateInterface";

export interface IDeploymentResult {
    httpStatus: number | undefined,
    deploymentId: string | undefined,
    id: number | undefined
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
    id: Number | undefined,
    status: string | undefined
}

export class DeployedPayload implements IDeployedPayload{
    name: string | undefined;
    stackId: string | undefined;
    id: Number | undefined;
    status: string | undefined;

    constructor(name:string, stackId: string, id: Number, status: string) {
        this.name = name;
        this.stackId = stackId;
        this.id = id;
        this.status = status;
    }
}

export interface IStatusPayload {
    id: Number | undefined
}

export class StatusPayload implements IStatusPayload{
    id: Number | undefined;

    constructor(id: Number) {
        this.id = id;
    }
}

export interface IDeletePayLoad {
    data : {
        id: Number | undefined
    }

}

export class DeletePayload implements IDeletePayLoad{
    data : {
        id: Number | undefined
    }

    constructor(id: Number) {
        this.data = {id};
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
            return {httpStatus: r.data.httpStatus, deploymentId: r.data.deploymentId, id: r.data.id};
        })
    }

    static fetchDeployed():Promise<DeployedPayload[]> {
        return axios.get(baseApi as string + "/deployed")
            .then(response => {
                return response.data.map((response:any) =>{ return new DeployedPayload(response.name, response.stackId, response.id, response.status)})
        })
    }

    static fetchDevelopmentStatus(id: Number): Promise<any> {
        return axios.post(baseApi as string + "/checkdeployed", new StatusPayload(id)).then(response => {
            return {status: response.data, httpStatus: response.status, text: response.statusText};
        })
    }
    
    static deleteDeployment(id: Number): Promise<any> {
        return axios.delete(baseApi as string + "/deployed/", new DeletePayload(id)).then(response => {
            return {response};
        })
    }
}


