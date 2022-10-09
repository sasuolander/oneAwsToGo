import {TemplateFormat} from "./templateInterface";

export default interface IPostPayload {
    deploymentName:string
    templateId:number
    templateFormat:TemplateFormat
}
