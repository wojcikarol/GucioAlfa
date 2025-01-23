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
var checkSlotIdParam_middleware_1 = require("../middlewares/checkSlotIdParam.middleware");
var parkingSlot_service_1 = __importDefault(require("../modules/services/parkingSlot.service"));
var ParkingSlotController = /** @class */ (function () {
    function ParkingSlotController() {
        var _this = this;
        this.path = '/api/data';
        this.router = (0, express_1.Router)();
        this.parkingSlotService = new parkingSlot_service_1.default();
        // Pobieranie pojedynczego miejsca parkingowego na podstawie slotId
        this.getParkingSlot = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        console.log('Zapytanie o slotId:', id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.parkingSlotService.get(id)];
                    case 2:
                        data = _a.sent();
                        console.log('Dane pobrane z bazy:', data);
                        if (data) {
                            response.status(200).json(data);
                        }
                        else {
                            response.status(404).json({ message: "Miejsce parkingowe o ID ".concat(id, " nie zosta\u0142o znalezione.") });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("B\u0142\u0105d podczas pobierania danych o miejscu parkingowym: ".concat(error_1.message));
                        response.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // Pobieranie wszystkich miejsc parkingowych
        this.getAllParkingSlots = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parkingSlotService.getAll()];
                    case 1:
                        data = _a.sent();
                        response.status(200).json(data); // Zwracamy wszystkie miejsca parkingowe
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Błąd podczas pobierania wszystkich miejsc parkingowych:', error_2);
                        response.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Tworzenie danych testowych
        this.createTestData = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var testData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parkingSlotService.createTestData()];
                    case 1:
                        testData = _a.sent();
                        response.status(201).json({ message: 'Dane testowe zostały dodane.', data: testData });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Błąd podczas tworzenia danych testowych:', error_3);
                        response.status(500).json({ error: 'Wystąpił błąd podczas tworzenia danych testowych.' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    ParkingSlotController.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path, "/:id"), checkSlotIdParam_middleware_1.checkSlotIdParam, this.getParkingSlot);
        this.router.get("".concat(this.path), this.getAllParkingSlots); // Nowy endpoint do pobrania wszystkich miejsc
        this.router.post("".concat(this.path, "/test-data"), this.createTestData); // Endpoint do generowania danych testowych
    };
    return ParkingSlotController;
}());
exports.default = ParkingSlotController;
//# sourceMappingURL=data.controller.js.map