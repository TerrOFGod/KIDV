"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffDelete = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var StaffDelete;
(function (StaffDelete) {
    StaffDelete.topic = 'staff.delete.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    StaffDelete.Request = Request;
    class Response {
    }
    StaffDelete.Response = Response;
})(StaffDelete || (exports.StaffDelete = StaffDelete = {}));
//# sourceMappingURL=staff.delete.js.map