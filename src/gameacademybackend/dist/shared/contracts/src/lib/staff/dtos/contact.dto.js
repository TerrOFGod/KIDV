"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ContactDto {
}
exports.ContactDto = ContactDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactDto.prototype, "value", void 0);
//# sourceMappingURL=contact.dto.js.map