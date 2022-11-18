import ITemplate, {TemplateFormat} from "../interfaces/templateInterface";
import emptysite from "../../dummy_db/emptysite.json"
import wordpresssite from "../../dummy_db/wordpresssite.json"
import {db} from "../database/configDb";

export default class TemplateDao {
    templates: Array<ITemplate> = [];
    idCount: number = 1;

    constructor() {
        console.log("TemplateDao created");
    }

    async addTemplate(template: ITemplate) {
        const newId : any = await db.select(db.raw(`nextval('serial')`)).first();
        console.log(newId.nextval);
        template.id = newId.nextval;
        await db<ITemplate>("user").insert(template);
        return template;
    }

    async getTemplates() {
        const allTemplates = await db.select("*")
        .from<ITemplate>("template")
        .then();
        return allTemplates;
    }

    async getTemplateById(TemplateId: number) {
        const foundTemplate = await db<ITemplate>("template").where("id", TemplateId).first();
        return foundTemplate;
    }

    async putTemplateById(templateId: number, template: ITemplate) {
        template.id = templateId;
        await db("template")
        .where({id: templateId})
        .update(template)
        return `${template.id} updated via put`;
    }

    async removeTemplateById(templateId: number) {
        await db("template")
        .where({id: templateId})
        .del()
        return `${templateId} removed`;
    }

}
