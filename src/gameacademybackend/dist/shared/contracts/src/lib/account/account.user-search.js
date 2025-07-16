"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearch = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var UserSearch;
(function (UserSearch) {
    UserSearch.topic = 'users.search.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "query", void 0);
    UserSearch.Request = Request;
    class Response {
    }
    UserSearch.Response = Response;
})(UserSearch || (exports.UserSearch = UserSearch = {}));
//# sourceMappingURL=account.user-search.js.map