"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioDelete = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var PortfolioDelete;
(function (PortfolioDelete) {
    PortfolioDelete.topic = 'portfolio.delete.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    PortfolioDelete.Request = Request;
    class Response {
    }
    PortfolioDelete.Response = Response;
})(PortfolioDelete || (exports.PortfolioDelete = PortfolioDelete = {}));
//# sourceMappingURL=portfolio.delete.js.map