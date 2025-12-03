"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffSkillDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const subskill_dto_1 = require("./subskill.dto");
class StaffSkillDto {
}
exports.StaffSkillDto = StaffSkillDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffSkillDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(['Junior', 'Middle', 'Senior']),
    tslib_1.__metadata("design:type", String)
], StaffSkillDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffSkillDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => subskill_dto_1.SubskillDto),
    tslib_1.__metadata("design:type", Array)
], StaffSkillDto.prototype, "subskills", void 0);
//# sourceMappingURL=staff-skill.dto.js.map