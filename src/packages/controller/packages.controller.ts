import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PackagesService } from '../service/packages.service';
import { NewPackageDTO } from '../dto/new.dto';
import { UsersService } from 'src/users/users.service';

@Controller('packages')
export class PackagesController {

  constructor(private packageService: PackagesService,
    private usersService: UsersService
  ) {}

  @Get()
  async getPackages() {
    return this.packageService.getPackages();
  }

  @Get(":id")
  async getPackage(@Param("id", ParseIntPipe) id: number) {
    return this.packageService.getPackage(id);
  }

  @Post("new")
  @HttpCode(HttpStatus.CREATED)
  async addPackage(@Body() dto: NewPackageDTO) {
    // assert users exit
    if (dto.senderId == dto.receiverId) throw new BadRequestException("Sender and receiver ID are the same");
    this.usersService.getUser(dto.senderId, "Sender not found");
    this.usersService.getUser(dto.receiverId, "Receiver user not found");
    this.packageService.addPackage(1, 2, dto.content, new Date().toISOString());
  }

  @Delete("delete/:id")
  async removePackage(@Param("id", ParseIntPipe) id: number) {
    this.packageService.removePackage(id);
  }
}
