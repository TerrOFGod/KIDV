"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoryCreateDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class SuccessStoryCreateDto {
}
exports.SuccessStoryCreateDto = SuccessStoryCreateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], SuccessStoryCreateDto.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], SuccessStoryCreateDto.prototype, "lng", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "graduate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "project", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], SuccessStoryCreateDto.prototype, "year", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "link", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SuccessStoryCreateDto.prototype, "image", void 0);
//# sourceMappingURL=success-story.create.dto.js.map