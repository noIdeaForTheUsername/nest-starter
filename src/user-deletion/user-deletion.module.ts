import { Module } from '@nestjs/common';
import { PackagesModule } from 'src/packages/packages.module';
import { UsersModule } from 'src/users/users.module';
import { UserDeletionService } from './user-deletion.service';
import { UserDeletionController } from './user-deletion.controller';

@Module({
  imports: [UsersModule, PackagesModule],
  providers: [UserDeletionService],
  controllers: [UserDeletionController]
})
export class UserDeletionModule {}

// THIS MODULE IS NEEDED BECAUSE USER DELETION REQUIRES ACTIONS
// ON BOTH "USERS" AND "PACKAGES" SERVICES (CANCELING PACKAGES)