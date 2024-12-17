"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
    active: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: true }
});
exports.default = (0, mongoose_1.model)('User', UserSchema, 'users');
//# sourceMappingURL=user.schema.js.map