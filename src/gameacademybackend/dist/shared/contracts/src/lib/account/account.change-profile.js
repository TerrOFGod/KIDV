"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountChangeProfile = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ChangeProfileDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ChangeProfileDto.prototype, "displayName", void 0);
var AccountChangeProfile;
(function (AccountChangeProfile) {
    AccountChangeProfile.topic = 'account.change-profile.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => ChangeProfileDto),
        tslib_1.__metadata("design:type", ChangeProfileDto)
    ], Request.prototype, "user", void 0);
    AccountChangeProfile.Request = Request;
    class Response {
    }
    AccountChangeProfile.Response = Response;
})(AccountChangeProfile || (exports.AccountChangeProfile = AccountChangeProfile = {}));
//# sourceMappingURL=account.change-profile.js.map