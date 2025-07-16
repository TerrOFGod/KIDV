"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDeleteUser = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var AccountDeleteUser;
(function (AccountDeleteUser) {
    AccountDeleteUser.topic = 'account.delete-user.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsEmail)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    AccountDeleteUser.Request = Request;
    class Response {
    }
    AccountDeleteUser.Response = Response;
})(AccountDeleteUser || (exports.AccountDeleteUser = AccountDeleteUser = {}));
//# sourceMappingURL=account.delete-user.js.map