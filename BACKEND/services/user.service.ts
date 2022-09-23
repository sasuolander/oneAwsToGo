import UserDao from '../dao/user.dao';
import User from "../types/user.type";

class UserService {
    async create(resource: User) {
        return UserDao.addUser(resource);
    }

    async deleteById(id: number) {
        return UserDao.removeUserById(id);
    }

    async list() {
        return UserDao.getUsers();
    }

    async readById(id: number) {
        return UserDao.getUserById(id);
    }

    async putById(id: number, resource: User) {
        return UserDao.putUserById(id, resource);
    }

}

export default new UserService();