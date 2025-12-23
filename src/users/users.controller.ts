import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Access } from "src/auth/decorators/access.decorator";
import { AccessLevel } from "./entity/access-level.enum";
import { AccessLevelDTO } from "./dto/access-level.dto";
import { User } from "src/auth/decorators/user.decorator";
import type { UserAuth } from "src/auth/user-auth.interface";
import { ParseObjectIdPipe } from "src/shared/parse-object-id.pipe";
import { ObjectId } from "mongodb";
import { UserResponseDTO } from "./dto/user-response.dto";
import { User as UserEntity } from "./entity/user.entity";


@Controller("users")
export class UsersController {
  constructor (private usersService: UsersService) {}

  private userToDto(user: UserEntity | null): UserResponseDTO | null {
    if (!user) return null;
    return {
      id: user._id.toHexString(),
      login: user.login,
      accessLevel: user.accessLevel
    }
  }

  @Get()
  async getUsers() {
    return (await this.usersService.getUsers()).map(u => this.userToDto(u));
  }

  @Get(":id")
  async getUser(@Param("id", ParseObjectIdPipe) id: ObjectId) {
    return this.userToDto(await this.usersService.getUser(id));
  }

  @Patch(":id/access-level")
  @Access(AccessLevel.Admin)
  async changeAccessLevel(@User() caller: UserAuth,
    @Param("id", ParseObjectIdPipe) id: ObjectId, @Body() dto: AccessLevelDTO) {
    await this.usersService.changeAccessLevel(id, caller, dto.accessLevel);
  }
}