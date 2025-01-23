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
var user_schema_1 = __importDefault(require("../schemas/user.schema"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.createNewOrUpdate = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var dataModel, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!!user._id) return [3 /*break*/, 3];
                        dataModel = new user_schema_1.default(user);
                        return [4 /*yield*/, dataModel.save()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, user_schema_1.default.findByIdAndUpdate(user._id, { $set: user }, { new: true })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Wystąpił błąd podczas tworzenia danych:', error_1);
                        throw new Error('Wystąpił błąd podczas tworzenia danych');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getByEmailOrName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_schema_1.default.findOne({ $or: [{ email: name }, { name: name }] })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Wystąpił błąd podczas pobierania danych:', error_2);
                        throw new Error('Wystąpił błąd podczas pobierania danych');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Method to get the most recent users
    UserService.prototype.getAllNewest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_schema_1.default.find().sort({ createdAt: -1 }).limit(10)];
                    case 1: return [2 /*return*/, _a.sent()]; // Adjust based on your schema
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error while fetching latest users:', error_3);
                        throw new Error('Error while fetching latest users');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Method to delete a user by userId
    UserService.prototype.deleteData = function (_a) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_schema_1.default.findOneAndDelete({ userId: userId })];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            throw new Error('User not found');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error('Error while deleting user:', error_4);
                        throw new Error('Error while deleting user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.service.js.map