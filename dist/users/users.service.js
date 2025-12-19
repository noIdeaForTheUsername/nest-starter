"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [];
    getUserIndexById(id, notFoundException = true, customExceptionMessage) {
        const foundIndex = this.users.findIndex((u) => u.id === id);
        if (foundIndex === -1 && notFoundException)
            throw new common_1.NotFoundException(customExceptionMessage || "User not found");
        return foundIndex;
    }
    findMaxId() {
        let max = 0;
        this.users.forEach((u) => {
            if (u.id > max)
                max = u.id;
        });
        return max;
    }
    getUser(id, customExceptionMessage) {
        return this.users[this.getUserIndexById(id, true, customExceptionMessage)];
    }
    getUsers() {
        return this.users;
    }
    async getUserByLogin(login) {
        return this.users.find((u) => u.login == login);
    }
    addUser(login, password) {
        if (this.users.find((u) => u.login == login))
            throw new common_1.ConflictException("User with this login already exists");
        const newUser = {
            id: this.findMaxId() + 1,
            login,
            password
        };
        this.users.push(newUser);
        return newUser;
    }
    async deleteUser(id) {
        this.users.splice(await this.getUserIndexById(id), 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)({})
], UsersService);
//# sourceMappingURL=users.service.js.map