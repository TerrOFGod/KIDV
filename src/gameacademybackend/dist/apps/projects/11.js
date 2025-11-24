"use strict";
exports.id = 11;
exports.ids = [11];
exports.modules = {

/***/ 2960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AwsRestJsonProtocol: () => (/* binding */ AwsRestJsonProtocol)
});

// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/HttpBindingProtocol.js + 1 modules
var HttpBindingProtocol = __webpack_require__(2656);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeSerializer.js + 2 modules
var HttpInterceptingShapeSerializer = __webpack_require__(2671);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeDeserializer.js
var HttpInterceptingShapeDeserializer = __webpack_require__(2666);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js
var NormalizedSchema = __webpack_require__(2637);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js
var TypeRegistry = __webpack_require__(2640);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ProtocolLib.js
var ProtocolLib = __webpack_require__(2673);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ConfigurableSerdeContext.js
var ConfigurableSerdeContext = __webpack_require__(2677);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/serde/determineTimestampFormat.js
var determineTimestampFormat = __webpack_require__(2670);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/serde/lazy-json.js
var lazy_json = __webpack_require__(2668);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js + 1 modules
var date_utils = __webpack_require__(2672);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/serde/value/NumericValue.js
var NumericValue = __webpack_require__(2669);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/fromBase64.js
var fromBase64 = __webpack_require__(2659);
;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/jsonReviver.js

function jsonReviver(key, value, context) {
    if (context?.source) {
        const numericString = context.source;
        if (typeof value === "number") {
            if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER || numericString !== String(value)) {
                const isFractional = numericString.includes(".");
                if (isFractional) {
                    return new NumericValue.NumericValue(numericString, "bigDecimal");
                }
                else {
                    return BigInt(numericString);
                }
            }
        }
    }
    return value;
}

// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js
var common = __webpack_require__(2676);
;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js

const parseJsonBody = (streamBody, context) => (0,common.collectBodyString)(streamBody, context).then((encoded) => {
    if (encoded.length) {
        try {
            return JSON.parse(encoded);
        }
        catch (e) {
            if (e?.name === "SyntaxError") {
                Object.defineProperty(e, "$responseBodyText", {
                    value: encoded,
                });
            }
            throw e;
        }
    }
    return {};
});
const parseJsonErrorBody = async (errorBody, context) => {
    const value = await parseJsonBody(errorBody, context);
    value.message = value.message ?? value.Message;
    return value;
};
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
            cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
            cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data && typeof data === "object") {
        const codeKey = findKey(data, "code");
        if (codeKey && data[codeKey] !== undefined) {
            return sanitizeErrorCode(data[codeKey]);
        }
        if (data["__type"] !== undefined) {
            return sanitizeErrorCode(data["__type"]);
        }
    }
};

;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonShapeDeserializer.js







class JsonShapeDeserializer extends ConfigurableSerdeContext.SerdeContextConfig {
    settings;
    constructor(settings) {
        super();
        this.settings = settings;
    }
    async read(schema, data) {
        return this._read(schema, typeof data === "string" ? JSON.parse(data, jsonReviver) : await parseJsonBody(data, this.serdeContext));
    }
    readObject(schema, data) {
        return this._read(schema, data);
    }
    _read(schema, value) {
        const isObject = value !== null && typeof value === "object";
        const ns = NormalizedSchema.NormalizedSchema.of(schema);
        if (ns.isListSchema() && Array.isArray(value)) {
            const listMember = ns.getValueSchema();
            const out = [];
            const sparse = !!ns.getMergedTraits().sparse;
            for (const item of value) {
                if (sparse || item != null) {
                    out.push(this._read(listMember, item));
                }
            }
            return out;
        }
        else if (ns.isMapSchema() && isObject) {
            const mapMember = ns.getValueSchema();
            const out = {};
            const sparse = !!ns.getMergedTraits().sparse;
            for (const [_k, _v] of Object.entries(value)) {
                if (sparse || _v != null) {
                    out[_k] = this._read(mapMember, _v);
                }
            }
            return out;
        }
        else if (ns.isStructSchema() && isObject) {
            const out = {};
            for (const [memberName, memberSchema] of ns.structIterator()) {
                const fromKey = this.settings.jsonName ? memberSchema.getMergedTraits().jsonName ?? memberName : memberName;
                const deserializedValue = this._read(memberSchema, value[fromKey]);
                if (deserializedValue != null) {
                    out[memberName] = deserializedValue;
                }
            }
            return out;
        }
        if (ns.isBlobSchema() && typeof value === "string") {
            return (0,fromBase64.fromBase64)(value);
        }
        const mediaType = ns.getMergedTraits().mediaType;
        if (ns.isStringSchema() && typeof value === "string" && mediaType) {
            const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
            if (isJson) {
                return lazy_json.LazyJsonString.from(value);
            }
        }
        if (ns.isTimestampSchema() && value != null) {
            const format = (0,determineTimestampFormat.determineTimestampFormat)(ns, this.settings);
            switch (format) {
                case 5:
                    return (0,date_utils.parseRfc3339DateTimeWithOffset)(value);
                case 6:
                    return (0,date_utils.parseRfc7231DateTime)(value);
                case 7:
                    return (0,date_utils.parseEpochTimestamp)(value);
                default:
                    console.warn("Missing timestamp format, parsing value with Date constructor:", value);
                    return new Date(value);
            }
        }
        if (ns.isBigIntegerSchema() && (typeof value === "number" || typeof value === "string")) {
            return BigInt(value);
        }
        if (ns.isBigDecimalSchema() && value != undefined) {
            if (value instanceof NumericValue.NumericValue) {
                return value;
            }
            const untyped = value;
            if (untyped.type === "bigDecimal" && "string" in untyped) {
                return new NumericValue.NumericValue(untyped.string, untyped.type);
            }
            return new NumericValue.NumericValue(String(value), "bigDecimal");
        }
        if (ns.isNumericSchema() && typeof value === "string") {
            switch (value) {
                case "Infinity":
                    return Infinity;
                case "-Infinity":
                    return -Infinity;
                case "NaN":
                    return NaN;
            }
        }
        if (ns.isDocumentSchema()) {
            if (isObject) {
                const out = Array.isArray(value) ? [] : {};
                for (const [k, v] of Object.entries(value)) {
                    if (v instanceof NumericValue.NumericValue) {
                        out[k] = v;
                    }
                    else {
                        out[k] = this._read(ns, v);
                    }
                }
                return out;
            }
            else {
                return structuredClone(value);
            }
        }
        return value;
    }
}

// EXTERNAL MODULE: ../../node_modules/@smithy/uuid/dist-es/v4.js + 1 modules
var v4 = __webpack_require__(2620);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/toBase64.js
var toBase64 = __webpack_require__(2660);
;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/jsonReplacer.js

const NUMERIC_CONTROL_CHAR = String.fromCharCode(925);
class JsonReplacer {
    values = new Map();
    counter = 0;
    stage = 0;
    createReplacer() {
        if (this.stage === 1) {
            throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
        }
        if (this.stage === 2) {
            throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
        }
        this.stage = 1;
        return (key, value) => {
            if (value instanceof NumericValue.NumericValue) {
                const v = `${NUMERIC_CONTROL_CHAR + "nv" + this.counter++}_` + value.string;
                this.values.set(`"${v}"`, value.string);
                return v;
            }
            if (typeof value === "bigint") {
                const s = value.toString();
                const v = `${NUMERIC_CONTROL_CHAR + "b" + this.counter++}_` + s;
                this.values.set(`"${v}"`, s);
                return v;
            }
            return value;
        };
    }
    replaceInJson(json) {
        if (this.stage === 0) {
            throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
        }
        if (this.stage === 2) {
            throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
        }
        this.stage = 2;
        if (this.counter === 0) {
            return json;
        }
        for (const [key, value] of this.values) {
            json = json.replace(key, value);
        }
        return json;
    }
}

;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonShapeSerializer.js






class JsonShapeSerializer extends ConfigurableSerdeContext.SerdeContextConfig {
    settings;
    buffer;
    rootSchema;
    constructor(settings) {
        super();
        this.settings = settings;
    }
    write(schema, value) {
        this.rootSchema = NormalizedSchema.NormalizedSchema.of(schema);
        this.buffer = this._write(this.rootSchema, value);
    }
    writeDiscriminatedDocument(schema, value) {
        this.write(schema, value);
        if (typeof this.buffer === "object") {
            this.buffer.__type = NormalizedSchema.NormalizedSchema.of(schema).getName(true);
        }
    }
    flush() {
        const { rootSchema } = this;
        this.rootSchema = undefined;
        if (rootSchema?.isStructSchema() || rootSchema?.isDocumentSchema()) {
            const replacer = new JsonReplacer();
            return replacer.replaceInJson(JSON.stringify(this.buffer, replacer.createReplacer(), 0));
        }
        return this.buffer;
    }
    _write(schema, value, container) {
        const isObject = value !== null && typeof value === "object";
        const ns = NormalizedSchema.NormalizedSchema.of(schema);
        if (ns.isListSchema() && Array.isArray(value)) {
            const listMember = ns.getValueSchema();
            const out = [];
            const sparse = !!ns.getMergedTraits().sparse;
            for (const item of value) {
                if (sparse || item != null) {
                    out.push(this._write(listMember, item));
                }
            }
            return out;
        }
        else if (ns.isMapSchema() && isObject) {
            const mapMember = ns.getValueSchema();
            const out = {};
            const sparse = !!ns.getMergedTraits().sparse;
            for (const [_k, _v] of Object.entries(value)) {
                if (sparse || _v != null) {
                    out[_k] = this._write(mapMember, _v);
                }
            }
            return out;
        }
        else if (ns.isStructSchema() && isObject) {
            const out = {};
            for (const [memberName, memberSchema] of ns.structIterator()) {
                const targetKey = this.settings.jsonName ? memberSchema.getMergedTraits().jsonName ?? memberName : memberName;
                const serializableValue = this._write(memberSchema, value[memberName], ns);
                if (serializableValue !== undefined) {
                    out[targetKey] = serializableValue;
                }
            }
            return out;
        }
        if (value === null && container?.isStructSchema()) {
            return void 0;
        }
        if ((ns.isBlobSchema() && (value instanceof Uint8Array || typeof value === "string")) ||
            (ns.isDocumentSchema() && value instanceof Uint8Array)) {
            if (ns === this.rootSchema) {
                return value;
            }
            return (this.serdeContext?.base64Encoder ?? toBase64.toBase64)(value);
        }
        if ((ns.isTimestampSchema() || ns.isDocumentSchema()) && value instanceof Date) {
            const format = (0,determineTimestampFormat.determineTimestampFormat)(ns, this.settings);
            switch (format) {
                case 5:
                    return value.toISOString().replace(".000Z", "Z");
                case 6:
                    return (0,date_utils.dateToUtcString)(value);
                case 7:
                    return value.getTime() / 1000;
                default:
                    console.warn("Missing timestamp format, using epoch seconds", value);
                    return value.getTime() / 1000;
            }
        }
        if (ns.isNumericSchema() && typeof value === "number") {
            if (Math.abs(value) === Infinity || isNaN(value)) {
                return String(value);
            }
        }
        if (ns.isStringSchema()) {
            if (typeof value === "undefined" && ns.isIdempotencyToken()) {
                return (0,v4.v4)();
            }
            const mediaType = ns.getMergedTraits().mediaType;
            if (value != null && mediaType) {
                const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
                if (isJson) {
                    return lazy_json.LazyJsonString.from(value);
                }
            }
        }
        if (ns.isDocumentSchema()) {
            if (isObject) {
                const out = Array.isArray(value) ? [] : {};
                for (const [k, v] of Object.entries(value)) {
                    if (v instanceof NumericValue.NumericValue) {
                        out[k] = v;
                    }
                    else {
                        out[k] = this._write(ns, v);
                    }
                }
                return out;
            }
            else {
                return structuredClone(value);
            }
        }
        return value;
    }
}

;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonCodec.js



class JsonCodec extends ConfigurableSerdeContext.SerdeContextConfig {
    settings;
    constructor(settings) {
        super();
        this.settings = settings;
    }
    createSerializer() {
        const serializer = new JsonShapeSerializer(this.settings);
        serializer.setSerdeContext(this.serdeContext);
        return serializer;
    }
    createDeserializer() {
        const deserializer = new JsonShapeDeserializer(this.settings);
        deserializer.setSerdeContext(this.serdeContext);
        return deserializer;
    }
}

;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsRestJsonProtocol.js





class AwsRestJsonProtocol extends HttpBindingProtocol.HttpBindingProtocol {
    serializer;
    deserializer;
    codec;
    mixin = new ProtocolLib.ProtocolLib();
    constructor({ defaultNamespace }) {
        super({
            defaultNamespace,
        });
        const settings = {
            timestampFormat: {
                useTrait: true,
                default: 7,
            },
            httpBindings: true,
            jsonName: true,
        };
        this.codec = new JsonCodec(settings);
        this.serializer = new HttpInterceptingShapeSerializer.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
        this.deserializer = new HttpInterceptingShapeDeserializer.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
    }
    getShapeId() {
        return "aws.protocols#restJson1";
    }
    getPayloadCodec() {
        return this.codec;
    }
    setSerdeContext(serdeContext) {
        this.codec.setSerdeContext(serdeContext);
        super.setSerdeContext(serdeContext);
    }
    async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        const inputSchema = NormalizedSchema.NormalizedSchema.of(operationSchema.input);
        if (!request.headers["content-type"]) {
            const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
            if (contentType) {
                request.headers["content-type"] = contentType;
            }
        }
        if (request.body == null && request.headers["content-type"] === this.getDefaultContentType()) {
            request.body = "{}";
        }
        return request;
    }
    async deserializeResponse(operationSchema, context, response) {
        const output = await super.deserializeResponse(operationSchema, context, response);
        const outputSchema = NormalizedSchema.NormalizedSchema.of(operationSchema.output);
        for (const [name, member] of outputSchema.structIterator()) {
            if (member.getMemberTraits().httpPayload && !(name in output)) {
                output[name] = null;
            }
        }
        return output;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
        const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
        const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
        const ns = NormalizedSchema.NormalizedSchema.of(errorSchema);
        const message = dataObject.message ?? dataObject.Message ?? "Unknown";
        const ErrorCtor = TypeRegistry.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema) ?? Error;
        const exception = new ErrorCtor(message);
        await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
        const output = {};
        for (const [name, member] of ns.structIterator()) {
            const target = member.getMergedTraits().jsonName ?? name;
            output[name] = this.codec.createDeserializer().readObject(member, dataObject[target]);
        }
        throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
            $fault: ns.getMergedTraits().error,
            message,
        }, output), dataObject);
    }
    getDefaultContentType() {
        return "application/json";
    }
}


/***/ }),

/***/ 2961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoAuthSigner: () => (/* binding */ NoAuthSigner)
/* harmony export */ });
class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
    }
}


/***/ })

};
;
//# sourceMappingURL=11.js.map