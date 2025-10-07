"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsGetById = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var NewsGetById;
(function (NewsGetById) {
    NewsGetById.topic = 'news.get-by-id.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    NewsGetById.Request = Request;
    class Response {
    }
    NewsGetById.Response = Response;
})(NewsGetById || (exports.NewsGetById = NewsGetById = {}));
//# sourceMappingURL=news.get-by-id.js.map