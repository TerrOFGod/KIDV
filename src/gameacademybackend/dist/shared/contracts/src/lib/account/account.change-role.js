"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountChangeRole = void 0;
const tslib_1 = require("tslib");
const interfaces_1 = require("@shared/interfaces");
const class_validator_1 = require("class-validator");
var AccountChangeRole;
(function (AccountChangeRole) {
    AccountChangeRole.topic = 'account.change-role.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsEnum)(interfaces_1.UserRole),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "newRole", void 0);
    AccountChangeRole.Request = Request;
    class Response {
    }
    AccountChangeRole.Response = Response;
})(AccountChangeRole || (exports.AccountChangeRole = AccountChangeRole = {}));
//# sourceMappingURL=account.change-role.js.map