import UserDao from '../dao/userDao';
import User from "../types/userType";

class UserService {
    async create(user: User) {
        return UserDao.addUser(user);
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

    async putById(id: number, user: User) {
        return UserDao.putUserById(id, user);
    }

}

export default new UserService;