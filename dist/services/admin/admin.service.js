"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
var dataBase_1 = require("../../dataBase");
var AdminService = /** @class */ (function () {
    function AdminService() {
    }
    AdminService.prototype.createAdmin = function (admin) {
        var adminToCreate = new dataBase_1.AdminModel(admin);
        return adminToCreate.save();
    };
    return AdminService;
}());
exports.adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map