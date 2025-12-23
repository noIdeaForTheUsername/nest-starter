import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { AccessLevel } from "./entity/access-level.enum";
import { UserAuth } from "src/auth/user-auth.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: MongoRepository<User>
  ) {}

  public async getUser(id: ObjectId, exceptionOnNull = true, customExceptionMessage?: string) {
    const u = await this.users.findOneBy({_id: id});
    if (!u && exceptionOnNull) throw new NotFoundException(customExceptionMessage || "User not found");
    return u;
  }

  public async getUsers() {
    return (await this.users.find());
  }

  public async getUserByLogin(login: string, exceptionOnNull = true) {
    const u = await this.users.findOneBy({login});
    if (!u && exceptionOnNull) throw new NotFoundException("User not found");
    return u;
  }

  public async addUser(login: string, passwordHash: string) {
    if (await this.getUserByLogin(login, false))
      throw new ConflictException("User with this login already exists");

    const adminInit = true;

    const newUser = this.users.create({
      login,
      passwordHash,
      accessLevel: login == "admin" ? AccessLevel.Admin : AccessLevel.User
    });
    await this.users.save(newUser);
    return newUser;
  }

  // NO VALIDATION IN THIS METHOD
  public async deleteUser(id: ObjectId) {
    await this.users.delete({_id: id});
  }

  // This should be well-protected in controllers
  public async changeAccessLevel(userId: ObjectId, callerUser: UserAuth, newAccessLevel: AccessLevel) {
    if (userId.equals(callerUser.id) && callerUser.accessLevel == AccessLevel.Admin)  // admin un-admining himself case
      throw new BadRequestException("You cannot revoke the administrator privileges from yourself");
    
    const result = await this.users.updateOne(
      {_id: userId},
      {$set: {accessLevel: newAccessLevel}}
    );
    if (result.matchedCount === 0)
      throw new NotFoundException('User not found');
  }
}