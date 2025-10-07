"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffGetList = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var StaffGetList;
(function (StaffGetList) {
    StaffGetList.topic = 'staff.get-list.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "position", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "rarity", void 0);
    StaffGetList.Request = Request;
    class Response {
    }
    StaffGetList.Response = Response;
})(StaffGetList || (exports.StaffGetList = StaffGetList = {}));
//# sourceMappingURL=staff.get-list.js.map