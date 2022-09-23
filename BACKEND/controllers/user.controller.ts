import {Request, Response} from 'express';
import UserService from '../services/user.service';

class UserController {
    async listUsers(req: Request, res: Response) {
        const users = await UserService.list();
        res.status(200).send(users);
    }

    async getUserById(req: Request, res: Response) {
        const user = await UserService.readById(req.body.id);
        res.status(200).send(user);
    }

    async createUser(req: Request, res: Response) {
        const userId = await UserService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async put(req: Request, res: Response) {
        console.log(await UserService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: Request, res: Response) {
        console.log(await UserService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new UserController();