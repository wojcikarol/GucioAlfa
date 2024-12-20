"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var user_service_1 = __importDefault(require("../modules/services/user.service"));
var password_service_1 = __importDefault(require("../modules/services/password.service"));
var token_service_1 = __importDefault(require("../modules/services/token.service"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.path = '/api/user';
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.passwordService = new password_service_1.default();
        this.tokenService = new token_service_1.default();
        this.authenticate = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, login, password, user, _b, _c, _d, token, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = request.body, login = _a.login, password = _a.password;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userService.getByEmailOrName(login)];
                    case 2:
                        user = _e.sent();
                        if (!user) {
                            response.status(401).json({ error: 'Unauthorized' });
                        }
                        _c = (_b = this.passwordService).authorize;
                        _d = [user.id];
                        return [4 /*yield*/, this.passwordService.hashPassword(password)];
                    case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, this.tokenService.create(user)];
                    case 5:
                        token = _e.sent();
                        response.status(200).json(this.tokenService.getToken(token));
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _e.sent();
                        console.error("Validation Error: ".concat(error_1.message));
                        response.status(401).json({ error: 'Unauthorized' });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.createNewOrUpdate = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData, user, hashedPassword, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = request.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userService.createNewOrUpdate(userData)];
                    case 2:
                        user = _a.sent();
                        if (!userData.password) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.passwordService.hashPassword(userData.password)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.passwordService.createOrUpdate({
                                userId: user._id,
                                password: hashedPassword
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        response.status(200).json(user);
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.error("Validation Error: ".concat(error_2.message));
                        response.status(400).json({ error: 'Bad request', value: error_2.message });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.removeHashSession = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.params.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tokenService.remove(userId)];
                    case 2:
                        result = _a.sent();
                        console.log('aaa', result);
                        response.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Validation Error: ".concat(error_3.message));
                        response.status(401).json({ error: 'Unauthorized' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    UserController.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.path, "/create"), this.createNewOrUpdate);
        this.router.post("".concat(this.path, "/auth"), this.authenticate);
        this.router.delete("".concat(this.path, "/logout/:userId"), auth_middleware_1.auth, this.removeHashSession);
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map