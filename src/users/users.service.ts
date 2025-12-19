import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "./entity/user.interface";

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

  public deleteUser(id: number) {
    this.users.splice(this.getUserIndexById(id), 1);
  }

  public register(login: string, password: string) {
    if (this.users.find((u) => u.login == login))
      throw new ConflictException("User with this login already exists");
    this.users.push({
      id: this.findMaxId() + 1,
      login,
      password
    });
  }

  public login(login: string, password: string) {
    const user = this.users.find((u) => u.login === login);
    if (user && user.password == password) return;
    throw new UnauthorizedException("Login or password not correct");
  }
}