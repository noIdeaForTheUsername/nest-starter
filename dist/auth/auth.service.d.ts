import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(login: string, password: string): Promise<{
        accessToken: string;
    }>;
    login(login: string, password: string): Promise<{
        accessToken: string;
    }>;
}
