import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Access } from "src/auth/decorators/access.decorator";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { PackagesService } from "./packages.service";
import { PackageStatus } from "./entity/package-status.enum";
import { User } from "src/auth/decorators/user.decorator";
import type { UserAuth } from "src/auth/user-auth.interface";
import { StatusDTO } from "./dto/status.dto";
import { ParseObjectIdPipe } from "src/shared/parse-object-id.pipe";
import { ObjectId } from "mongodb";

@Access(AccessLevel.Courier)
@Controller("courier/packages")
export class CourierPackagesController {
  constructor(private packagesService: PackagesService) {}

  @Get()
  async getUndeliveredPackages() {
    // Couriers only care about the packages that are to be delivered now
    return (await this.packagesService.getUndeliveredPackages());
  }

  @Get(":id")
  async getPackage(@User() user: UserAuth, @Param("id", ParseObjectIdPipe) id: ObjectId) {
    return await this.packagesService.getPackage(id, user);
  }

  // This endpoint doesn't have any integration with an actual payment system, so
  // it can be called by each courier. If a payment system existed this wouldn't be like that.
  @Post(":id/confirm-payment")
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmPayment(@Param("id", ParseObjectIdPipe) id: ObjectId) {
    await this.packagesService.changePackageStatus(id, PackageStatus.PAID, AccessLevel.Courier);
  }

  @Patch(":id/status")
  @HttpCode(HttpStatus.NO_CONTENT)
  async setPackageStatus(@User() user: UserAuth, @Param("id", ParseObjectIdPipe) id: ObjectId, @Body() dto: StatusDTO) {
    if (user.accessLevel == AccessLevel.Courier && dto.status == PackageStatus.PAID)
      throw new ForbiddenException("Use /courier/packages/:id/confirm-payment instead to set PAID status");
    await this.packagesService.changePackageStatus(id, dto.status, user.accessLevel);
  }
}