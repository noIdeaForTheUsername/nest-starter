import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagesModule } from './packages/packages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PackagesModule,
    UsersModule,
    AuthModule
    //MongooseModule.forRoot("mongodb://localhost/nest")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
