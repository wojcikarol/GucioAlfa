"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var auth = function (request, response, next) {
    var token = request.headers['x-access-token'] || request.headers['authorization'];
    if (token && typeof token === 'string') {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        try {
            jsonwebtoken_1.default.verify(token, config_1.config.JwtSecret, function (err, decoded) {
                if (err) {
                    return response.status(400).send('Invalid token.');
                }
                var user = decoded;
                next();
                return;
            });
        }
        catch (ex) {
            return response.status(400).send('Invalid token.');
        }
    }
    else {
        return response.status(401).send('Access denied. No token provided.');
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map