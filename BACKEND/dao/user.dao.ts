import User from "../types/user.type";

class UserDao {
    users: Array<User> = [];
    idCount: number = 0;

    constructor() {
        console.log("UserDao created");
    }

    async addUser(user: User) {
        user.id = this.idCount;
        this.users.push(user);
        this.idCount++;
        return user.id;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: number) {
        return this.users.find((user: { id: number }) => user.id === userId);
    }

    async putUserById(userId: number, user: User) {
        const objIndex = this.users.findIndex(
            (obj: { id: number }) => obj.id === userId
        );
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

export default new UserDao();