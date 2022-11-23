import IUser from "../interfaces/userInterface";
import {db} from "../database/configDb";
import { logger } from "../utils/logger";
export default class UserDao {
    constructor() {
        logger.info("UserDao created");
    }

    async addUser(user: IUser) {
        const newId : any = await db.select(db.raw(`nextval('serial')`)).first();
        user.id = newId.nextval;
        await db<IUser>("user").insert(user);
        return user;
    }

    async getUsers() {
        const allUsers = await db.select("*")
        .from<IUser>("user")
        .then();
        return allUsers;
    }

    async getUserById(userId: number) {
        const foundUser = await db<IUser>("user").where("id", userId).first();
        return foundUser;
    }

    async putUserById(userId: number, user: IUser) {
        user.id = userId;
        await db("user")
        .where({id: userId})
        .update(user)
        return `${user.id} updated via put`;
    }

    async removeUserById(userId: number) {
        await db("user")
        .where({id: userId})
        .del()
        return `${userId} removed`;
    }

}
