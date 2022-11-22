import ITemplate from "../interfaces/templateInterface";
import {db} from "../database/configDb";
import { logger } from "../utils/logger";

export default class TemplateDao {
    constructor() {
        logger.info("TemplateDao created");
    }

    async addTemplate(template: ITemplate) {
        const newId : any = await db.select(db.raw(`nextval('serial')`)).first();
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
