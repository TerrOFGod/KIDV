"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubskillDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class SubskillDto {
}
exports.SubskillDto = SubskillDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SubskillDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SubskillDto.prototype, "description", void 0);
//# sourceMappingURL=subskill.dto.js.map