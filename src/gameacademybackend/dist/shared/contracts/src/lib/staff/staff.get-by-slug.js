"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffGetBySlug = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var StaffGetBySlug;
(function (StaffGetBySlug) {
    StaffGetBySlug.topic = 'staff.get-by-slug.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "slug", void 0);
    StaffGetBySlug.Request = Request;
    class Response {
    }
    StaffGetBySlug.Response = Response;
})(StaffGetBySlug || (exports.StaffGetBySlug = StaffGetBySlug = {}));
//# sourceMappingURL=staff.get-by-slug.js.map