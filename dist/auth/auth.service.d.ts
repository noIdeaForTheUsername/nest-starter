import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ObjectId } from "mongodb";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(login: string, plainPassword: string): Promise<{
        accessToken: string;
    }>;
    login(login: string, password: string): Promise<{
        accessToken: string;
    }>;
    getUser(id: ObjectId, exceptionOnNull?: boolean, customExceptionMessage?: string): Promise<import("../users/entity/user.entity").User | null>;
}
