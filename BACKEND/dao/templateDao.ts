import Template from "../types/templateType";

class TemplateDao {
    templates: Array<Template> = [];
    idCount: number = 0;

    constructor() {
        console.log("TemplateDao created");
    }

    async addTemplate(template: Template) {
        template.id = this.idCount;
        console.log(template);
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

    //TODO: The Template updated to the array doesn't have an id.
    //TODO: Implement not found functionalities
    async putTemplateById(templateId: number, template: Template) {
        console.log(templateId);
        const objIndex = this.templates.findIndex(
            obj => obj.id === templateId
        );
        template.id = templateId;
        this.templates.splice(objIndex, 1, template);
        return `${template.id} updated via put`;
    }

    //TODO: Implement not found functionalities
    async removeTemplateById(templateId: number) {
        const objIndex = this.templates.findIndex(
            (obj: { id: number }) => obj.id === templateId
        );
        this.templates.splice(objIndex, 1);
        return `${templateId} removed`;
    }

}

export default new TemplateDao;