import UserDao from '../dao/userDao';
import IUser from "../interfaces/userInterface";

class UserService {
    async create(user: IUser) {
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

    async readByLogin(name: string, password: string) {
        return UserDao.getCurrentUser(name, password);
    }

    async putById(id: number, user: IUser) {
        return UserDao.putUserById(id, user);
    }

}

export default UserService;