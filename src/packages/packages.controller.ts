import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { NewPackageDTO } from './dto/new.dto';
import { UsersService } from 'src/users/users.service';
import { Access } from 'src/auth/decorators/access.decorator';
import { AccessLevel } from 'src/users/entity/access-level.enum';
import type { UserAuth } from 'src/auth/user-auth.interface';
import { User } from 'src/auth/decorators/user.decorator';
import { ParseObjectIdPipe } from 'src/shared/parse-object-id.pipe';
import { ObjectId } from 'mongodb';

@Controller('packages')
@Access(AccessLevel.User)
export class PackagesController {

  constructor(private packageService: PackagesService, private usersService: UsersService) {}

  @Get()
  async getPackages(@User() user: UserAuth) {
    return await this.packageService.getUserPackages(user.id);
  }

  @Get(":id")
  async getPackage(@User() user: UserAuth, @Param("id", ParseObjectIdPipe) id: ObjectId) {
    return await this.packageService.getPackage(id, user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPackage(@User() sender: UserAuth, @Body() dto: NewPackageDTO) {
    // assert users exit
    const receiverId = new ObjectId(dto.receiverId);
    if (sender.id.equals(receiverId)) throw new BadRequestException("Receiver ID cannot be your ID");
    await this.usersService.getUser(receiverId, true, "Receiver user not found");

    await this.packageService.addPackage(sender.id, receiverId, dto.content);
  }

  @Post(":id/cancel")
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelPackage(@User() user: UserAuth, @Param("id", ParseObjectIdPipe) id: ObjectId) {
    await this.packageService.cancelUserPackage(id, user.id);
  }
}
