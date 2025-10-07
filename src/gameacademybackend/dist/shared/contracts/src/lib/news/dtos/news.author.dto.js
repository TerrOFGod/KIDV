"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsAuthorDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class NewsAuthorDto {
}
exports.NewsAuthorDto = NewsAuthorDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], NewsAuthorDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], NewsAuthorDto.prototype, "slug", void 0);
//# sourceMappingURL=news.author.dto.js.map