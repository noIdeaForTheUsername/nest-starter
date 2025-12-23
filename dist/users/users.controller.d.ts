import { UsersService } from "./users.service";
import { AccessLevelDTO } from "./dto/access-level.dto";
import type { UserAuth } from "src/auth/user-auth.interface";
import { ObjectId } from "mongodb";
import { UserResponseDTO } from "./dto/user-response.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    private userToDto;
    getUsers(): Promise<(UserResponseDTO | null)[]>;
    getUser(id: ObjectId): Promise<UserResponseDTO | null>;
    changeAccessLevel(caller: UserAuth, id: ObjectId, dto: AccessLevelDTO): Promise<void>;
}
