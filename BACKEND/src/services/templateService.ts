import TemplateDao from '../dao/templateDao';
import ITemplate from "../interfaces/templateInterface";

class TemplateService {
    templateDao:TemplateDao = new TemplateDao

    constructor() {}

    async create(template: ITemplate) {
        return this.templateDao.addTemplate(template);
    }

    async deleteById(id: number) {
        return this.templateDao.removeTemplateById(id);
    }

    async list() {
        return this.templateDao.getTemplates();
    }

    async readById(id: number) {
        return this.templateDao.getTemplateById(id);
    }

    async putById(id: number, resource: ITemplate) {
        return this.templateDao.putTemplateById(id, resource);
    }

}

export default TemplateService;
