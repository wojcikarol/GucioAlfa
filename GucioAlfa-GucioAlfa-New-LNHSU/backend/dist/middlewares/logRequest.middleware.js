"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logRequest = function (request, response, next) {
    console.log("[".concat(request.method, " ").concat(request.url, " ").concat(new Date().toISOString(), "]"));
    next();
};
exports.default = logRequest;
//# sourceMappingURL=logRequest.middleware.js.map