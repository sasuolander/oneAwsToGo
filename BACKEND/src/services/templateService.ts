import TemplateDao from '../dao/templateDao';
import ITemplate from "../interfaces/templateInterface";

class TemplateService {
    async create(template: ITemplate) {
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

    async putById(id: number, resource: ITemplate) {
        return TemplateDao.putTemplateById(id, resource);
    }

}

export default TemplateService;