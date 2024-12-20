"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tokenTypeEnum = {
    authorization: 'authorization'
};
var tokenTypes = [tokenTypeEnum.authorization];
var TokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    createDate: { type: Number, required: true },
    type: { type: String, enum: tokenTypes, required: true },
    value: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Token', TokenSchema);
//# sourceMappingURL=token.schema.js.map