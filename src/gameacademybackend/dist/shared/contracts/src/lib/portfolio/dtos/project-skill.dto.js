"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSkillDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ProjectSkillDto {
}
exports.ProjectSkillDto = ProjectSkillDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProjectSkillDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProjectSkillDto.prototype, "level", void 0);
//# sourceMappingURL=project-skill.dto.js.map