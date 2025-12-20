import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { UsersService } from "src/users/users.service";



@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async register(login: string, password: string) {
    const user = this.usersService.addUser(login, password);

    const payload = { sub: user.id, login: user.login, accessLevel: AccessLevel.User }
    return { accessToken: await this.jwtService.signAsync(payload) }
  }

  public async login(login: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByLogin(login);
    if (!user || user.password !== password)
      throw new UnauthorizedException("Login or password not correct");

    const payload = { sub: user.id, login: user.login, accessLevel: user.accessLevel }
    return { accessToken: await this.jwtService.signAsync(payload) }
  }
}