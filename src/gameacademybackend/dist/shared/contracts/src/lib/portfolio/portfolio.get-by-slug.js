"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGetBySlug = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var PortfolioGetBySlug;
(function (PortfolioGetBySlug) {
    PortfolioGetBySlug.topic = 'portfolio.get-by-slug.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "slug", void 0);
    PortfolioGetBySlug.Request = Request;
    class Response {
    }
    PortfolioGetBySlug.Response = Response;
})(PortfolioGetBySlug || (exports.PortfolioGetBySlug = PortfolioGetBySlug = {}));
//# sourceMappingURL=portfolio.get-by-slug.js.map