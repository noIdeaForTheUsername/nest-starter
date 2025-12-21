import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import type { UserAuth } from "./user-auth.interface";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDTO, res: Response): Promise<void>;
    login(body: LoginDTO, res: Response): Promise<void>;
    getPassword(req: any): Promise<any>;
    upgradeToCourier(user: UserAuth): Promise<void>;
}
