import IUser from "../interfaces/userInterface";

class UserDao {
    users: Array<IUser> = [];
    idCount: number = 0;

    constructor() {
        console.log("UserDao created");
    }

    async addUser(user: IUser) {
        user.id = this.idCount;
        this.users.push(user);
        this.idCount++;
        return user;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: number) {
        return this.users.find((user: { id: number }) => user.id === userId);
    }

    async getCurrentUser(userName: string, password: string) {
        return this.users.find(user => user.email === email && user.password === password);
    }

    async putUserById(userId: number, user: IUser) {
        const objIndex = this.users.findIndex(
            (obj: { id: number }) => obj.id === userId
        );
        user.id = userId;
        this.users.splice(objIndex, 1, user);
        return `${user.id} updated via put`;
    }

    async removeUserById(userId: number) {
        const objIndex = this.users.findIndex(
            (obj: { id: number }) => obj.id === userId
        );
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }

}

export default new UserDao;