import TemplateDao from '../dao/templateDao';
import Template from "../types/templateType";

class TemplateService {
    async create(template: Template) {
        return TemplateDao.addTemplate(template);
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

export default TemplateService;