import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Res } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { Access } from "./decorators/access.decorator";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { User } from "./decorators/user.decorator";
import type { UserAuth } from "./user-auth.interface";

@Controller()
export class AuthController {
  
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO, @Res({ passthrough: true }) res: Response) {
    if (body.password !== body.passwordRepeat)
      throw new BadRequestException("Given passwords do not match");
    const {accessToken} = await this.authService.register(body.login, body.password);
    res.cookie("authJwt", accessToken);
  }


  @Post("login")
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(@Body() body: LoginDTO, @Res({ passthrough: true }) res: Response) {
    const {accessToken} = await this.authService.login(body.login, body.password);
    res.cookie("authJwt", accessToken);
  }

  @Get("me")
  @Access(AccessLevel.User)
  async getOwnUser(@User() userAuth: UserAuth) {
    const user = await this.authService.getUser(userAuth.id, false);
    if (!user)
      throw new NotFoundException("Apparently, you don't exist anymore...");
    return {
      id: user._id,
      login: user.login,
      accessLevel: user.accessLevel,
    }
  }
}