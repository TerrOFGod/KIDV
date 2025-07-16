"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUserInfo = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var AccountUserInfo;
(function (AccountUserInfo) {
    AccountUserInfo.topic = 'account.user-info.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    AccountUserInfo.Request = Request;
    class Response {
    }
    AccountUserInfo.Response = Response;
})(AccountUserInfo || (exports.AccountUserInfo = AccountUserInfo = {}));
//# sourceMappingURL=account.user-info.js.map