"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffCreate = void 0;
const staff_create_dto_1 = require("./dtos/staff.create.dto");
var StaffCreate;
(function (StaffCreate) {
    StaffCreate.topic = 'staff.create.command';
    class Request extends staff_create_dto_1.StaffCreateDto {
    }
    StaffCreate.Request = Request;
    class Response {
    }
    StaffCreate.Response = Response;
})(StaffCreate || (exports.StaffCreate = StaffCreate = {}));
//# sourceMappingURL=staff.create.js.map