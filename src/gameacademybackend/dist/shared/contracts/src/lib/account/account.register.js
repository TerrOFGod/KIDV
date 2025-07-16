"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRegister = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var AccountRegister;
(function (AccountRegister) {
    AccountRegister.topic = 'account.register.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsEmail)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "password", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "displayName", void 0);
    AccountRegister.Request = Request;
    class Response {
    }
    AccountRegister.Response = Response;
})(AccountRegister || (exports.AccountRegister = AccountRegister = {}));
//# sourceMappingURL=account.register.js.map