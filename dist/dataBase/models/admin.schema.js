"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.AdminSchema = void 0;
var mongoose_1 = require("mongoose");
exports.AdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        required: true
    }
});
exports.AdminModel = mongoose_1.model("admin", exports.AdminSchema);
//# sourceMappingURL=admin.schema.js.map