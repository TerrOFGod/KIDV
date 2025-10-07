"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoryDelete = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var SuccessStoryDelete;
(function (SuccessStoryDelete) {
    SuccessStoryDelete.topic = 'success-story.delete.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    SuccessStoryDelete.Request = Request;
    class Response {
    }
    SuccessStoryDelete.Response = Response;
})(SuccessStoryDelete || (exports.SuccessStoryDelete = SuccessStoryDelete = {}));
//# sourceMappingURL=success-story.delete.js.map