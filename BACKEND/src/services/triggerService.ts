import TemplateService from "./templateService";
import IPostPayload from "../interfaces/postpayloadinterface";
import IDeploy from "../interfaces/deployInterface";
import ITemplate from "../interfaces/templateInterface";

export default class TriggerService {
    private templateService: TemplateService

    constructor(templateService: TemplateService) {
        this.templateService = templateService
    }

    async deployTemplate<T>(name:string,sourceCode: string, deployImpl: IDeploy<any, any>): Promise<T> {
        console.log("deployTemplate",sourceCode)
        return await deployImpl.deploy(name, sourceCode, []) as Promise<T>;
    }

    async findTemplate(toBeDeployed: IPostPayload): Promise<{ found: boolean, data: ITemplate | undefined }> {
        let found = false;
        const templateFound = await this.templateService.readById(toBeDeployed.templateId)
        if (typeof templateFound !== "undefined" ){
            found = true
        }
        return {found: found, data: templateFound};
    }
}
