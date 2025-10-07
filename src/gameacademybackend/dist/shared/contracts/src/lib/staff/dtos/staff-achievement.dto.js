"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAchievementDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class StaffAchievementDto {
}
exports.StaffAchievementDto = StaffAchievementDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffAchievementDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffAchievementDto.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StaffAchievementDto.prototype, "description", void 0);
//# sourceMappingURL=staff-achievement.dto.js.map