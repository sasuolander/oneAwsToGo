import TemplateDao from '../dao/template.dao';
import Template from "../types/template.type";

class TemplateService {
    async create(resource: Template) {
        return TemplateDao.addTemplate(resource);
    }

    async deleteById(id: number) {
        return TemplateDao.removeTemplateById(id);
    }

    async list() {
        return TemplateDao.getTemplates();
    }

    async readById(id: number) {
        return TemplateDao.getTemplateById(id);
    }

    async putById(id: number, resource: Template) {
        return TemplateDao.putTemplateById(id, resource);
    }

}

export default new TemplateService();