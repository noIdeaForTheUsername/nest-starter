import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, UnauthorizedException } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { NewPackageDTO } from './dto/new.dto';
import { UsersService } from 'src/users/users.service';
import { Access } from 'src/auth/decorators/access.decorator';
import { AccessLevel } from 'src/users/entity/access-level.enum';
import type { UserAuth } from 'src/auth/user-auth.interface';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('packages')
@Access(AccessLevel.User)
export class PackagesController {

  constructor(private packageService: PackagesService, private usersService: UsersService) {}

  @Get()
  async getPackages(@User() user: UserAuth) {
    return this.packageService.getUserPackages(user.id);
  }

  // @Get("all")
  // @Access(AccessLevel.Courier)
  // async getAllPackages() {
  //   return this.packageService.getPackages();
  // }

  @Get(":id")
  async getPackage(@User() user: UserAuth, @Param("id", ParseIntPipe) id: number) {
    return this.packageService.getPackage(id, user.id, user.accessLevel);
  }

  @Post("new")
  @HttpCode(HttpStatus.CREATED)
  async addPackage(@User() sender: UserAuth, @Body() dto: NewPackageDTO) {
    // assert users exit
    if (sender.id === dto.receiverId) throw new BadRequestException("Receiver ID cannot be your ID");
    this.usersService.getUser(dto.receiverId, "Receiver user not found");
    this.packageService.addPackage(sender.id, dto.receiverId, dto.content, new Date().toISOString());
  }

  // @Delete(":id")
  // async removePackage(@User() sender: UserAuth, @Param("id", ParseIntPipe) id: number) {
  //   if (this.packageService.getPackage(id, sender.id, sender.accessLevel).senderId !== sender.id)
  //     throw new NotFoundException("Package with the given ID not found, or you don't have access to it");
  //   this.packageService.removePackage(id);
  // }
}
