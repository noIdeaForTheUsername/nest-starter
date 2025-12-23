import { User } from "./entity/user.entity";
import { AccessLevel } from "./entity/access-level.enum";
import { UserAuth } from "src/auth/user-auth.interface";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
export declare class UsersService {
    private users;
    constructor(users: MongoRepository<User>);
    getUser(id: ObjectId, exceptionOnNull?: boolean, customExceptionMessage?: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    getUserByLogin(login: string, exceptionOnNull?: boolean): Promise<User | null>;
    addUser(login: string, passwordHash: string): Promise<User>;
    deleteUser(id: ObjectId): Promise<void>;
    changeAccessLevel(userId: ObjectId, callerUser: UserAuth, newAccessLevel: AccessLevel): Promise<void>;
}
