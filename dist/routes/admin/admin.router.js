"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller");
var router = express_1.Router();
router.post('/create', controller_1.adminController.createAdmin);
exports.adminRouter = router;
//# sourceMappingURL=admin.router.js.map