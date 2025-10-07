"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoryCreate = void 0;
const success_story_create_dto_1 = require("./dtos/success-story.create.dto");
var SuccessStoryCreate;
(function (SuccessStoryCreate) {
    SuccessStoryCreate.topic = 'success-story.create.command';
    class Request extends success_story_create_dto_1.SuccessStoryCreateDto {
    }
    SuccessStoryCreate.Request = Request;
    class Response {
    }
    SuccessStoryCreate.Response = Response;
})(SuccessStoryCreate || (exports.SuccessStoryCreate = SuccessStoryCreate = {}));
//# sourceMappingURL=success-story.create.js.map