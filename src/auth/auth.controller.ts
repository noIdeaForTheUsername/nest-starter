import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import type { Response } from "express";

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
  @UseGuards(AuthGuard)
  async getPassword(@Request() req: any) {
    return req.user;
  }
}