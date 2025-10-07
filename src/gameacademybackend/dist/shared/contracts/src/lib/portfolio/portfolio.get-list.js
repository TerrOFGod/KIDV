"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGetList = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var PortfolioGetList;
(function (PortfolioGetList) {
    PortfolioGetList.topic = 'portfolio.get-list.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "category", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)(),
        tslib_1.__metadata("design:type", Boolean)
    ], Request.prototype, "hallOfFrame", void 0);
    PortfolioGetList.Request = Request;
    class Response {
    }
    PortfolioGetList.Response = Response;
})(PortfolioGetList || (exports.PortfolioGetList = PortfolioGetList = {}));
//# sourceMappingURL=portfolio.get-list.js.map