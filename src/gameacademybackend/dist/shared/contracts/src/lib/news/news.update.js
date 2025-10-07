"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsUpdate = void 0;
const news_update_dto_1 = require("./dtos/news.update.dto");
var NewsUpdate;
(function (NewsUpdate) {
    NewsUpdate.topic = 'news.update.command';
    class Request extends news_update_dto_1.NewsUpdateDto {
    }
    NewsUpdate.Request = Request;
    class Response {
    }
    NewsUpdate.Response = Response;
})(NewsUpdate || (exports.NewsUpdate = NewsUpdate = {}));
//# sourceMappingURL=news.update.js.map