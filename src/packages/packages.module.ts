import { Module } from '@nestjs/common';
import { PackagesController } from './controller/packages.controller';
import { PackagesService } from './service/packages.service';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService]
})
export class PackagesModule {}
