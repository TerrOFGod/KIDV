"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffCreateDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const staff_stat_dto_1 = require("./staff-stat.dto");
const staff_skill_dto_1 = require("./staff-skill.dto");
const staff_achievement_dto_1 = require("./staff-achievement.dto");
class StaffCreateDto {
}
exports.StaffCreateDto = StaffCreateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "position", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(["LEGENDARY", "RARE", "COMMON"]),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "rarity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "telegram", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "github", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffCreateDto.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], StaffCreateDto.prototype, "researchInterests", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => staff_stat_dto_1.StaffStatDto),
    tslib_1.__metadata("design:type", Array)
], StaffCreateDto.prototype, "stats", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => staff_skill_dto_1.StaffSkillDto),
    tslib_1.__metadata("design:type", Array)
], StaffCreateDto.prototype, "skills", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => staff_achievement_dto_1.StaffAchievementDto),
    tslib_1.__metadata("design:type", Array)
], StaffCreateDto.prototype, "achievements", void 0);
//# sourceMappingURL=staff.create.dto.js.map