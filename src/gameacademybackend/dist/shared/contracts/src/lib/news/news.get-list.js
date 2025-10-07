"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsGetList = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var NewsGetList;
(function (NewsGetList) {
    NewsGetList.topic = 'news.get-list.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "category", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "search", void 0);
    NewsGetList.Request = Request;
    class Response {
    }
    NewsGetList.Response = Response;
})(NewsGetList || (exports.NewsGetList = NewsGetList = {}));
//# sourceMappingURL=news.get-list.js.map