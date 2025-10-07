"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoryUpdate = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const success_story_create_dto_1 = require("./dtos/success-story.create.dto");
var SuccessStoryUpdate;
(function (SuccessStoryUpdate) {
    SuccessStoryUpdate.topic = 'success-story.update.command';
    class Request extends success_story_create_dto_1.SuccessStoryCreateDto {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    SuccessStoryUpdate.Request = Request;
    class Response {
    }
    SuccessStoryUpdate.Response = Response;
})(SuccessStoryUpdate || (exports.SuccessStoryUpdate = SuccessStoryUpdate = {}));
//# sourceMappingURL=success-story.update.js.map