"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageStatus = void 0;
var PackageStatus;
(function (PackageStatus) {
    PackageStatus[PackageStatus["CREATED"] = 1] = "CREATED";
    PackageStatus[PackageStatus["PAID"] = 2] = "PAID";
    PackageStatus[PackageStatus["SENT"] = 3] = "SENT";
    PackageStatus[PackageStatus["OUT_FOR_DELIVERY"] = 4] = "OUT_FOR_DELIVERY";
    PackageStatus[PackageStatus["READY_FOR_PICKUP"] = 5] = "READY_FOR_PICKUP";
    PackageStatus[PackageStatus["DELIVERED"] = 100] = "DELIVERED";
    PackageStatus[PackageStatus["CANCELED"] = 200] = "CANCELED";
    PackageStatus[PackageStatus["NOT_PICKED_UP"] = 201] = "NOT_PICKED_UP";
    PackageStatus[PackageStatus["DELIVERY_FAILED"] = 202] = "DELIVERY_FAILED";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
//# sourceMappingURL=package-status.enum.js.map