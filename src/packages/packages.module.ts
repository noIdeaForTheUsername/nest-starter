import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { UsersModule } from 'src/users/users.module';
import { CourierPackagesController } from './courier-packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entity/package.entity';

@Module({
  controllers: [PackagesController, CourierPackagesController],
  providers: [PackagesService],
  imports: [UsersModule, TypeOrmModule.forFeature([Package])],
  exports: [PackagesService]
})
export class PackagesModule {}
