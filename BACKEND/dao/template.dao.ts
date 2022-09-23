import Template from "../types/template.type";

class TemplateDao {
    Templates: Array<Template> = [];
    idCount: number = 0;

    constructor() {
        console.log("TemplateDao created");
    }

    async addTemplate(Template: Template) {
        Template.id = this.idCount;
        this.Templates.push(Template);
        this.idCount++;
        return Template.id;
    }

    async getTemplates() {
        return this.Templates;
    }

    async getTemplateById(TemplateId: number) {
        return this.Templates.find((Template: { id: number }) => Template.id === TemplateId);
    }

    async putTemplateById(TemplateId: number, Template: Template) {
        const objIndex = this.Templates.findIndex(
            (obj: { id: number }) => obj.id === TemplateId
        );
        this.Templates.splice(objIndex, 1, Template);
        return `${Template.id} updated via put`;
    }

    async removeTemplateById(TemplateId: number) {
        const objIndex = this.Templates.findIndex(
            (obj: { id: number }) => obj.id === TemplateId
        );
        this.Templates.splice(objIndex, 1);
        return `${TemplateId} removed`;
    }

}

export default new TemplateDao();