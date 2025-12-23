import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { AccessLevel } from "src/users/entity/access-level.enum";
import type { UserAuth } from "./user-auth.interface";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDTO, res: Response): Promise<void>;
    login(body: LoginDTO, res: Response): Promise<void>;
    getOwnUser(userAuth: UserAuth): Promise<{
        id: import("bson").ObjectId;
        login: string;
        accessLevel: AccessLevel;
    }>;
}
