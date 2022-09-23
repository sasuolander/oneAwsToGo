import {Request, Response} from 'express';
import TemplateService from '../services/template.service';

class TemplateController {
    async listTemplates(req: Request, res: Response) {
        const Templates = await TemplateService.list();
        res.status(200).send(Templates);
    }

    async getTemplateById(req: Request, res: Response) {
        const Template = await TemplateService.readById(req.body.id);
        res.status(200).send(Template);
    }

    async createTemplate(req: Request, res: Response) {
        const TemplateId = await TemplateService.create(req.body);
        res.status(201).send({ id: TemplateId });
    }

    async put(req: Request, res: Response) {
        console.log(await TemplateService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeTemplate(req: Request, res: Response) {
        console.log(await TemplateService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new TemplateController();