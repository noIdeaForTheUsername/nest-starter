"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entity/user.entity");
const access_level_enum_1 = require("./entity/access-level.enum");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    users;
    constructor(users) {
        this.users = users;
    }
    async getUser(id, exceptionOnNull = true, customExceptionMessage) {
        const u = await this.users.findOneBy({ _id: id });
        if (!u && exceptionOnNull)
            throw new common_1.NotFoundException(customExceptionMessage || "User not found");
        return u;
    }
    async getUsers() {
        return (await this.users.find());
    }
    async getUserByLogin(login, exceptionOnNull = true) {
        const u = await this.users.findOneBy({ login });
        if (!u && exceptionOnNull)
            throw new common_1.NotFoundException("User not found");
        return u;
    }
    async addUser(login, passwordHash) {
        if (await this.getUserByLogin(login, false))
            throw new common_1.ConflictException("User with this login already exists");
        const adminInit = true;
        const newUser = this.users.create({
            login,
            passwordHash,
            accessLevel: login == "admin" ? access_level_enum_1.AccessLevel.Admin : access_level_enum_1.AccessLevel.User
        });
        await this.users.save(newUser);
        return newUser;
    }
    async deleteUser(id) {
        await this.users.delete({ _id: id });
    }
    async changeAccessLevel(userId, callerUser, newAccessLevel) {
        if (userId.equals(callerUser.id) && callerUser.accessLevel == access_level_enum_1.AccessLevel.Admin)
            throw new common_1.BadRequestException("You cannot revoke the administrator privileges from yourself");
        const result = await this.users.updateOne({ _id: userId }, { $set: { accessLevel: newAccessLevel } });
        if (result.matchedCount === 0)
            throw new common_1.NotFoundException('User not found');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map