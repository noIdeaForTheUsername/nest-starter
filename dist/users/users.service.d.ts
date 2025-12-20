import { User } from "./entity/user.interface";
import { AccessLevel } from "./entity/access-level.enum";
export declare class UsersService {
    private users;
    private getUserIndexById;
    private findMaxId;
    getUser(id: number, customExceptionMessage?: string): User;
    getUsers(): User[];
    getUserByLogin(login: string): Promise<User | undefined>;
    addUser(login: string, password: string): {
        id: number;
        login: string;
        password: string;
        accessLevel: AccessLevel;
    };
    deleteUser(id: number): Promise<void>;
}
