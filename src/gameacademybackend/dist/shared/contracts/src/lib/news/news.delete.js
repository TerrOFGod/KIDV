"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsDelete = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var NewsDelete;
(function (NewsDelete) {
    NewsDelete.topic = 'news.delete.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    NewsDelete.Request = Request;
    class Response {
    }
    NewsDelete.Response = Response;
})(NewsDelete || (exports.NewsDelete = NewsDelete = {}));
//# sourceMappingURL=news.delete.js.map