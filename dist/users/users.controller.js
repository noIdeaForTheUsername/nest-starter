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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const access_decorator_1 = require("../auth/decorators/access.decorator");
const access_level_enum_1 = require("./entity/access-level.enum");
const access_level_dto_1 = require("./dto/access-level.dto");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const parse_object_id_pipe_1 = require("../shared/parse-object-id.pipe");
const mongodb_1 = require("mongodb");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    userToDto(user) {
        if (!user)
            return null;
        return {
            id: user._id.toHexString(),
            login: user.login,
            accessLevel: user.accessLevel
        };
    }
    async getUsers() {
        return (await this.usersService.getUsers()).map(u => this.userToDto(u));
    }
    async getUser(id) {
        return this.userToDto(await this.usersService.getUser(id));
    }
    async changeAccessLevel(caller, id, dto) {
        await this.usersService.changeAccessLevel(id, caller, dto.accessLevel);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)(":id/access-level"),
    (0, access_decorator_1.Access)(access_level_enum_1.AccessLevel.Admin),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)("id", parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId, access_level_dto_1.AccessLevelDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeAccessLevel", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map