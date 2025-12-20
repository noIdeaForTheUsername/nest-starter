import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { Access } from "./access.decorator";
import { AccessLevel } from "src/users/entity/access-level.enum";

@Controller()
export class AuthController {
  
  constructor(private authSerice: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO, @Res({ passthrough: true }) res: Response) {
    if (body.password !== body.passwordRepeat)
      throw new BadRequestException("Given passwords do not match");
    const {accessToken} = await this.authSerice.register(body.login, body.password);
    res.cookie("authJwt", accessToken);
  }


  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO, @Res({ passthrough: true }) res: Response) {
    const {accessToken} = await this.authSerice.login(body.login, body.password);
    res.cookie("authJwt", accessToken);
  }

  @Get("password")
  @Access(AccessLevel.User)
  async getPassword(@Request() req: any) {
    return req.user;
  }
}