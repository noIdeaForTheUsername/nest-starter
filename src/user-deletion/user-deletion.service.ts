import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserAuth } from "src/auth/user-auth.interface";
import { PackagesService } from "src/packages/packages.service";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { UsersService } from "src/users/users.service";
import { ObjectId } from "typeorm";


@Injectable()
export class UserDeletionService {

  constructor(private usersService: UsersService, private packagesService: PackagesService) {}

  async deleteUser(userId: ObjectId, caller: UserAuth) {
    // Privilege check
    if (caller.accessLevel == AccessLevel.Admin) {
      if (userId.equals(caller.id))
        throw new ForbiddenException("An administrator cannot delete their own user.");
    }
    else if (!caller.id.equals(userId))
      throw new ForbiddenException("A non-admin user cannot delete other user.");

    // Perform deletion
    await Promise.all([
      this.packagesService.cancelUndeliveredPackages(userId),
      this.usersService.deleteUser(userId),
    ]);
  }
}