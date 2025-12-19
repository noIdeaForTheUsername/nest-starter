import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(login: string, password: string): Promise<{
        access_token: string;
    }>;
    login(login: string, password: string): Promise<{
        access_token: string;
    }>;
}
