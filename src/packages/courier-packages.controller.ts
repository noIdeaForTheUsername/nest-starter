import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Access } from "src/auth/decorators/access.decorator";
import { AccessLevel } from "src/users/entity/access-level.enum";
import { PackagesService } from "./packages.service";
import { PackageStatus } from "./entity/package-status.enum";
import { User } from "src/auth/decorators/user.decorator";
import type { UserAuth } from "src/auth/user-auth.interface";
import { SetStatusDTO } from "./dto/set-status.dto";

@Access(AccessLevel.Courier)
@Controller("courier/packages")
export class CourierPackagesController {
  constructor(private packagesService: PackagesService) {}

  @Get()
  getUndeliveredPackages() {
    // Couriers only care about the packages that are to be delivered now
    return this.packagesService.getAllPackages().filter((p) => 
      p.status >= PackageStatus.PAID && p.status < PackageStatus.DELIVERED
    );
  }

  @Get(":id")
  getPackage(@User() user: UserAuth, @Param("id", ParseIntPipe) id: number) {
    return this.packagesService.getPackage(id, user.id, user.accessLevel);
  }

  // This endpoint doesn't have any integration with an actual payment system, so
  // it can be called by each courier. If a payment system existed this wouldn't be like that.
  @Post(":id/confirm-payment")
  @HttpCode(HttpStatus.OK)
  confirmPayment(@Param("id", ParseIntPipe) id: number) {
    this.packagesService.changePackageStatus(id, PackageStatus.PAID, AccessLevel.Courier);
  }

  @Patch(":id/set-status")
  @HttpCode(HttpStatus.OK)
  setPackageStatus(@User() user: UserAuth, @Param("id", ParseIntPipe) id: number, @Body() dto: SetStatusDTO) {
    if (user.accessLevel == AccessLevel.User)
      throw new ForbiddenException();  // this isn't supposed to ever occur (courier+ controller)
    if (user.accessLevel == AccessLevel.Courier && dto.newStatus == PackageStatus.PAID)
      throw new ForbiddenException("Use /courier/packages/:id/confirm-payment instead to set PAID status");
    this.packagesService.changePackageStatus(id, dto.newStatus, user.accessLevel);
  }
}