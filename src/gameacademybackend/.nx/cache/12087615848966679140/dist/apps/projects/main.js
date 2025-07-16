/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(6);
const mongo_config_1 = __webpack_require__(7);
const games_module_1 = __webpack_require__(8);
const minio_module_1 = __webpack_require__(24);
const comments_module_1 = __webpack_require__(26);
const rmq_config_1 = __webpack_require__(52);
const nestjs_rmq_1 = __webpack_require__(31);
const duplicate_module_1 = __webpack_require__(25);
const admin_module_1 = __webpack_require__(53);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'envs/.projects.env',
            }),
            mongoose_1.MongooseModule.forRootAsync((0, mongo_config_1.getMongoConfig)()),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRMQConfig)()),
            minio_module_1.MinioModule,
            comments_module_1.CommentsModule,
            games_module_1.GamesModule,
            duplicate_module_1.DuplicateModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

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
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GamesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const games_service_1 = __webpack_require__(9);
const games_controller_1 = __webpack_require__(20);
const mongoose_1 = __webpack_require__(6);
const game_schema_1 = __webpack_require__(11);
const minio_module_1 = __webpack_require__(24);
const duplicate_module_1 = __webpack_require__(25);
let GamesModule = class GamesModule {
};
exports.GamesModule = GamesModule;
exports.GamesModule = GamesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: game_schema_1.Game.name, schema: game_schema_1.GameSchema }]), minio_module_1.MinioModule, duplicate_module_1.DuplicateModule],
        controllers: [games_controller_1.GamesController],
        providers: [games_service_1.GamesService],
    })
], GamesModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GamesService = exports.toArray = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
const game_schema_1 = __webpack_require__(11);
const minio_service_1 = __webpack_require__(12);
const unzipper = tslib_1.__importStar(__webpack_require__(14));
const crypto_1 = __webpack_require__(15);
const duplicate_service_1 = __webpack_require__(16);
const toArray = (val) => Array.isArray(val) ? val : val === undefined || val === null ? [] : [String(val)];
exports.toArray = toArray;
let GamesService = class GamesService {
    constructor(gameModel, minio, duplicate) {
        this.gameModel = gameModel;
        this.minio = minio;
        this.duplicate = duplicate;
    }
    async create(createDto, gameBuffer, modelFiles, imageFiles, videoFiles, coverBuffer, coverName, coverMime, playable = false) {
        const prefix = (0, crypto_1.randomBytes)(4).toString('hex') + '/';
        if (playable && gameBuffer) {
            const res = await this.duplicate.checkOrRegister(gameBuffer, `${createDto.title}-build.zip`, { type: 'build' }, { dryRun: true });
            if (res.duplicate)
                throw new common_1.ConflictException(`Duplicate build (id: ${res.record._id})`);
        }
        const stagedModels = modelFiles ? [...modelFiles] : [];
        for (const f of stagedModels) {
            const res = await this.duplicate.checkOrRegister(f.buffer, f.originalname, { type: 'model' }, { dryRun: true });
            if (res.duplicate)
                throw new common_1.ConflictException(`Duplicate model "${f.originalname}" (id: ${res.record._id})`);
        }
        const modelsKeys = [];
        const imagesKeys = [];
        const videosKeys = [];
        if (playable && gameBuffer) {
            await this.duplicate.checkOrRegister(gameBuffer, `${createDto.title}-build.zip`, { type: 'build' });
            const dir = await unzipper.Open.buffer(gameBuffer);
            await Promise.all(dir.files.map(async (e) => {
                if (e.type !== 'File')
                    return;
                const buf = await e.buffer();
                const key = `${prefix}${e.path}`;
                let ct = 'application/octet-stream';
                if (/\.js(\.br)?$/.test(e.path))
                    ct = 'application/javascript';
                else if (/\.wasm(\.br)?$/.test(e.path))
                    ct = 'application/wasm';
                const ce = e.path.endsWith('.br') ? 'br' : undefined;
                await this.minio.uploadBuild(key, buf, ct, ce);
            }));
        }
        for (const f of stagedModels) {
            await this.duplicate.checkOrRegister(f.buffer, f.originalname, { type: 'model' });
            const key = `${prefix}models/${f.originalname}`;
            await this.minio.uploadModel(key, f.buffer, f.mimetype);
            modelsKeys.push(key);
        }
        if (imageFiles) {
            for (const f of imageFiles) {
                const key = `${prefix}images/${f.originalname}`;
                await this.minio.uploadImage(key, f.buffer, f.mimetype);
                imagesKeys.push(key);
            }
        }
        if (videoFiles) {
            for (const f of videoFiles) {
                const key = `${prefix}videos/${f.originalname}`;
                await this.minio.uploadVideo(key, f.buffer, f.mimetype);
                videosKeys.push(key);
            }
        }
        if (!coverBuffer || !coverName || !coverMime) {
            throw new common_1.NotFoundException('Cover missing');
        }
        const coverKey = `${prefix}cover/${coverName}`;
        await this.minio.uploadImage(coverKey, coverBuffer, coverMime);
        const uploaderObjectId = new mongoose_2.Types.ObjectId(createDto.uploader);
        const authorsObjectIds = (0, exports.toArray)(createDto.authors).map((id) => new mongoose_2.Types.ObjectId(id));
        const genresArray = (0, exports.toArray)(createDto.genres);
        const gameData = {
            title: createDto.title,
            description: createDto.description,
            uploader: uploaderObjectId,
            authors: authorsObjectIds,
            genres: genresArray,
            cover: `${prefix}cover/${coverName}`,
            githubUrl: createDto.githubUrl,
            playable,
            models: modelsKeys,
            images: imagesKeys,
            videos: videosKeys,
            prefix,
        };
        const game = new this.gameModel(gameData);
        return game.save();
    }
    async findAll(q, uploader) {
        const filter = {};
        if (uploader) {
            const orConditions = [{ uploader }];
            if (mongoose_2.Types.ObjectId.isValid(uploader)) {
                orConditions.push({ authors: new mongoose_2.Types.ObjectId(uploader) });
            }
            filter.$or = orConditions;
        }
        if (q) {
            const regex = new RegExp(q, 'i');
            if (filter.$or) {
                filter.$and = [{ $or: filter.$or }, { $or: [{ title: regex }, { description: regex }, { genres: q }] }];
                delete filter.$or;
            }
            else {
                filter.$or = [{ title: regex }, { description: regex }, { genres: q }];
            }
        }
        return this.gameModel.find(filter).sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const game = await this.gameModel.findById(id).exec();
        if (!game)
            throw new common_1.NotFoundException('Game not found');
        return game;
    }
    async remove(id) {
        const game = await this.gameModel.findByIdAndDelete(id).exec();
        if (!game)
            throw new common_1.NotFoundException('Game not found');
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof minio_service_1.MinioService !== "undefined" && minio_service_1.MinioService) === "function" ? _b : Object, typeof (_c = typeof duplicate_service_1.DuplicateService !== "undefined" && duplicate_service_1.DuplicateService) === "function" ? _c : Object])
], GamesService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameSchema = exports.Game = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
let Game = class Game {
};
exports.Game = Game;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "prefix", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "models", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "images", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "videos", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "genres", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Game.prototype, "uploader", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "cover", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "githubUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Game.prototype, "playable", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "authors", void 0);
exports.Game = Game = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Game);
exports.GameSchema = mongoose_1.SchemaFactory.createForClass(Game);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MinioService = void 0;
const tslib_1 = __webpack_require__(1);
const client_s3_1 = __webpack_require__(13);
const common_1 = __webpack_require__(4);
let MinioService = class MinioService {
    constructor() {
        const { MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET, MINIO_MODELS_BUCKET, MINIO_IMAGES_BUCKET, MINIO_VIDEOS_BUCKET, MINIO_FORCE_PATH_STYLE, MINIO_PROTOCOL, } = process.env;
        this.bucket = MINIO_BUCKET;
        this.modelsBucket = MINIO_MODELS_BUCKET;
        this.imagesBucket = MINIO_IMAGES_BUCKET;
        this.videosBucket = MINIO_VIDEOS_BUCKET;
        this.client = new client_s3_1.S3Client({
            endpoint: `${MINIO_PROTOCOL}://${MINIO_ENDPOINT}`,
            region: 'us-east-1',
            credentials: {
                accessKeyId: MINIO_ACCESS_KEY,
                secretAccessKey: MINIO_SECRET_KEY,
            },
            forcePathStyle: MINIO_FORCE_PATH_STYLE === 'true',
        });
    }
    async onModuleInit() {
        for (const name of [this.bucket, this.modelsBucket, this.imagesBucket, this.videosBucket]) {
            await this.ensureBucketExists(name);
        }
    }
    async ensureBucketExists(name) {
        try {
            await this.client.send(new client_s3_1.HeadBucketCommand({ Bucket: name }));
            return;
        }
        catch (err) {
            const status = err.$metadata?.httpStatusCode;
            const isNotFound = err.name === 'NotFound' || status === 404;
            const isRulesError = err.message?.includes('Rules evaluation failed');
            if (isNotFound) {
                await this.client.send(new client_s3_1.CreateBucketCommand({ Bucket: name }));
                console.log(`✅ Created bucket ${name}`);
                return;
            }
            if (isRulesError) {
                console.warn(`Bucket "${name}" exists with policy error, continuing.`);
                return;
            }
            throw new common_1.InternalServerErrorException(`MinIO bucket "${name}" check failed: ${err.message}`);
        }
    }
    async uploadObject(bucketName, key, body, contentType, contentEncoding) {
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: body,
            ContentType: contentType,
            ...(contentEncoding ? { ContentEncoding: contentEncoding } : {}),
        };
        try {
            await this.client.send(new client_s3_1.PutObjectCommand(params));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`MinIO upload error: ${err.message}`);
        }
    }
    uploadBuild(key, body, contentType, contentEncoding) {
        return this.uploadObject(this.bucket, key, body, contentType, contentEncoding);
    }
    uploadModel(key, body, contentType) {
        return this.uploadObject(this.modelsBucket, key, body, contentType);
    }
    uploadImage(key, body, contentType) {
        return this.uploadObject(this.imagesBucket, key, body, contentType);
    }
    uploadVideo(key, body, contentType) {
        return this.uploadObject(this.videosBucket, key, body, contentType);
    }
    getPublicUrl(key, bucket = 'build') {
        const { MINIO_ENDPOINT, MINIO_PROTOCOL } = process.env;
        const buckets = {
            build: this.bucket,
            models: this.modelsBucket,
            images: this.imagesBucket,
            videos: this.videosBucket,
        };
        const b = buckets[bucket];
        return `${MINIO_PROTOCOL}://${MINIO_ENDPOINT}/${b}/${key}`;
    }
};
exports.MinioService = MinioService;
exports.MinioService = MinioService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], MinioService);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("unzipper");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DuplicateService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
const crypto_1 = __webpack_require__(15);
const jszip_1 = tslib_1.__importDefault(__webpack_require__(17));
const zlib_1 = __webpack_require__(18);
const duplicate_schema_1 = __webpack_require__(19);
const JACCARD_THRESHOLD = Number(process.env.JACCARD || 0.5);
function tryDecompress(entryName, buf) {
    const isBr = entryName.endsWith('.br');
    const isGz = entryName.endsWith('.gz') || entryName.endsWith('.unityweb');
    if (!isBr && !isGz)
        return buf;
    try {
        return isBr ? (0, zlib_1.brotliDecompressSync)(buf) : (0, zlib_1.gunzipSync)(buf);
    }
    catch {
        return buf;
    }
}
function mapValues(recorded) {
    if (recorded instanceof Map)
        return Array.from(recorded.values());
    if (recorded && typeof recorded === 'object')
        return Object.values(recorded);
    return [];
}
function encodePath(path) {
    return path
        .replace(/^__MACOSX\/.*$/, '')
        .replace(/\.(br|gz|unityweb)$/i, '')
        .replace(/\./g, '|');
}
function jaccard(a, b) {
    const inter = [...a].filter((x) => b.has(x)).length;
    const union = new Set([...a, ...b]).size;
    return union === 0 ? 0 : inter / union;
}
let DuplicateService = class DuplicateService {
    constructor(dupModel) {
        this.dupModel = dupModel;
    }
    computeHash(buf) {
        return (0, crypto_1.createHash)('sha256').update(buf).digest('hex');
    }
    isZip(buf) {
        return buf.length > 3 && buf[0] === 0x50 && buf[1] === 0x4b;
    }
    async buildSignature(buffer) {
        const zip = await jszip_1.default.loadAsync(buffer);
        const fileHashes = {};
        let author = '';
        let productName = '';
        await Promise.all(Object.values(zip.files).map(async (entry) => {
            if (entry.dir)
                return;
            const raw = await entry.async('nodebuffer');
            const content = tryDecompress(entry.name, raw);
            const key = encodePath(entry.name);
            fileHashes[key] = this.computeHash(content);
            if (/loader\.js/i.test(entry.name)) {
                const txt = content.toString('utf8');
                author = /companyName:"([^"]+)"/.exec(txt)?.[1] ?? author;
                productName = /productName:"([^"]+)"/.exec(txt)?.[1] ?? productName;
            }
        }));
        return { fileHashes, author, productName };
    }
    async checkOrRegister(buffer, originalName, metadata = {}, opts = {}) {
        const zipHash = this.computeHash(buffer);
        const full = await this.dupModel.findOne({ zipHash });
        if (full)
            return { duplicate: 'full', record: full };
        let signature = null;
        if (this.isZip(buffer)) {
            signature = await this.buildSignature(buffer);
            const sigSet = new Set(Object.values(signature.fileHashes));
            const candidates = await this.dupModel.find();
            for (const candidate of candidates) {
                const candSet = new Set(mapValues(candidate.fileHashes));
                const jac = jaccard(sigSet, candSet);
                if (jac >= JACCARD_THRESHOLD) {
                    return {
                        duplicate: 'relative',
                        similarity: jac,
                        matched: [...sigSet].filter((h) => candSet.has(h)),
                        record: candidate,
                    };
                }
            }
        }
        if (opts.dryRun) {
            return { duplicate: false };
        }
        const created = await this.dupModel.create({
            zipHash,
            ...signature,
            metadata,
            originalName,
        });
        return { duplicate: false, record: created };
    }
    async findAll() {
        return this.dupModel.find().sort({ _id: -1 }).exec();
    }
    async remove(id) {
        await this.dupModel.findByIdAndDelete(id).exec();
    }
};
exports.DuplicateService = DuplicateService;
exports.DuplicateService = DuplicateService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(duplicate_schema_1.Duplicate.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], DuplicateService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("jszip");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DuplicateSchema = exports.Duplicate = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
let Duplicate = class Duplicate {
};
exports.Duplicate = Duplicate;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Duplicate.prototype, "zipHash", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: String, default: {} }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], Duplicate.prototype, "fileHashes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Duplicate.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Duplicate.prototype, "productName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Mixed, default: {} }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], Duplicate.prototype, "metadata", void 0);
exports.Duplicate = Duplicate = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Duplicate);
exports.DuplicateSchema = mongoose_1.SchemaFactory.createForClass(Duplicate);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GamesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const platform_express_1 = __webpack_require__(21);
const games_service_1 = __webpack_require__(9);
const create_game_dto_1 = __webpack_require__(22);
let GamesController = class GamesController {
    constructor(gamesService) {
        this.gamesService = gamesService;
    }
    async uploadGame(files, createDto) {
        const coverFile = files.cover?.[0];
        if (!coverFile)
            throw new common_1.BadRequestException('Cover image is required');
        const gameFile = files.file?.[0];
        if (!gameFile && !createDto.githubUrl) {
            throw new common_1.BadRequestException('Either a ZIP build or a GitHub URL must be provided');
        }
        return this.gamesService.create(createDto, gameFile?.buffer, files.models, files.images, files.videos, coverFile.buffer, coverFile.originalname, coverFile.mimetype, !!gameFile);
    }
    async list(q, uploader) {
        return this.gamesService.findAll(q, uploader);
    }
    async one(id) {
        return this.gamesService.findOne(id);
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Id required');
        await this.gamesService.remove(id);
        return { success: true };
    }
};
exports.GamesController = GamesController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
        { name: 'models', maxCount: 20 },
        { name: 'images', maxCount: 20 },
        { name: 'videos', maxCount: 10 },
    ])),
    tslib_1.__param(0, (0, common_1.UploadedFiles)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof create_game_dto_1.CreateGameDto !== "undefined" && create_game_dto_1.CreateGameDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GamesController.prototype, "uploadGame", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('q')),
    tslib_1.__param(1, (0, common_1.Query)('uploader')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GamesController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GamesController.prototype, "one", null);
tslib_1.__decorate([
    (0, common_1.Post)('delete'),
    tslib_1.__param(0, (0, common_1.Body)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GamesController.prototype, "delete", null);
exports.GamesController = GamesController = tslib_1.__decorate([
    (0, common_1.Controller)('games'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof games_service_1.GamesService !== "undefined" && games_service_1.GamesService) === "function" ? _a : Object])
], GamesController);


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGameDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
class CreateGameDto {
}
exports.CreateGameDto = CreateGameDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateGameDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateGameDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateGameDto.prototype, "uploader", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateGameDto.prototype, "genres", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateGameDto.prototype, "cover", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    tslib_1.__metadata("design:type", String)
], CreateGameDto.prototype, "githubUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateGameDto.prototype, "authors", void 0);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MinioModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const minio_service_1 = __webpack_require__(12);
let MinioModule = class MinioModule {
};
exports.MinioModule = MinioModule;
exports.MinioModule = MinioModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [minio_service_1.MinioService],
        exports: [minio_service_1.MinioService],
    })
], MinioModule);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DuplicateModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const duplicate_schema_1 = __webpack_require__(19);
const duplicate_service_1 = __webpack_require__(16);
let DuplicateModule = class DuplicateModule {
};
exports.DuplicateModule = DuplicateModule;
exports.DuplicateModule = DuplicateModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: duplicate_schema_1.Duplicate.name, schema: duplicate_schema_1.DuplicateSchema }])],
        providers: [duplicate_service_1.DuplicateService],
        exports: [duplicate_service_1.DuplicateService],
    })
], DuplicateModule);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const comment_schema_1 = __webpack_require__(27);
const comments_service_1 = __webpack_require__(29);
const comments_controller_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(51);
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
            ]),
        ],
        providers: [comments_service_1.CommentsService],
        controllers: [comments_controller_1.CommentsController],
        exports: [comments_service_1.CommentsService],
    })
], CommentsModule);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentSchema = exports.Comment = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
const user_schema_1 = __webpack_require__(28);
let Comment = class Comment {
};
exports.Comment = Comment;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name, required: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Comment.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Comment.prototype, "gameId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: Comment.name }),
    tslib_1.__metadata("design:type", typeof (_c = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _c : Object)
], Comment.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "content", void 0);
exports.Comment = Comment = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Comment);
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: 'users', timestamps: false })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(10);
const comment_schema_1 = __webpack_require__(27);
let CommentsService = class CommentsService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async create(dto, userId) {
        const comment = new this.commentModel({
            author: new mongoose_2.Types.ObjectId(userId),
            gameId: new mongoose_2.Types.ObjectId(dto.gameId),
            parent: dto.parent ? new mongoose_2.Types.ObjectId(dto.parent) : undefined,
            content: dto.content,
        });
        return comment.save();
    }
    async findByGame(gameId) {
        const docs = await this.commentModel
            .find({ gameId: new mongoose_2.Types.ObjectId(gameId) })
            .sort({ createdAt: 1 })
            .populate('author', 'displayName role')
            .lean()
            .exec();
        const map = new Map();
        docs.forEach((c) => {
            const key = c.parent?.toString() || 'root';
            map.set(key, (map.get(key) || []).concat(c));
        });
        function build(parentId) {
            return (map.get(parentId) || []).map((c) => ({
                ...c,
                replies: build(c._id.toString()),
            }));
        }
        return build('root');
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CommentsService);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const nestjs_rmq_1 = __webpack_require__(31);
const contracts_1 = __webpack_require__(32);
const comments_service_1 = __webpack_require__(29);
let CommentsController = class CommentsController {
    constructor(svc) {
        this.svc = svc;
    }
    async create(dto) {
        const { userId, ...commentDto } = dto;
        return this.svc.create(commentDto, userId);
    }
    async list(dto) {
        const comments = await this.svc.findByGame(dto.gameId);
        return { comments };
    }
};
exports.CommentsController = CommentsController;
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.CommentCreate.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.CommentList.topic),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof contracts_1.CommentList !== "undefined" && contracts_1.CommentList.Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommentsController.prototype, "list", null);
exports.CommentsController = CommentsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _a : Object])
], CommentsController);


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("nestjs-rmq");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeProfile = void 0;
const tslib_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(34);
const class_validator_1 = __webpack_require__(23);
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
/* 34 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangeRole = void 0;
const tslib_1 = __webpack_require__(1);
const interfaces_1 = __webpack_require__(36);
const class_validator_1 = __webpack_require__(23);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
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
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountLogin = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
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
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountRegister = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
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
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountUserInfo = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
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
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserList = void 0;
var UserList;
(function (UserList) {
    UserList.topic = 'users.list';
})(UserList || (exports.UserList = UserList = {}));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeleteUser = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSearch = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountChangePasswordProfile = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(23);
const class_transformer_1 = __webpack_require__(34);
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
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameCreate = void 0;
__webpack_require__(47);
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
/* 47 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: 'users', timestamps: false })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 52 */
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
        autoBindingRoutes: true,
        serviceName: 'projects-ms',
    }),
});
exports.getRMQConfig = getRMQConfig;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(6);
const games_service_1 = __webpack_require__(9);
const game_schema_1 = __webpack_require__(11);
const minio_module_1 = __webpack_require__(24);
const duplicate_module_1 = __webpack_require__(25);
const admin_games_controller_1 = __webpack_require__(54);
const admin_duplicates_controller_1 = __webpack_require__(55);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: game_schema_1.Game.name, schema: game_schema_1.GameSchema }]), minio_module_1.MinioModule, duplicate_module_1.DuplicateModule],
        controllers: [admin_games_controller_1.AdminGamesController, admin_duplicates_controller_1.AdminDuplicatesController],
        providers: [games_service_1.GamesService],
    })
], AdminModule);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminGamesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const games_service_1 = __webpack_require__(9);
const nestjs_rmq_1 = __webpack_require__(31);
const contracts_1 = __webpack_require__(32);
let AdminGamesController = class AdminGamesController {
    constructor(gamesService, rmqService) {
        this.gamesService = gamesService;
        this.rmqService = rmqService;
    }
    async listAll() {
        const games = await this.gamesService.findAll();
        const enriched = await Promise.all(games.map(async (g) => {
            const uploaderIdStr = g.uploader.toString();
            let uploaderLabel = uploaderIdStr;
            try {
                const { profile } = await this.rmqService.send(contracts_1.AccountUserInfo.topic, { id: uploaderIdStr });
                uploaderLabel = `${profile.displayName} (${profile.email})`;
            }
            catch {
            }
            return {
                _id: g._id.toString(),
                title: g.title,
                uploader: uploaderLabel,
                createdAt: g.get('createdAt'),
            };
        }));
        return { games: enriched };
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Id required');
        await this.gamesService.remove(id);
        return { success: true };
    }
};
exports.AdminGamesController = AdminGamesController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AdminGamesController.prototype, "listAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('delete'),
    tslib_1.__param(0, (0, common_1.Body)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminGamesController.prototype, "delete", null);
exports.AdminGamesController = AdminGamesController = tslib_1.__decorate([
    (0, common_1.Controller)('admin/games'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof games_service_1.GamesService !== "undefined" && games_service_1.GamesService) === "function" ? _a : Object, typeof (_b = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _b : Object])
], AdminGamesController);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDuplicatesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const duplicate_service_1 = __webpack_require__(16);
let AdminDuplicatesController = class AdminDuplicatesController {
    constructor(duplicateService) {
        this.duplicateService = duplicateService;
    }
    async listAll() {
        const items = await this.duplicateService.findAll();
        return {
            duplicates: items.map((d) => ({
                _id: d._id.toString(),
                zipHash: d.zipHash,
                author: d.author,
                productName: d.productName,
                fileHashes: d.fileHashes,
                metadata: d.metadata,
                createdAt: (d.get('createdAt') ?? d._id.getTimestamp()).toISOString(),
            })),
        };
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Id required');
        await this.duplicateService.remove(id);
        return { success: true };
    }
};
exports.AdminDuplicatesController = AdminDuplicatesController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDuplicatesController.prototype, "listAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('delete'),
    tslib_1.__param(0, (0, common_1.Body)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminDuplicatesController.prototype, "delete", null);
exports.AdminDuplicatesController = AdminDuplicatesController = tslib_1.__decorate([
    (0, common_1.Controller)('admin/duplicates'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof duplicate_service_1.DuplicateService !== "undefined" && duplicate_service_1.DuplicateService) === "function" ? _a : Object])
], AdminDuplicatesController);


/***/ }),
/* 56 */
/***/ ((module) => {

module.exports = require("dotenv");

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
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const dotenv = tslib_1.__importStar(__webpack_require__(56));
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(3001);
    console.log('Backend running on http://localhost:3001');
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map