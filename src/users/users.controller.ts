import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller("")
export class UsersController {
  constructor (private usersService: UsersService) {}

  @Get("user-list")
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO) {
    if (body.password !== body.passwordRepeat)
      throw new BadRequestException("Given passwords do not match");
    this.usersService.register(body.login, body.password);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    this.usersService.login(body.login, body.password);
  }
}