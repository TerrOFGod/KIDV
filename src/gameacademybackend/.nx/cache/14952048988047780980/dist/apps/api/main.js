/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(7);
const nestjs_rmq_1 = __webpack_require__(8);
const jwt_config_1 = __webpack_require__(9);
const rmq_config_1 = __webpack_require__(10);
const auth_controller_1 = __webpack_require__(11);
const user_controller_1 = __webpack_require__(34);
const jwt_strategy_1 = __webpack_require__(38);
const comments_controller_1 = __webpack_require__(40);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRMQConfig)()),
            jwt_1.JwtModule.registerAsync((0, jwt_config_1.getJwtConfig)()),
            passport_1.PassportModule,
        ],
        controllers: [auth_controller_1.AuthContoller, user_controller_1.UserController, comments_controller_1.CommentsController],
        providers: [jwt_strategy_1.JwtStrategy],
        exports: [passport_1.PassportModule, jwt_1.JwtModule],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("nestjs-rmq");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getJwtConfig = void 0;
const config_1 = __webpack_require__(5);
const getJwtConfig = () => ({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: '4h',
        },
    }),
});
exports.getJwtConfig = getJwtConfig;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRMQConfig = void 0;
const config_1 = __webpack_require__(5);
const getRMQConfig = () => ({
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
        connections: [
            {
                login: configService.get('AMQP_LOGIN_USER') ?? '',
                password: configService.get('AMQP_PASSWORD_USER') ?? '',
                host: configService.get('AMQP_HOSTNAME') ?? '',
            },
        ],
        queueName: configService.get('AMQP_QUEUE'),
        prefetchCount: 32,
        serviceName: 'api-ms',
    }),
});
exports.getRMQConfig = getRMQConfig;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthContoller = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const contracts_1 = __webpack_require__(12);
const nestjs_rmq_1 = __webpack_require__(8);
const login_dto_1 = __webpack_require__(32);
const register_dto_1 = __webpack_require__(33);
let AuthContoller = class AuthContoller {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async register(dto) {
        try {
            return await this.rmqService.send(contracts_1.AccountRegister.topic, dto);
        }
        catch (e) {
            if (e instanceof Error)
                throw new common_1.UnauthorizedException(e.message);
        }
    }
    async login(dto) {
        try {
            return await this.rmqService.send(contracts_1.AccountLogin.topic, dto);
        }
        catch (e) {
            if (e instanceof Error)
                throw new common_1.UnauthorizedException(e.message);
        }
    }
};
exports.AuthContoller = AuthContoller;
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthContoller.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthContoller.prototype, "login", null);
exports.AuthContoller = AuthContoller = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _a : Object])
], AuthContoller);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeProfile = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(14);
const class_validator_1 = __webpack_require__(15);
class ChangeProfileDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ChangeProfileDto.prototype, "displayName", void 0);
var AccountChangeProfile;
(function (AccountChangeProfile) {
    AccountChangeProfile.topic = 'account.change-profile.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => ChangeProfileDto),
        tslib_1.__metadata("design:type", ChangeProfileDto)
    ], Request.prototype, "user", void 0);
    AccountChangeProfile.Request = Request;
    class Response {
    }
    AccountChangeProfile.Response = Response;
})(AccountChangeProfile || (exports.AccountChangeProfile = AccountChangeProfile = {}));


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeRole = void 0;
const tslib_1 = __webpack_require__(4);
const interfaces_1 = __webpack_require__(17);
const class_validator_1 = __webpack_require__(15);
var AccountChangeRole;
(function (AccountChangeRole) {
    var _a;
    AccountChangeRole.topic = 'account.change-role.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsEnum)(interfaces_1.UserRole),
        tslib_1.__metadata("design:type", typeof (_a = typeof interfaces_1.UserRole !== "undefined" && interfaces_1.UserRole) === "function" ? _a : Object)
    ], Request.prototype, "newRole", void 0);
    AccountChangeRole.Request = Request;
    class Response {
    }
    AccountChangeRole.Response = Response;
})(AccountChangeRole || (exports.AccountChangeRole = AccountChangeRole = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Guest"] = "Guest";
    UserRole["Teacher"] = "Teacher";
    UserRole["Student"] = "Student";
    UserRole["Admin"] = "Admin";
})(UserRole || (exports.UserRole = UserRole = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountLogin = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
var AccountLogin;
(function (AccountLogin) {
    AccountLogin.topic = 'account.login.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsEmail)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "password", void 0);
    AccountLogin.Request = Request;
    class Response {
    }
    AccountLogin.Response = Response;
})(AccountLogin || (exports.AccountLogin = AccountLogin = {}));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountRegister = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
var AccountRegister;
(function (AccountRegister) {
    AccountRegister.topic = 'account.register.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsEmail)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "password", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "displayName", void 0);
    AccountRegister.Request = Request;
    class Response {
    }
    AccountRegister.Response = Response;
})(AccountRegister || (exports.AccountRegister = AccountRegister = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountUserInfo = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
var AccountUserInfo;
(function (AccountUserInfo) {
    AccountUserInfo.topic = 'account.user-info.query';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    AccountUserInfo.Request = Request;
    class Response {
    }
    AccountUserInfo.Response = Response;
})(AccountUserInfo || (exports.AccountUserInfo = AccountUserInfo = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserList = void 0;
var UserList;
(function (UserList) {
    UserList.topic = 'users.list';
})(UserList || (exports.UserList = UserList = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeleteUser = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
var AccountDeleteUser;
(function (AccountDeleteUser) {
    AccountDeleteUser.topic = 'account.delete-user.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsEmail)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "email", void 0);
    AccountDeleteUser.Request = Request;
    class Response {
    }
    AccountDeleteUser.Response = Response;
})(AccountDeleteUser || (exports.AccountDeleteUser = AccountDeleteUser = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSearch = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
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


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangePasswordProfile = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(14);
class ChangePasswordDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Старый пароль должен содержать минимум 6 символов' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Новый пароль должен содержать минимум 6 символов' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
var AccountChangePasswordProfile;
(function (AccountChangePasswordProfile) {
    AccountChangePasswordProfile.topic = 'account.change-password-profile.command';
    class Request {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata("design:type", String)
    ], Request.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_transformer_1.Type)(() => ChangePasswordDto),
        (0, class_validator_1.ValidateNested)(),
        tslib_1.__metadata("design:type", ChangePasswordDto)
    ], Request.prototype, "passwords", void 0);
    AccountChangePasswordProfile.Request = Request;
    class Response {
    }
    AccountChangePasswordProfile.Response = Response;
})(AccountChangePasswordProfile || (exports.AccountChangePasswordProfile = AccountChangePasswordProfile = {}));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameCreate = void 0;
__webpack_require__(28);
var GameCreate;
(function (GameCreate) {
    GameCreate.topic = 'game.create.command';
    class Request {
    }
    GameCreate.Request = Request;
    class Response {
    }
    GameCreate.Response = Response;
})(GameCreate || (exports.GameCreate = GameCreate = {}));


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameGetAll = void 0;
var GameGetAll;
(function (GameGetAll) {
    GameGetAll.topic = 'game.get-all.query';
    class Request {
    }
    GameGetAll.Request = Request;
    class Response {
    }
    GameGetAll.Response = Response;
})(GameGetAll || (exports.GameGetAll = GameGetAll = {}));


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentCreate = void 0;
var CommentCreate;
(function (CommentCreate) {
    CommentCreate.topic = 'account.create.command';
    class Request {
    }
    CommentCreate.Request = Request;
    class Response {
    }
    CommentCreate.Response = Response;
})(CommentCreate || (exports.CommentCreate = CommentCreate = {}));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentList = void 0;
var CommentList;
(function (CommentList) {
    CommentList.topic = 'account.list.query';
    class Request {
    }
    CommentList.Request = Request;
    class Response {
    }
    CommentList.Response = Response;
})(CommentList || (exports.CommentList = CommentList = {}));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(15);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "displayName", void 0);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(8);
const contracts_1 = __webpack_require__(12);
const jwt_guard_1 = __webpack_require__(35);
const user_decorator_1 = __webpack_require__(36);
const roles_guard_1 = __webpack_require__(37);
const interfaces_1 = __webpack_require__(17);
let UserController = class UserController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async info(userIdFromToken, { id }) {
        return this.rmqService.send(contracts_1.AccountUserInfo.topic, { id });
    }
    async changeRole(dto) {
        return this.rmqService.send(contracts_1.AccountChangeRole.topic, dto);
    }
    async listUsers() {
        return this.rmqService.send(contracts_1.UserList.topic, {});
    }
    async changeRoleAdmin(dto) {
        return this.rmqService.send(contracts_1.AccountChangeRole.topic, dto);
    }
    async delete(dto) {
        return this.rmqService.send(contracts_1.AccountDeleteUser.topic, dto);
    }
    async search(query) {
        return this.rmqService.send(contracts_1.UserSearch.topic, { query });
    }
    async changePassword(userIdFromToken, body) {
        const { oldPassword, newPassword } = body;
        return this.rmqService.send(contracts_1.AccountChangePasswordProfile.topic, {
            id: userIdFromToken,
            passwords: { oldPassword, newPassword },
        });
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('info'),
    tslib_1.__param(0, (0, user_decorator_1.UserId)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof contracts_1.AccountUserInfo !== "undefined" && contracts_1.AccountUserInfo.Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "info", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('change-role'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof contracts_1.AccountChangeRole !== "undefined" && contracts_1.AccountChangeRole.Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "changeRole", null);
tslib_1.__decorate([
    (0, common_1.Get)('users'),
    (0, roles_guard_1.Roles)(interfaces_1.UserRole.Admin),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "listUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/change-role'),
    (0, roles_guard_1.Roles)(interfaces_1.UserRole.Admin),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof contracts_1.AccountChangeRole !== "undefined" && contracts_1.AccountChangeRole.Request) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "changeRoleAdmin", null);
tslib_1.__decorate([
    (0, common_1.Post)('delete'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof contracts_1.AccountDeleteUser !== "undefined" && contracts_1.AccountDeleteUser.Request) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Get)('search'),
    tslib_1.__param(0, (0, common_1.Query)('query')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "search", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('change-password'),
    tslib_1.__param(0, (0, user_decorator_1.UserId)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UserController.prototype, "changePassword", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWTAuthGuard = void 0;
const passport_1 = __webpack_require__(7);
class JWTAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.JWTAuthGuard = JWTAuthGuard;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserId = void 0;
const common_1 = __webpack_require__(1);
exports.UserId = (0, common_1.createParamDecorator)((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (typeof user === 'string') {
        return user;
    }
    if (user && typeof user === 'object') {
        if (typeof user.sub === 'string') {
            return user.sub;
        }
        if (typeof user.id === 'string') {
            return user.id;
        }
    }
    throw new Error('Cannot extract userId from request');
});


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(ctx) {
        const requiredRoles = this.reflector.get('roles', ctx.getHandler());
        if (!requiredRoles)
            return true;
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        return requiredRoles.includes(user.role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
const common_2 = __webpack_require__(1);
const Roles = (...roles) => (0, common_2.SetMetadata)('roles', roles);
exports.Roles = Roles;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(7);
const passport_jwt_1 = __webpack_require__(39);
const config_1 = __webpack_require__(5);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }
    async validate(payload) {
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(8);
const jwt_guard_1 = __webpack_require__(35);
const contracts_1 = __webpack_require__(12);
let CommentsController = class CommentsController {
    constructor(rmq) {
        this.rmq = rmq;
    }
    async create(dto, req) {
        const userId = req.user;
        if (!dto.content.trim()) {
            throw new common_1.UnauthorizedException('Пустой комментарий');
        }
        return this.rmq.send(contracts_1.CommentCreate.topic, { ...dto, userId });
    }
    async list(gameId) {
        return this.rmq.send(contracts_1.CommentList.topic, { gameId });
    }
};
exports.CommentsController = CommentsController;
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof contracts_1.CommentCreate !== "undefined" && contracts_1.CommentCreate.Request) === "function" ? _b : Object, Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommentsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('gameId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommentsController.prototype, "list", null);
exports.CommentsController = CommentsController = tslib_1.__decorate([
    (0, common_1.Controller)('comments'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _a : Object])
], CommentsController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3003;
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map