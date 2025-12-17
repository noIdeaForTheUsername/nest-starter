import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PackagesService } from '../service/packages.service';
import { NewPackageDTO } from '../dto/new.dto';

@Controller('packages')
export class PackagesController {

  constructor(private packageService: PackagesService) {}

  @Get()
  async getPackages() {
    return this.packageService.getPackages();
  }

  @Post("new")
  @HttpCode(HttpStatus.CREATED)
  async addPackage(@Body() dto: any) {
    console.log("Body: ", dto);
    this.packageService.addPackage(1, 2, dto.content, new Date().toISOString());
  }

  @Delete("delete/:id")
  async removePackage(@Param("id", ParseIntPipe) id: number) {
    this.packageService.removePackage(id);
  }
}
