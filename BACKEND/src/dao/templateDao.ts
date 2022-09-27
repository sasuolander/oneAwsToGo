import ITemplate from "../interfaces/templateInterface";

class TemplateDao {
    templates: Array<ITemplate> = [];
    idCount: number = 0;

    constructor() {
        console.log("TemplateDao created");
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