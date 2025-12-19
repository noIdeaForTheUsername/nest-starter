import { Module } from '@nestjs/common';
import { PackagesController } from './controller/packages.controller';
import { PackagesService } from './service/packages.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
  imports: [UsersModule]
})
export class PackagesModule {}
