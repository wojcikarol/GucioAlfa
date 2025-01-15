"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: process.env.PORT || 3100,
    supportedParkingSlotsNum: 17,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://kokos:okon123@cluster0.qpa0r.mongodb.net/myParkingDB?authMechanism=SCRAM-SHA-1&authSource=Cluster0',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};
//# sourceMappingURL=config.js.map