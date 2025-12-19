import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller()
export class AuthController {
  
  constructor(private authSerice: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO) {
    if (body.password !== body.passwordRepeat)
      throw new BadRequestException("Given passwords do not match");
    return await this.authSerice.register(body.login, body.password);
  }


  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    return await this.authSerice.login(body.login, body.password);
  }

  @Get("password")
  @UseGuards(AuthGuard)
  async getPassword(@Request() req: any) {
    return req.user;
  }
}