"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffStatDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class StaffStatDto {
}
exports.StaffStatDto = StaffStatDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffStatDto.prototype, "label", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], StaffStatDto.prototype, "value", void 0);
//# sourceMappingURL=staff-stat.dto.js.map