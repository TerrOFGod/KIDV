"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsGetBySlug = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var NewsGetBySlug;
(function (NewsGetBySlug) {
    NewsGetBySlug.topic = 'news.get-by-slug.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "slug", void 0);
    NewsGetBySlug.Request = Request;
    class Response {
    }
    NewsGetBySlug.Response = Response;
})(NewsGetBySlug || (exports.NewsGetBySlug = NewsGetBySlug = {}));
//# sourceMappingURL=news.get-by-slug.js.map