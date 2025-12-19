import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type { Response } from "express";
export declare class AuthController {
    private authSerice;
    constructor(authSerice: AuthService);
    register(body: RegisterDTO, res: Response): Promise<void>;
    login(body: LoginDTO, res: Response): Promise<void>;
    getPassword(req: any): Promise<any>;
}
