import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("")
export class UsersController {
  constructor (private usersService: UsersService) {}

  @Get("user-list")
  async getUsers() {
    return this.usersService.getUsers();
  }
}