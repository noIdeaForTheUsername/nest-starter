import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authSerice;
    constructor(authSerice: AuthService);
    register(body: RegisterDTO): Promise<{
        access_token: string;
    }>;
    login(body: LoginDTO): Promise<{
        access_token: string;
    }>;
    getPassword(req: any): Promise<any>;
}
