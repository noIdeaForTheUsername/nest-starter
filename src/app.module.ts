import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagesModule } from './packages/packages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessLevelGuard } from './auth/access.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { Package } from './packages/entity/package.entity';
import { UserDeletionModule } from './user-deletion/user-deletion.module';


@Module({
  imports: [
    PackagesModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      username: "",
      password: "",
      database: "delivery-db",
      entities: [User, Package],
      synchronize: true,  // TODO: REMOVE
    }),
    UserDeletionModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessLevelGuard
    }
  ],
})
export class AppModule {}
