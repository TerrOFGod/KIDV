"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioCreate = void 0;
const portfolio_create_dto_1 = require("./dtos/portfolio.create.dto");
var PortfolioCreate;
(function (PortfolioCreate) {
    PortfolioCreate.topic = 'portfolio.create.command';
    class Request extends portfolio_create_dto_1.PortfolioCreateDto {
    }
    PortfolioCreate.Request = Request;
    class Response {
    }
    PortfolioCreate.Response = Response;
})(PortfolioCreate || (exports.PortfolioCreate = PortfolioCreate = {}));
//# sourceMappingURL=portfolio.create.js.map