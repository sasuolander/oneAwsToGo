import UserDao from '../dao/userDao';
import IUser from "../interfaces/userInterface";

class UserService {
    userDao:UserDao = new UserDao()

    async create(user: IUser) {
        return this.userDao.addUser(user);
    }

    async deleteById(id: number) {
        return this.userDao.removeUserById(id);
    }

    async list() {
        return this.userDao.getUsers();
    }

    async readById(id: number) {
        return this.userDao.getUserById(id);
    }

    async putById(id: number, user: IUser) {
        return this.userDao.putUserById(id, user);
    }

    async checkCredentials(username: string, password: string) {
        return this.userDao.checkCredentials(username, password);
    }

}

export default UserService;
