"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PasswordSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    password: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Password', PasswordSchema);
//# sourceMappingURL=password.schema.js.map