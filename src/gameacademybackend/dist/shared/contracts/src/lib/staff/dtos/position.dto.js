"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class PositionDto {
}
exports.PositionDto = PositionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(['Научно-педагогический работник', 'Профессорско-преподавательский состав']),
    tslib_1.__metadata("design:type", String)
], PositionDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PositionDto.prototype, "value", void 0);
//# sourceMappingURL=position.dto.js.map