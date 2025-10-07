"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoryGetList = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var SuccessStoryGetList;
(function (SuccessStoryGetList) {
    SuccessStoryGetList.topic = 'success-story.get-list.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata("design:type", Number)
    ], Request.prototype, "year", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "city", void 0);
    SuccessStoryGetList.Request = Request;
    class Response {
    }
    SuccessStoryGetList.Response = Response;
})(SuccessStoryGetList || (exports.SuccessStoryGetList = SuccessStoryGetList = {}));
//# sourceMappingURL=success-story.get-list.js.map