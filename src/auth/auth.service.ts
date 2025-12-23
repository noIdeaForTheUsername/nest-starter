import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { bcryptRounds } from "./constants";
import { ObjectId } from "mongodb";



@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async register(login: string, plainPassword: string) {
    const passwordHash = await bcrypt.hash(plainPassword, bcryptRounds);
    const user = await this.usersService.addUser(login, passwordHash);

    const payload = { sub: user._id.toHexString(), login: user.login, accessLevel: AccessLevel.User }
    return { accessToken: await this.jwtService.signAsync(payload) }
  }

  public async login(login: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByLogin(login, false);
    if (!user || !await bcrypt.compare(password, user.passwordHash))
      throw new UnauthorizedException("Login or password not correct");

    const payload = { sub: user._id.toHexString(), login: user.login, accessLevel: user.accessLevel }
    return { accessToken: await this.jwtService.signAsync(payload) }
  }

  public getUser(id: ObjectId, exceptionOnNull = true, customExceptionMessage?: string) {
    return this.usersService.getUser(id, exceptionOnNull, customExceptionMessage);
  }
}