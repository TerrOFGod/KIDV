"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsUpdateDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const news_create_dto_1 = require("./news.create.dto");
class NewsUpdateDto extends news_create_dto_1.NewsCreateDto {
}
exports.NewsUpdateDto = NewsUpdateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], NewsUpdateDto.prototype, "id", void 0);
//# sourceMappingURL=news.update.dto.js.map