import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "./entity/user.interface";
import { AccessLevel } from "./entity/access-level.enum";

@Injectable({

})
export class UsersService {
  private users: User[] = [];

  private getUserIndexById(id: number, notFoundException: boolean = true, customExceptionMessage?: string) {
    const foundIndex = this.users.findIndex((u) => u.id === id);
      if (foundIndex === -1 && notFoundException) throw new NotFoundException(customExceptionMessage || "User not found");
    return foundIndex;
  }

  private findMaxId() {
    let max = 0;
    this.users.forEach((u) => {
      if (u.id > max) max = u.id;
    });
    return max;
  }

  public getUser(id: number, customExceptionMessage?: string) {
    return this.users[this.getUserIndexById(id, true, customExceptionMessage)];
  }

  public getUsers() {
    return this.users;
  }

  public async getUserByLogin(login: string) {
    return this.users.find((u) => u.login == login);
  }

  public addUser(login: string, password: string) {
    if (this.users.find((u) => u.login == login))
      throw new ConflictException("User with this login already exists");

    const newUser = {
      id: this.findMaxId() + 1,
      login,
      password,
      accessLevel: AccessLevel.User
    };
    this.users.push(newUser);
    return newUser;
  }

  public async deleteUser(id: number) {
    this.users.splice(await this.getUserIndexById(id), 1);
  }
}