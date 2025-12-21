import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { UsersModule } from 'src/users/users.module';
import { CourierPackagesController } from './courier-packages.controller';

@Module({
  controllers: [PackagesController, CourierPackagesController],
  providers: [PackagesService],
  imports: [UsersModule]
})
export class PackagesModule {}
