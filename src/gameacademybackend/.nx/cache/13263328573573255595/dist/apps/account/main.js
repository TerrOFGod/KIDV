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
const mongoose_1 = __webpack_require__(6);
const nestjs_rmq_1 = __webpack_require__(7);
const auth_module_1 = __webpack_require__(8);
const mongo_config_1 = __webpack_require__(42);
const rmq_config_1 = __webpack_require__(43);
const user_module_1 = __webpack_require__(11);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRMQConfig)()),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRootAsync((0, mongo_config_1.getMongoConfig)()),
        ],
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

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("nestjs-rmq");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(9);
const jwt_config_1 = __webpack_require__(10);
const user_module_1 = __webpack_require__(11);
const auth_controller_1 = __webpack_require__(40);
const auth_service_1 = __webpack_require__(41);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, jwt_1.JwtModule.registerAsync((0, jwt_config_1.getJwtConfig)())],
        controllers: [auth_controller_1.AuthContoller],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(12);
const user_repository_1 = __webpack_require__(16);
const user_commands_1 = __webpack_require__(18);
const user_quries_1 = __webpack_require__(39);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_model_1.User.name, schema: user_model_1.UserSchema }])],
        providers: [user_repository_1.UserRepository],
        exports: [user_repository_1.UserRepository],
        controllers: [user_commands_1.UserCommands, user_quries_1.UserQueries],
    })
], UserModule);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const interfaces_1 = __webpack_require__(13);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: interfaces_1.UserRole,
        type: String,
        default: interfaces_1.UserRole.Guest,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof interfaces_1.UserRole !== "undefined" && interfaces_1.UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 15 */
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
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(17);
const user_model_1 = __webpack_require__(12);
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        const newUser = new this.userModel(user);
        return newUser.save();
    }
    async findUser(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findUserById(id) {
        return this.userModel.findById(id).exec();
    }
    async findAllUsers() {
        return this.userModel.find().select('email displayName role').lean().exec();
    }
    async updateUserByEmail(email, partialEntity) {
        return this.userModel.findOneAndUpdate({ email }, partialEntity, {
            new: true,
        });
    }
    async updateUserById({ _id, ...rest }) {
        return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
    }
    async deleteUser(email) {
        return this.userModel.deleteOne({ email }).exec();
    }
    async searchByDisplayName(searchTerm) {
        const regex = searchTerm?.trim() ? new RegExp(searchTerm.trim(), 'i') : null;
        const filter = regex ? { displayName: regex } : {};
        return this.userModel.find(filter).select('_id email displayName role').lean().exec();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserRepository);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCommands = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const contracts_1 = __webpack_require__(19);
const nestjs_rmq_1 = __webpack_require__(7);
const account_constants_1 = __webpack_require__(36);
const user_entity_1 = __webpack_require__(37);
const user_repository_1 = __webpack_require__(16);
const contracts_2 = __webpack_require__(19);
let UserCommands = class UserCommands {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async userInfo({ user, id }) {
        const existedUser = await this.userRepository.findUserById(id);
        if (!existedUser)
            throw new Error(account_constants_1.THIS_USER_IS_NOT_EXISTS);
        const userEntity = new user_entity_1.UserEntity(existedUser).updateProfile(user.displayName);
        await this.userRepository.updateUserById(userEntity);
        return { user };
    }
    async changeRole(dto) {
        const user = await this.userRepository.findUser(dto.email);
        if (!user)
            throw new Error('Пользователь не найден');
        const userEntity = new user_entity_1.UserEntity(user);
        userEntity.role = dto.newRole;
        await this.userRepository.updateUserById(userEntity);
        return { profile: userEntity.getPublicProfile() };
    }
    async deleteUser({ email }) {
        const user = await this.userRepository.findUser(email);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        await this.userRepository.deleteUser(email);
        return { success: true };
    }
    async changePassword({ id, passwords }) {
        const existedUser = await this.userRepository.findUserById(id);
        if (!existedUser)
            throw new Error(account_constants_1.THIS_USER_IS_NOT_EXISTS);
        const userEntity = new user_entity_1.UserEntity(existedUser);
        const isOldValid = await userEntity.validatePassword(passwords.oldPassword);
        if (!isOldValid)
            throw new Error(account_constants_1.WRONG_OLD_PASSWORD);
        await userEntity.setPassword(passwords.newPassword);
        await this.userRepository.updateUserById(userEntity);
        return { success: true };
    }
};
exports.UserCommands = UserCommands;
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountChangeProfile.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof contracts_1.AccountChangeProfile !== "undefined" && contracts_1.AccountChangeProfile.Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserCommands.prototype, "userInfo", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountChangeRole.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof contracts_1.AccountChangeRole !== "undefined" && contracts_1.AccountChangeRole.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserCommands.prototype, "changeRole", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_2.AccountDeleteUser.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof contracts_2.AccountDeleteUser !== "undefined" && contracts_2.AccountDeleteUser.Request) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserCommands.prototype, "deleteUser", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountChangePasswordProfile.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof contracts_1.AccountChangePasswordProfile !== "undefined" && contracts_1.AccountChangePasswordProfile.Request) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserCommands.prototype, "changePassword", null);
exports.UserCommands = UserCommands = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserCommands);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeProfile = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
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
/* 21 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeRole = void 0;
const tslib_1 = __webpack_require__(4);
const interfaces_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(22);
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountLogin = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountRegister = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountUserInfo = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
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
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserList = void 0;
var UserList;
(function (UserList) {
    UserList.topic = 'users.list';
})(UserList || (exports.UserList = UserList = {}));


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeleteUser = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
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
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSearch = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangePasswordProfile = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
const class_transformer_1 = __webpack_require__(21);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameCreate = void 0;
__webpack_require__(32);
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
/* 32 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WRONG_OLD_PASSWORD = exports.WRONG_LOGIN_OR_PASSWORD = exports.THIS_USER_IS_NOT_EXISTS = exports.THIS_USER_IS_EXISTS = void 0;
exports.THIS_USER_IS_EXISTS = 'Такой пользователь уже зарегистрирован';
exports.THIS_USER_IS_NOT_EXISTS = 'Такого пользователя не существует';
exports.WRONG_LOGIN_OR_PASSWORD = 'Неверный логин или пароль';
exports.WRONG_OLD_PASSWORD = 'Неверный пароль';


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const bcryptjs_1 = __webpack_require__(38);
class UserEntity {
    constructor(user) {
        this._id = user._id;
        this.displayName = user.displayName;
        this.email = user.email;
        this.role = user.role;
        if ('passwordHash' in user) {
            this.passwordHash = user.passwordHash;
        }
    }
    getPublicProfile() {
        return {
            displayName: this.displayName,
            email: this.email,
            role: this.role,
        };
    }
    async setPassword(password) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        this.passwordHash = await (0, bcryptjs_1.hash)(password, salt);
        return this;
    }
    validatePassword(password) {
        return (0, bcryptjs_1.compare)(password, this.passwordHash);
    }
    updateProfile(displayName) {
        this.displayName = displayName;
        return this;
    }
}
exports.UserEntity = UserEntity;


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserQueries = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const contracts_1 = __webpack_require__(19);
const nestjs_rmq_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(37);
const user_repository_1 = __webpack_require__(16);
let UserQueries = class UserQueries {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async userInfo({ id }) {
        const user = await this.userRepository.findUserById(id);
        const profile = new user_entity_1.UserEntity(user).getPublicProfile();
        return { profile };
    }
    async searchUsers(dto) {
        const found = await this.userRepository.searchByDisplayName(dto.query);
        return {
            users: found.map((u) => ({
                _id: u._id.toString(),
                email: u.email,
                displayName: u.displayName,
                role: u.role,
            })),
        };
    }
    async listUsers() {
        const users = await this.userRepository.findAllUsers();
        return {
            users: users.map((u) => ({
                email: u.email,
                displayName: u.displayName,
                role: u.role,
            })),
        };
    }
};
exports.UserQueries = UserQueries;
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountUserInfo.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof contracts_1.AccountUserInfo !== "undefined" && contracts_1.AccountUserInfo.Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserQueries.prototype, "userInfo", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserSearch.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof contracts_1.UserSearch !== "undefined" && contracts_1.UserSearch.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserQueries.prototype, "searchUsers", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserList.topic),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserQueries.prototype, "listUsers", null);
exports.UserQueries = UserQueries = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserQueries);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthContoller = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const contracts_1 = __webpack_require__(19);
const nestjs_rmq_1 = __webpack_require__(7);
const auth_service_1 = __webpack_require__(41);
let AuthContoller = class AuthContoller {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return this.authService.register(dto);
    }
    async login({ email, password }) {
        const { id } = await this.authService.validateUser(email, password);
        return this.authService.login(id.toString());
    }
};
exports.AuthContoller = AuthContoller;
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountRegister.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof contracts_1.AccountRegister !== "undefined" && contracts_1.AccountRegister.Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthContoller.prototype, "register", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQValidate)(),
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.AccountLogin.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof contracts_1.AccountLogin !== "undefined" && contracts_1.AccountLogin.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthContoller.prototype, "login", null);
exports.AuthContoller = AuthContoller = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthContoller);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(9);
const interfaces_1 = __webpack_require__(13);
const user_entity_1 = __webpack_require__(37);
const user_repository_1 = __webpack_require__(16);
const account_constants_1 = __webpack_require__(36);
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register({ email, password, displayName }) {
        const oldUser = await this.userRepository.findUser(email);
        if (oldUser)
            throw new Error(account_constants_1.THIS_USER_IS_EXISTS);
        const newUserEntity = await new user_entity_1.UserEntity({
            displayName,
            email,
            role: interfaces_1.UserRole.Admin,
        }).setPassword(password);
        const newUser = await this.userRepository.createUser(newUserEntity);
        return { email: newUser.email };
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findUser(email);
        if (!user)
            throw new Error(account_constants_1.WRONG_LOGIN_OR_PASSWORD);
        const userEntity = new user_entity_1.UserEntity(user);
        const isCorrectPassword = await userEntity.validatePassword(password);
        if (!isCorrectPassword)
            throw new Error(account_constants_1.WRONG_LOGIN_OR_PASSWORD);
        return { id: user._id };
    }
    async login(id) {
        return {
            access_token: await this.jwtService.signAsync({ id }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMongoConfig = void 0;
const config_1 = __webpack_require__(5);
const getMongoConfig = () => {
    return {
        useFactory: (configService) => ({
            uri: getMongoString(configService),
        }),
        inject: [config_1.ConfigService],
        imports: [config_1.ConfigModule],
    };
};
exports.getMongoConfig = getMongoConfig;
const getMongoString = (configService) => 'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_DATABASE') +
    '?authSource=' +
    configService.get('MONGO_AUTHDATABASE');


/***/ }),
/* 43 */
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
        queueName: configService.get('AMQP_QUEUE') ?? '',
        prefetchCount: 32,
        serviceName: 'account-ms',
    }),
});
exports.getRMQConfig = getRMQConfig;


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
    app.enableCors();
    const port = process.env.PORT || 3002;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application Account is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map