"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPhaseDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const project_skill_dto_1 = require("./project-skill.dto");
class ProjectPhaseDto {
}
exports.ProjectPhaseDto = ProjectPhaseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProjectPhaseDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProjectPhaseDto.prototype, "date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProjectPhaseDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => project_skill_dto_1.ProjectSkillDto),
    tslib_1.__metadata("design:type", Array)
], ProjectPhaseDto.prototype, "skills", void 0);
//# sourceMappingURL=project-phase.dto.js.map