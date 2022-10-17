import axios from "axios";
import {TemplateFormat} from "../interface/templateInterface";

export interface IPayload {
    templateId: number
    templateFormat: TemplateFormat
    deploymentName: string
}

export class Payload implements IPayload {
    templateFormat: TemplateFormat;
    templateId: number;
    deploymentName: string

    constructor(templateFormat: TemplateFormat, templateId: number, deploymentName: string) {
        this.templateFormat = templateFormat
        this.templateId = templateId
        this.deploymentName = deploymentName
    }
}
export const baseApi ="/api"
export default class Backend {

    static fetchTemplates() {
        return axios.get(baseApi as string + "/templates")
            .then(data => {
                return data
            })
    }

    static triggerCreation(id: number, name: string): void {
        // TODO remove hard coded format when we start supporting different template format
        axios.post(baseApi as string + "/trigger", new Payload(id, TemplateFormat.CloudFormation, name)).then(r => {
            return r;
        })
    }
}


