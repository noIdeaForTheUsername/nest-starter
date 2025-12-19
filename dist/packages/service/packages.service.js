"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
let PackagesService = class PackagesService {
    packages = [];
    addPackage(senderId, receiverId, content, sentDate, deliveredDate) {
        let maxId = 0;
        this.packages.forEach((p) => {
            if (p.id > maxId)
                maxId = p.id;
        });
        const newPackage = {
            id: maxId + 1,
            senderId,
            receiverId,
            content,
            sentDate,
            deliveredDate
        };
        this.packages.push(newPackage);
        return newPackage;
    }
    getPackageIndexById(id) {
        const foundIndex = this.packages.findIndex((p) => p.id == id);
        if (foundIndex !== -1)
            return foundIndex;
        else
            throw new common_1.NotFoundException("Package with the given ID not found");
    }
    removePackage(id) {
        this.packages.splice(this.getPackageIndexById(id), 1);
    }
    getPackages() {
        return this.packages;
    }
    getPackage(id) {
        return this.packages[this.getPackageIndexById(id)];
    }
};
exports.PackagesService = PackagesService;
exports.PackagesService = PackagesService = __decorate([
    (0, common_1.Injectable)()
], PackagesService);
//# sourceMappingURL=packages.service.js.map