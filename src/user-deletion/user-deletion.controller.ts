import { Controller, Delete, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Access } from "src/auth/decorators/access.decorator";
import { User } from "src/auth/decorators/user.decorator";
import type { UserAuth } from "src/auth/user-auth.interface";
import { ParseObjectIdPipe } from "src/shared/parse-object-id.pipe";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { UserDeletionService } from "./user-deletion.service";

@Controller()
export class UserDeletionController {

  constructor(private userDeletionService: UserDeletionService) {}

  @Delete("me")
  @Access(AccessLevel.User)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOwnUser(@User() caller: UserAuth) {
    await this.userDeletionService.deleteUser(caller.id, caller);
  }

  @Delete("users/:id")
  @Access(AccessLevel.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnyUser(@User() caller: UserAuth, @Param("id", ParseObjectIdPipe) id: ObjectId) {
    await this.userDeletionService.deleteUser(id, caller);
  }
}