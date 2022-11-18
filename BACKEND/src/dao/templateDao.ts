import ITemplate, {TemplateFormat} from "../interfaces/templateInterface";
import emptysite from "../../dummy_db/emptysite.json"
import wordpresssite from "../../dummy_db/wordpresssite.json"
import terraformexample from "../../dummy_db/terraformexample.json"

class TemplateDao {
    templates: Array<ITemplate> = [];
    idCount: number = 1;

    constructor() {
        console.log("TemplateDao created");
        const firstTemplate : ITemplate = {
            id : 1,
            name: "Website in S3 bucket",
            url:"https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml",
            templateFormat: TemplateFormat.CloudFormation, templateSourceCode:"",
            formConfig: JSON.stringify(emptysite)
        };
        const secondTemplate : ITemplate = {
            id : 2,
            name: "Wordpress site",
            url:"https://raw.githubusercontent.com/sasuolander/templatesAWS/master/WordPress_Single_InstanceOwn.yaml",
            templateFormat: TemplateFormat.CloudFormation, templateSourceCode:"",
            formConfig:JSON.stringify(wordpresssite)
        };
        const thirdTemplate : ITemplate = {
            id : 3,
            name: "terraformexamle",
            url:"https://raw.githubusercontent.com/sasuolander/templatesAWS/master/main.tf",
            templateFormat: TemplateFormat.TerraForm, templateSourceCode:"",
            formConfig:JSON.stringify(terraformexample)
        };
        this.addTemplate(firstTemplate);
        this.addTemplate(secondTemplate);
        this.addTemplate(thirdTemplate);
    }

    async addTemplate(template: ITemplate) {
        template.id = this.idCount;
        this.templates.push(template);
        this.idCount++;
        return template;
    }

    async getTemplates() {
        return this.templates;
    }

    async getTemplateById(TemplateId: number) {
        return this.templates.find((Template: { id: number }) => Template.id === TemplateId);
    }

    async putTemplateById(templateId: number, template: ITemplate) {
        const objIndex = this.templates.findIndex(
            obj => obj.id === templateId
        );
        template.id = templateId;
        this.templates.splice(objIndex, 1, template);
        return `${template.id} updated via put`;
    }

    async removeTemplateById(templateId: number) {
        const objIndex = this.templates.findIndex(
            (obj: { id: number }) => obj.id === templateId
        );
        this.templates.splice(objIndex, 1);
        return `${templateId} removed`;
    }

}

export default new TemplateDao;
