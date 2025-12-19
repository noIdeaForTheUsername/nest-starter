"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageStatus = void 0;
var PackageStatus;
(function (PackageStatus) {
    PackageStatus[PackageStatus["CREATED"] = 0] = "CREATED";
    PackageStatus[PackageStatus["PAID"] = 1] = "PAID";
    PackageStatus[PackageStatus["SENT"] = 2] = "SENT";
    PackageStatus[PackageStatus["READY"] = 3] = "READY";
    PackageStatus[PackageStatus["RECEIVED"] = 4] = "RECEIVED";
    PackageStatus[PackageStatus["NOT_RECEIVED"] = 5] = "NOT_RECEIVED";
    PackageStatus[PackageStatus["DESTROYED"] = 6] = "DESTROYED";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
//# sourceMappingURL=package-status.enum.js.map