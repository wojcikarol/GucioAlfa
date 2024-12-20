"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSlotIdParam = void 0;
var checkSlotIdParam = function (request, response, next) {
    var id = request.params.id;
    // Wyrażenie regularne sprawdza, czy ID jest w formacie "P" + 3 cyfry (np. "P001")
    var slotIdPattern = /^P\d{3}$/;
    if (!slotIdPattern.test(id)) {
        return response.status(400).send('Brak lub niepoprawny parametr ID miejsca parkingowego!');
    }
    next();
};
exports.checkSlotIdParam = checkSlotIdParam;
//# sourceMappingURL=checkSlotIdParam.middleware.js.map