"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsCreate = void 0;
const news_create_dto_1 = require("./dtos/news.create.dto");
var NewsCreate;
(function (NewsCreate) {
    NewsCreate.topic = 'news.create.command';
    class Request extends news_create_dto_1.NewsCreateDto {
    }
    NewsCreate.Request = Request;
    class Response {
    }
    NewsCreate.Response = Response;
})(NewsCreate || (exports.NewsCreate = NewsCreate = {}));
//# sourceMappingURL=news.create.js.map