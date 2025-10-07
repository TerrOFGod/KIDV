"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioUpdate = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const portfolio_create_dto_1 = require("./dtos/portfolio.create.dto");
var PortfolioUpdate;
(function (PortfolioUpdate) {
    PortfolioUpdate.topic = 'portfolio.update.command';
    class Request extends portfolio_create_dto_1.PortfolioCreateDto {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    PortfolioUpdate.Request = Request;
    class Response {
    }
    PortfolioUpdate.Response = Response;
})(PortfolioUpdate || (exports.PortfolioUpdate = PortfolioUpdate = {}));
//# sourceMappingURL=portfolio.update.js.map