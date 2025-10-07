"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffUpdate = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const staff_create_dto_1 = require("./dtos/staff.create.dto");
var StaffUpdate;
(function (StaffUpdate) {
    StaffUpdate.topic = 'staff.update.command';
    class Request extends staff_create_dto_1.StaffCreateDto {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    StaffUpdate.Request = Request;
    class Response {
    }
    StaffUpdate.Response = Response;
})(StaffUpdate || (exports.StaffUpdate = StaffUpdate = {}));
//# sourceMappingURL=staff.update.js.map