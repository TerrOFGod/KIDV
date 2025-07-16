"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLogin = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var AccountLogin;
(function (AccountLogin) {
    AccountLogin.topic = 'account.login.command';
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
    AccountLogin.Request = Request;
    class Response {
    }
    AccountLogin.Response = Response;
})(AccountLogin || (exports.AccountLogin = AccountLogin = {}));
//# sourceMappingURL=account.login.js.map