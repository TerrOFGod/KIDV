"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountChangePasswordProfile = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ChangePasswordDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Старый пароль должен содержать минимум 6 символов' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Новый пароль должен содержать минимум 6 символов' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
var AccountChangePasswordProfile;
(function (AccountChangePasswordProfile) {
    AccountChangePasswordProfile.topic = 'account.change-password-profile.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_transformer_1.Type)(() => ChangePasswordDto),
        (0, class_validator_1.ValidateNested)(),
        tslib_1.__metadata("design:type", ChangePasswordDto)
    ], Request.prototype, "passwords", void 0);
    AccountChangePasswordProfile.Request = Request;
    class Response {
    }
    AccountChangePasswordProfile.Response = Response;
})(AccountChangePasswordProfile || (exports.AccountChangePasswordProfile = AccountChangePasswordProfile = {}));
//# sourceMappingURL=account.change-password-profile.js.map