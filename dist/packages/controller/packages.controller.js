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
exports.PackagesController = void 0;
const common_1 = require("@nestjs/common");
const packages_service_1 = require("../service/packages.service");
const new_dto_1 = require("../dto/new.dto");
const users_service_1 = require("../../users/users.service");
let PackagesController = class PackagesController {
    packageService;
    usersService;
    constructor(packageService, usersService) {
        this.packageService = packageService;
        this.usersService = usersService;
    }
    async getPackages() {
        return this.packageService.getPackages();
    }
    async getPackage(id) {
        return this.packageService.getPackage(id);
    }
    async addPackage(dto) {
        if (dto.senderId == dto.receiverId)
            throw new common_1.BadRequestException("Sender and receiver ID are the same");
        this.usersService.getUser(dto.senderId, "Sender not found");
        this.usersService.getUser(dto.receiverId, "Receiver user not found");
        this.packageService.addPackage(1, 2, dto.content, new Date().toISOString());
    }
    async removePackage(id) {
        this.packageService.removePackage(id);
    }
};
exports.PackagesController = PackagesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getPackages", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getPackage", null);
__decorate([
    (0, common_1.Post)("new"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_dto_1.NewPackageDTO]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "addPackage", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "removePackage", null);
exports.PackagesController = PackagesController = __decorate([
    (0, common_1.Controller)('packages'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService,
        users_service_1.UsersService])
], PackagesController);
//# sourceMappingURL=packages.controller.js.map