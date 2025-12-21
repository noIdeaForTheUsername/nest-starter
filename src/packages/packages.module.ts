import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
  imports: [UsersModule]
})
export class PackagesModule {}
