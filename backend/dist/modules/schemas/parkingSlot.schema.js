"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// modules/schemas/parkingSlot.schema.ts
var mongoose_1 = require("mongoose");
var ParkingSlotSchema = new mongoose_1.Schema({
    slotId: { type: String, required: true },
    isOccupied: { type: Boolean, required: true },
    lastUpdated: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('ParkingSlot', ParkingSlotSchema, 'parkingSlots');
//# sourceMappingURL=parkingSlot.schema.js.map