"use strict";
exports.id = 12;
exports.ids = [12];
exports.modules = {

/***/ 2962:
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


/***/ }),

/***/ 2964:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@aws-sdk/nested-clients","version":"3.936.0","description":"Nested clients for AWS SDK packages.","main":"./dist-cjs/index.js","module":"./dist-es/index.js","types":"./dist-types/index.d.ts","scripts":{"build":"yarn lint && concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"node ../../scripts/compilation/inline nested-clients","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo","lint":"node ../../scripts/validation/submodules-linter.js --pkg nested-clients","test":"yarn g:vitest run","test:watch":"yarn g:vitest watch"},"engines":{"node":">=18.0.0"},"sideEffects":false,"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","dependencies":{"@aws-crypto/sha256-browser":"5.2.0","@aws-crypto/sha256-js":"5.2.0","@aws-sdk/core":"3.936.0","@aws-sdk/middleware-host-header":"3.936.0","@aws-sdk/middleware-logger":"3.936.0","@aws-sdk/middleware-recursion-detection":"3.936.0","@aws-sdk/middleware-user-agent":"3.936.0","@aws-sdk/region-config-resolver":"3.936.0","@aws-sdk/types":"3.936.0","@aws-sdk/util-endpoints":"3.936.0","@aws-sdk/util-user-agent-browser":"3.936.0","@aws-sdk/util-user-agent-node":"3.936.0","@smithy/config-resolver":"^4.4.3","@smithy/core":"^3.18.5","@smithy/fetch-http-handler":"^5.3.6","@smithy/hash-node":"^4.2.5","@smithy/invalid-dependency":"^4.2.5","@smithy/middleware-content-length":"^4.2.5","@smithy/middleware-endpoint":"^4.3.12","@smithy/middleware-retry":"^4.4.12","@smithy/middleware-serde":"^4.2.6","@smithy/middleware-stack":"^4.2.5","@smithy/node-config-provider":"^4.3.5","@smithy/node-http-handler":"^4.4.5","@smithy/protocol-http":"^5.3.5","@smithy/smithy-client":"^4.9.8","@smithy/types":"^4.9.0","@smithy/url-parser":"^4.2.5","@smithy/util-base64":"^4.3.0","@smithy/util-body-length-browser":"^4.2.0","@smithy/util-body-length-node":"^4.2.1","@smithy/util-defaults-mode-browser":"^4.3.11","@smithy/util-defaults-mode-node":"^4.2.14","@smithy/util-endpoints":"^3.2.5","@smithy/util-middleware":"^4.2.5","@smithy/util-retry":"^4.2.5","@smithy/util-utf8":"^4.2.0","tslib":"^2.6.2"},"devDependencies":{"concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typescript":"~5.8.3"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["./signin.d.ts","./signin.js","./sso-oidc.d.ts","./sso-oidc.js","./sts.d.ts","./sts.js","dist-*/**"],"browser":{"./dist-es/submodules/signin/runtimeConfig":"./dist-es/submodules/signin/runtimeConfig.browser","./dist-es/submodules/sso-oidc/runtimeConfig":"./dist-es/submodules/sso-oidc/runtimeConfig.browser","./dist-es/submodules/sts/runtimeConfig":"./dist-es/submodules/sts/runtimeConfig.browser"},"react-native":{},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"packages/nested-clients"},"exports":{"./package.json":"./package.json","./sso-oidc":{"types":"./dist-types/submodules/sso-oidc/index.d.ts","module":"./dist-es/submodules/sso-oidc/index.js","node":"./dist-cjs/submodules/sso-oidc/index.js","import":"./dist-es/submodules/sso-oidc/index.js","require":"./dist-cjs/submodules/sso-oidc/index.js"},"./sts":{"types":"./dist-types/submodules/sts/index.d.ts","module":"./dist-es/submodules/sts/index.js","node":"./dist-cjs/submodules/sts/index.js","import":"./dist-es/submodules/sts/index.js","require":"./dist-cjs/submodules/sts/index.js"},"./signin":{"types":"./dist-types/submodules/signin/index.d.ts","module":"./dist-es/submodules/signin/index.js","node":"./dist-cjs/submodules/signin/index.js","import":"./dist-es/submodules/signin/index.js","require":"./dist-cjs/submodules/signin/index.js"}}}');

/***/ }),

/***/ 2965:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $Command: () => (/* reexport */ command.Command),
  AssumeRoleCommand: () => (/* reexport */ AssumeRoleCommand),
  AssumeRoleWithWebIdentityCommand: () => (/* reexport */ AssumeRoleWithWebIdentityCommand),
  ExpiredTokenException: () => (/* reexport */ ExpiredTokenException),
  IDPCommunicationErrorException: () => (/* reexport */ IDPCommunicationErrorException),
  IDPRejectedClaimException: () => (/* reexport */ IDPRejectedClaimException),
  InvalidIdentityTokenException: () => (/* reexport */ InvalidIdentityTokenException),
  MalformedPolicyDocumentException: () => (/* reexport */ MalformedPolicyDocumentException),
  PackedPolicyTooLargeException: () => (/* reexport */ PackedPolicyTooLargeException),
  RegionDisabledException: () => (/* reexport */ RegionDisabledException),
  STS: () => (/* reexport */ STS),
  STSClient: () => (/* reexport */ STSClient),
  STSServiceException: () => (/* reexport */ STSServiceException),
  __Client: () => (/* reexport */ client.Client),
  decorateDefaultCredentialProvider: () => (/* reexport */ defaultRoleAssumers_decorateDefaultCredentialProvider),
  getDefaultRoleAssumer: () => (/* reexport */ defaultRoleAssumers_getDefaultRoleAssumer),
  getDefaultRoleAssumerWithWebIdentity: () => (/* reexport */ defaultRoleAssumers_getDefaultRoleAssumerWithWebIdentity)
});

// EXTERNAL MODULE: ../../node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
var dist_es = __webpack_require__(2573);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js
var loggerMiddleware = __webpack_require__(2574);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/middleware-recursion-detection/dist-es/getRecursionDetectionPlugin.js + 3 modules
var getRecursionDetectionPlugin = __webpack_require__(2575);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js
var configurations = __webpack_require__(2582);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js + 3 modules
var user_agent_middleware = __webpack_require__(2584);
// EXTERNAL MODULE: ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js + 3 modules
var resolveRegionConfig = __webpack_require__(2592);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js + 2 modules
var getHttpAuthSchemeEndpointRuleSetPlugin = __webpack_require__(2594);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js
var DefaultIdentityProviderConfig = __webpack_require__(2593);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js + 1 modules
var getHttpSigningMiddleware = __webpack_require__(2579);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/middleware/getSchemaSerdePlugin.js + 3 modules
var getSchemaSerdePlugin = __webpack_require__(2595);
// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-content-length/dist-es/index.js
var middleware_content_length_dist_es = __webpack_require__(2597);
// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js
var resolveEndpointConfig = __webpack_require__(2598);
// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-retry/dist-es/configurations.js + 5 modules
var dist_es_configurations = __webpack_require__(2614);
// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js + 2 modules
var retryMiddleware = __webpack_require__(2618);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/client.js
var client = __webpack_require__(2621);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js + 1 modules
var resolveAwsSdkSigV4Config = __webpack_require__(2623);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js
var getSmithyContext = __webpack_require__(2580);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js
var normalizeProvider = __webpack_require__(2572);
;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthSchemeProvider.js



const defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
        operation: (0,getSmithyContext.getSmithyContext)(context).operation,
        region: (await (0,normalizeProvider.normalizeProvider)(config.region)()) ||
            (() => {
                throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
            })(),
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "sts",
            region: authParameters.region,
        },
        propertiesExtractor: (config, context) => ({
            signingProperties: {
                config,
                context,
            },
        }),
    };
}
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
        schemeId: "smithy.api#noAuth",
    };
}
const defaultSTSHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "AssumeRoleWithWebIdentity": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveStsAuthConfig = (input) => Object.assign(input, {
    stsClientCtor: STSClient,
});
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = resolveStsAuthConfig(config);
    const config_1 = (0,resolveAwsSdkSigV4Config.resolveAwsSdkSigV4Config)(config_0);
    return Object.assign(config_1, {
        authSchemePreference: (0,normalizeProvider.normalizeProvider)(config.authSchemePreference ?? []),
    });
};

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/EndpointParameters.js
const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        useGlobalEndpoint: options.useGlobalEndpoint ?? false,
        defaultSigningName: "sts",
    });
};
const commonParams = {
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};

// EXTERNAL MODULE: ../../node_modules/@aws-sdk/nested-clients/package.json
var nested_clients_package = __webpack_require__(2964);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js
var emitWarningIfUnsupportedVersion = __webpack_require__(2642);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js + 2 modules
var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __webpack_require__(2643);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js + 3 modules
var AwsSdkSigV4Signer = __webpack_require__(2654);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js + 2 modules
var defaultUserAgent = __webpack_require__(2645);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js
var nodeAppIdConfigOptions = __webpack_require__(2646);
// EXTERNAL MODULE: ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js
var regionConfig_config = __webpack_require__(2647);
// EXTERNAL MODULE: ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js
var NodeUseDualstackEndpointConfigOptions = __webpack_require__(2648);
// EXTERNAL MODULE: ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js
var NodeUseFipsEndpointConfigOptions = __webpack_require__(2649);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js
var noAuth = __webpack_require__(2962);
// EXTERNAL MODULE: ../../node_modules/@smithy/hash-node/dist-es/index.js
var hash_node_dist_es = __webpack_require__(2650);
// EXTERNAL MODULE: ../../node_modules/@smithy/node-config-provider/dist-es/configLoader.js + 5 modules
var configLoader = __webpack_require__(2600);
// EXTERNAL MODULE: ../../node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js + 9 modules
var node_http_handler = __webpack_require__(2651);
// EXTERNAL MODULE: ../../node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js + 1 modules
var stream_collector = __webpack_require__(2652);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js
var calculateBodyLength = __webpack_require__(2653);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-retry/dist-es/config.js
var dist_es_config = __webpack_require__(2615);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js
var NormalizedSchema = __webpack_require__(2637);
// EXTERNAL MODULE: ../../node_modules/@smithy/protocol-http/dist-es/httpRequest.js
var httpRequest = __webpack_require__(2571);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js + 1 modules
var collect_stream_body = __webpack_require__(2662);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/HttpProtocol.js
var HttpProtocol = __webpack_require__(2664);
;// ../../node_modules/@smithy/core/dist-es/submodules/protocols/RpcProtocol.js




class RpcProtocol extends HttpProtocol.HttpProtocol {
    async serializeRequest(operationSchema, input, context) {
        const serializer = this.serializer;
        const query = {};
        const headers = {};
        const endpoint = await context.endpoint();
        const ns = NormalizedSchema.NormalizedSchema.of(operationSchema?.input);
        const schema = ns.getSchema();
        let payload;
        const request = new httpRequest.HttpRequest({
            protocol: "",
            hostname: "",
            port: undefined,
            path: "/",
            fragment: undefined,
            query: query,
            headers: headers,
            body: undefined,
        });
        if (endpoint) {
            this.updateServiceEndpoint(request, endpoint);
            this.setHostPrefix(request, operationSchema, input);
        }
        const _input = {
            ...input,
        };
        if (input) {
            const eventStreamMember = ns.getEventStreamMember();
            if (eventStreamMember) {
                if (_input[eventStreamMember]) {
                    const initialRequest = {};
                    for (const [memberName, memberSchema] of ns.structIterator()) {
                        if (memberName !== eventStreamMember && _input[memberName]) {
                            serializer.write(memberSchema, _input[memberName]);
                            initialRequest[memberName] = serializer.flush();
                        }
                    }
                    payload = await this.serializeEventStream({
                        eventStream: _input[eventStreamMember],
                        requestSchema: ns,
                        initialRequest,
                    });
                }
            }
            else {
                serializer.write(schema, _input);
                payload = serializer.flush();
            }
        }
        request.headers = headers;
        request.query = query;
        request.body = payload;
        request.method = "POST";
        return request;
    }
    async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = NormalizedSchema.NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
            const bytes = await (0,collect_stream_body.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(15, bytes));
            }
            await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
            throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
        }
        for (const header in response.headers) {
            const value = response.headers[header];
            delete response.headers[header];
            response.headers[header.toLowerCase()] = value;
        }
        const eventStreamMember = ns.getEventStreamMember();
        if (eventStreamMember) {
            dataObject[eventStreamMember] = await this.deserializeEventStream({
                response,
                responseSchema: ns,
                initialResponseContainer: dataObject,
            });
        }
        else {
            const bytes = await (0,collect_stream_body.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(ns, bytes));
            }
        }
        dataObject.$metadata = this.deserializeMetadata(response);
        return dataObject;
    }
}

// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/deref.js
var deref = __webpack_require__(2638);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js
var TypeRegistry = __webpack_require__(2640);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ProtocolLib.js
var ProtocolLib = __webpack_require__(2673);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlShapeDeserializer.js
var XmlShapeDeserializer = __webpack_require__(2678);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/serde/determineTimestampFormat.js
var determineTimestampFormat = __webpack_require__(2670);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js
var extended_encode_uri_component = __webpack_require__(2663);
// EXTERNAL MODULE: ../../node_modules/@smithy/uuid/dist-es/v4.js + 1 modules
var v4 = __webpack_require__(2620);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/serde/value/NumericValue.js
var NumericValue = __webpack_require__(2669);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js + 1 modules
var date_utils = __webpack_require__(2672);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/toBase64.js
var toBase64 = __webpack_require__(2660);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ConfigurableSerdeContext.js
var ConfigurableSerdeContext = __webpack_require__(2677);
;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/QueryShapeSerializer.js






class QueryShapeSerializer extends ConfigurableSerdeContext.SerdeContextConfig {
    settings;
    buffer;
    constructor(settings) {
        super();
        this.settings = settings;
    }
    write(schema, value, prefix = "") {
        if (this.buffer === undefined) {
            this.buffer = "";
        }
        const ns = NormalizedSchema.NormalizedSchema.of(schema);
        if (prefix && !prefix.endsWith(".")) {
            prefix += ".";
        }
        if (ns.isBlobSchema()) {
            if (typeof value === "string" || value instanceof Uint8Array) {
                this.writeKey(prefix);
                this.writeValue((this.serdeContext?.base64Encoder ?? toBase64.toBase64)(value));
            }
        }
        else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(String(value));
            }
            else if (ns.isIdempotencyToken()) {
                this.writeKey(prefix);
                this.writeValue((0,v4.v4)());
            }
        }
        else if (ns.isBigIntegerSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(String(value));
            }
        }
        else if (ns.isBigDecimalSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(value instanceof NumericValue.NumericValue ? value.string : String(value));
            }
        }
        else if (ns.isTimestampSchema()) {
            if (value instanceof Date) {
                this.writeKey(prefix);
                const format = (0,determineTimestampFormat.determineTimestampFormat)(ns, this.settings);
                switch (format) {
                    case 5:
                        this.writeValue(value.toISOString().replace(".000Z", "Z"));
                        break;
                    case 6:
                        this.writeValue((0,date_utils.dateToUtcString)(value));
                        break;
                    case 7:
                        this.writeValue(String(value.getTime() / 1000));
                        break;
                }
            }
        }
        else if (ns.isDocumentSchema()) {
            throw new Error(`@aws-sdk/core/protocols - QuerySerializer unsupported document type ${ns.getName(true)}`);
        }
        else if (ns.isListSchema()) {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    if (this.settings.serializeEmptyLists) {
                        this.writeKey(prefix);
                        this.writeValue("");
                    }
                }
                else {
                    const member = ns.getValueSchema();
                    const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
                    let i = 1;
                    for (const item of value) {
                        if (item == null) {
                            continue;
                        }
                        const suffix = this.getKey("member", member.getMergedTraits().xmlName);
                        const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
                        this.write(member, item, key);
                        ++i;
                    }
                }
            }
        }
        else if (ns.isMapSchema()) {
            if (value && typeof value === "object") {
                const keySchema = ns.getKeySchema();
                const memberSchema = ns.getValueSchema();
                const flat = ns.getMergedTraits().xmlFlattened;
                let i = 1;
                for (const [k, v] of Object.entries(value)) {
                    if (v == null) {
                        continue;
                    }
                    const keySuffix = this.getKey("key", keySchema.getMergedTraits().xmlName);
                    const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
                    const valueSuffix = this.getKey("value", memberSchema.getMergedTraits().xmlName);
                    const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
                    this.write(keySchema, k, key);
                    this.write(memberSchema, v, valueKey);
                    ++i;
                }
            }
        }
        else if (ns.isStructSchema()) {
            if (value && typeof value === "object") {
                for (const [memberName, member] of ns.structIterator()) {
                    if (value[memberName] == null && !member.isIdempotencyToken()) {
                        continue;
                    }
                    const suffix = this.getKey(memberName, member.getMergedTraits().xmlName);
                    const key = `${prefix}${suffix}`;
                    this.write(member, value[memberName], key);
                }
            }
        }
        else if (ns.isUnitSchema()) {
        }
        else {
            throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
        }
    }
    flush() {
        if (this.buffer === undefined) {
            throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
        }
        const str = this.buffer;
        delete this.buffer;
        return str;
    }
    getKey(memberName, xmlName) {
        const key = xmlName ?? memberName;
        if (this.settings.capitalizeKeys) {
            return key[0].toUpperCase() + key.slice(1);
        }
        return key;
    }
    writeKey(key) {
        if (key.endsWith(".")) {
            key = key.slice(0, key.length - 1);
        }
        this.buffer += `&${(0,extended_encode_uri_component.extendedEncodeURIComponent)(key)}=`;
    }
    writeValue(value) {
        this.buffer += (0,extended_encode_uri_component.extendedEncodeURIComponent)(value);
    }
}

;// ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/AwsQueryProtocol.js





class AwsQueryProtocol extends RpcProtocol {
    options;
    serializer;
    deserializer;
    mixin = new ProtocolLib.ProtocolLib();
    constructor(options) {
        super({
            defaultNamespace: options.defaultNamespace,
        });
        this.options = options;
        const settings = {
            timestampFormat: {
                useTrait: true,
                default: 5,
            },
            httpBindings: false,
            xmlNamespace: options.xmlNamespace,
            serviceNamespace: options.defaultNamespace,
            serializeEmptyLists: true,
        };
        this.serializer = new QueryShapeSerializer(settings);
        this.deserializer = new XmlShapeDeserializer.XmlShapeDeserializer(settings);
    }
    getShapeId() {
        return "aws.protocols#awsQuery";
    }
    setSerdeContext(serdeContext) {
        this.serializer.setSerdeContext(serdeContext);
        this.deserializer.setSerdeContext(serdeContext);
    }
    getPayloadCodec() {
        throw new Error("AWSQuery protocol has no payload codec.");
    }
    async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        if (!request.path.endsWith("/")) {
            request.path += "/";
        }
        Object.assign(request.headers, {
            "content-type": `application/x-www-form-urlencoded`,
        });
        if ((0,deref.deref)(operationSchema.input) === "unit" || !request.body) {
            request.body = "";
        }
        const action = operationSchema.name.split("#")[1] ?? operationSchema.name;
        request.body = `Action=${action}&Version=${this.options.version}` + request.body;
        if (request.body.endsWith("&")) {
            request.body = request.body.slice(-1);
        }
        return request;
    }
    async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = NormalizedSchema.NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
            const bytes = await (0,collect_stream_body.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(15, bytes));
            }
            await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        }
        for (const header in response.headers) {
            const value = response.headers[header];
            delete response.headers[header];
            response.headers[header.toLowerCase()] = value;
        }
        const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
        const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : undefined;
        const bytes = await (0,collect_stream_body.collectBody)(response.body, context);
        if (bytes.byteLength > 0) {
            Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
        }
        const output = {
            $metadata: this.deserializeMetadata(response),
            ...dataObject,
        };
        return output;
    }
    useNestedResult() {
        return true;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
        const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
        const errorData = this.loadQueryError(dataObject);
        const message = this.loadQueryErrorMessage(dataObject);
        errorData.message = message;
        errorData.Error = {
            Type: errorData.Type,
            Code: errorData.Code,
            Message: message,
        };
        const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, (registry, errorName) => {
            try {
                return registry.getSchema(errorName);
            }
            catch (e) {
                return registry.find((schema) => NormalizedSchema.NormalizedSchema.of(schema).getMergedTraits().awsQueryError?.[0] === errorName);
            }
        });
        const ns = NormalizedSchema.NormalizedSchema.of(errorSchema);
        const ErrorCtor = TypeRegistry.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema) ?? Error;
        const exception = new ErrorCtor(message);
        const output = {
            Error: errorData.Error,
        };
        for (const [name, member] of ns.structIterator()) {
            const target = member.getMergedTraits().xmlName ?? name;
            const value = errorData[target] ?? dataObject[target];
            output[name] = this.deserializer.readSchema(member, value);
        }
        throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
            $fault: ns.getMergedTraits().error,
            message,
        }, output), dataObject);
    }
    loadQueryErrorCode(output, data) {
        const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
        if (code !== undefined) {
            return code;
        }
        if (output.statusCode == 404) {
            return "NotFound";
        }
    }
    loadQueryError(data) {
        return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
    }
    loadQueryErrorMessage(data) {
        const errorData = this.loadQueryError(data);
        return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
    }
    getDefaultContentType() {
        return "application/x-www-form-urlencoded";
    }
}

// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js
var NoOpLogger = __webpack_require__(2619);
// EXTERNAL MODULE: ../../node_modules/@smithy/url-parser/dist-es/index.js + 1 modules
var url_parser_dist_es = __webpack_require__(2589);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/fromBase64.js
var fromBase64 = __webpack_require__(2659);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.js
var fromUtf8 = __webpack_require__(2628);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-utf8/dist-es/toUtf8.js
var toUtf8 = __webpack_require__(2661);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/util-endpoints/dist-es/index.js + 15 modules
var util_endpoints_dist_es = __webpack_require__(2585);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js
var EndpointCache = __webpack_require__(2633);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js + 24 modules
var resolveEndpoint = __webpack_require__(2590);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js
var customEndpointFunctions = __webpack_require__(2586);
;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/ruleset.js
const F = "required", G = "type", H = "fn", I = "argv", J = "ref";
const a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = { [F]: false, [G]: "string" }, n = { [F]: true, "default": false, [G]: "boolean" }, o = { [J]: "Endpoint" }, p = { [H]: "isSet", [I]: [{ [J]: "Region" }] }, q = { [J]: "Region" }, r = { [H]: "aws.partition", [I]: [q], "assign": "PartitionResult" }, s = { [J]: "UseFIPS" }, t = { [J]: "UseDualStack" }, u = { "url": "https://sts.amazonaws.com", "properties": { "authSchemes": [{ "name": e, "signingName": f, "signingRegion": g }] }, "headers": {} }, v = {}, w = { "conditions": [{ [H]: d, [I]: [q, "aws-global"] }], [h]: u, [G]: h }, x = { [H]: c, [I]: [s, true] }, y = { [H]: c, [I]: [t, true] }, z = { [H]: l, [I]: [{ [J]: "PartitionResult" }, "supportsFIPS"] }, A = { [J]: "PartitionResult" }, B = { [H]: c, [I]: [true, { [H]: l, [I]: [A, "supportsDualStack"] }] }, C = [{ [H]: "isSet", [I]: [o] }], D = [x], E = [y];
const _data = { version: "1.0", parameters: { Region: m, UseDualStack: n, UseFIPS: n, Endpoint: m, UseGlobalEndpoint: n }, rules: [{ conditions: [{ [H]: c, [I]: [{ [J]: "UseGlobalEndpoint" }, b] }, { [H]: "not", [I]: C }, p, r, { [H]: c, [I]: [s, a] }, { [H]: c, [I]: [t, a] }], rules: [{ conditions: [{ [H]: d, [I]: [q, "ap-northeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-south-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-2"] }], endpoint: u, [G]: h }, w, { conditions: [{ [H]: d, [I]: [q, "ca-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-north-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-3"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "sa-east-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, g] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-east-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-2"] }], endpoint: u, [G]: h }, { endpoint: { url: i, properties: { authSchemes: [{ name: e, signingName: f, signingRegion: "{Region}" }] }, headers: v }, [G]: h }], [G]: j }, { conditions: C, rules: [{ conditions: D, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [G]: k }, { conditions: E, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [G]: k }, { endpoint: { url: o, properties: v, headers: v }, [G]: h }], [G]: j }, { conditions: [p], rules: [{ conditions: [r], rules: [{ conditions: [x, y], rules: [{ conditions: [{ [H]: c, [I]: [b, z] }, B], rules: [{ endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [G]: k }], [G]: j }, { conditions: D, rules: [{ conditions: [{ [H]: c, [I]: [z, b] }], rules: [{ conditions: [{ [H]: d, [I]: [{ [H]: l, [I]: [A, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: v, headers: v }, [G]: h }, { endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS is enabled but this partition does not support FIPS", [G]: k }], [G]: j }, { conditions: E, rules: [{ conditions: [B], rules: [{ endpoint: { url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "DualStack is enabled but this partition does not support DualStack", [G]: k }], [G]: j }, w, { endpoint: { url: i, properties: v, headers: v }, [G]: h }], [G]: j }], [G]: j }, { error: "Invalid Configuration: Missing Region", [G]: k }] };
const ruleSet = _data;

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/endpointResolver.js



const cache = new EndpointCache.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,resolveEndpoint.resolveEndpoint)(ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
customEndpointFunctions.customEndpointFunctions.aws = util_endpoints_dist_es.awsEndpointFunctions;

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.shared.js









const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2011-06-15",
        base64Decoder: config?.base64Decoder ?? fromBase64.fromBase64,
        base64Encoder: config?.base64Encoder ?? toBase64.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSTSHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new AwsSdkSigV4Signer.AwsSdkSigV4Signer(),
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                signer: new noAuth.NoAuthSigner(),
            },
        ],
        logger: config?.logger ?? new NoOpLogger.NoOpLogger(),
        protocol: config?.protocol ??
            new AwsQueryProtocol({
                defaultNamespace: "com.amazonaws.sts",
                xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
                version: "2011-06-15",
            }),
        serviceId: config?.serviceId ?? "STS",
        urlParser: config?.urlParser ?? url_parser_dist_es.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? fromUtf8.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? toUtf8.toUtf8,
    };
};

// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/defaults-mode.js
var defaults_mode = __webpack_require__(2679);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js + 2 modules
var resolveDefaultsModeConfig = __webpack_require__(2680);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js
var dist_es_emitWarningIfUnsupportedVersion = __webpack_require__(2681);
;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.js















const runtimeConfig_getRuntimeConfig = (config) => {
    (0,dist_es_emitWarningIfUnsupportedVersion.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0,resolveDefaultsModeConfig.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(defaults_mode.loadConfigsForDefaultMode);
    const clientSharedValues = getRuntimeConfig(config);
    (0,emitWarningIfUnsupportedVersion.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger,
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? (0,configLoader.loadConfig)(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength.calculateBodyLength,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,defaultUserAgent.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: nested_clients_package.version }),
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") ||
                    (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
                signer: new AwsSdkSigV4Signer.AwsSdkSigV4Signer(),
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                signer: new noAuth.NoAuthSigner(),
            },
        ],
        maxAttempts: config?.maxAttempts ?? (0,configLoader.loadConfig)(dist_es_configurations.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
        region: config?.region ??
            (0,configLoader.loadConfig)(regionConfig_config.NODE_REGION_CONFIG_OPTIONS, { ...regionConfig_config.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
        requestHandler: node_http_handler.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ??
            (0,configLoader.loadConfig)({
                ...dist_es_configurations.NODE_RETRY_MODE_CONFIG_OPTIONS,
                default: async () => (await defaultConfigProvider()).retryMode || dist_es_config.DEFAULT_RETRY_MODE,
            }, config),
        sha256: config?.sha256 ?? hash_node_dist_es.Hash.bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? stream_collector.streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0,configLoader.loadConfig)(NodeUseDualstackEndpointConfigOptions.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0,configLoader.loadConfig)(NodeUseFipsEndpointConfigOptions.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0,configLoader.loadConfig)(nodeAppIdConfigOptions.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig),
    };
};

// EXTERNAL MODULE: ../../node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js
var dist_es_extensions = __webpack_require__(2682);
// EXTERNAL MODULE: ../../node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js
var httpExtensionConfiguration = __webpack_require__(2683);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js + 3 modules
var defaultExtensionConfiguration = __webpack_require__(2684);
;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthExtensionConfiguration.js
const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
        setHttpAuthScheme(httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            }
            else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes() {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
            return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
            _credentials = credentials;
        },
        credentials() {
            return _credentials;
        },
    };
};
const resolveHttpAuthRuntimeConfig = (config) => {
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials(),
    };
};

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeExtensions.js




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,dist_es_extensions.getAwsRegionExtensionConfiguration)(runtimeConfig), (0,defaultExtensionConfiguration.getDefaultExtensionConfiguration)(runtimeConfig), (0,httpExtensionConfiguration.getHttpHandlerExtensionConfiguration)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,dist_es_extensions.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0,defaultExtensionConfiguration.resolveDefaultRuntimeConfig)(extensionConfiguration), (0,httpExtensionConfiguration.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js
















class STSClient extends client.Client {
    config;
    constructor(...[configuration]) {
        const _config_0 = runtimeConfig_getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = (0,configurations.resolveUserAgentConfig)(_config_1);
        const _config_3 = (0,dist_es_configurations.resolveRetryConfig)(_config_2);
        const _config_4 = (0,resolveRegionConfig.resolveRegionConfig)(_config_3);
        const _config_5 = (0,dist_es.resolveHostHeaderConfig)(_config_4);
        const _config_6 = (0,resolveEndpointConfig.resolveEndpointConfig)(_config_5);
        const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use((0,getSchemaSerdePlugin.getSchemaSerdePlugin)(this.config));
        this.middlewareStack.use((0,user_agent_middleware.getUserAgentPlugin)(this.config));
        this.middlewareStack.use((0,retryMiddleware.getRetryPlugin)(this.config));
        this.middlewareStack.use((0,middleware_content_length_dist_es.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0,dist_es.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0,loggerMiddleware.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0,getRecursionDetectionPlugin.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0,getHttpAuthSchemeEndpointRuleSetPlugin.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
            httpAuthSchemeParametersProvider: defaultSTSHttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig.DefaultIdentityProviderConfig({
                "aws.auth#sigv4": config.credentials,
            }),
        }));
        this.middlewareStack.use((0,getHttpSigningMiddleware.getHttpSigningPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}

// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js
var create_aggregated_client = __webpack_require__(2685);
// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js + 5 modules
var getEndpointPlugin = __webpack_require__(2635);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/command.js + 1 modules
var command = __webpack_require__(2636);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/exceptions.js
var exceptions = __webpack_require__(2641);
;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js


class STSServiceException extends exceptions.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, STSServiceException.prototype);
    }
}

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/errors.js

class ExpiredTokenException extends STSServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
}
class MalformedPolicyDocumentException extends STSServiceException {
    name = "MalformedPolicyDocumentException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "MalformedPolicyDocumentException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
    }
}
class PackedPolicyTooLargeException extends STSServiceException {
    name = "PackedPolicyTooLargeException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "PackedPolicyTooLargeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
    }
}
class RegionDisabledException extends STSServiceException {
    name = "RegionDisabledException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "RegionDisabledException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, RegionDisabledException.prototype);
    }
}
class IDPRejectedClaimException extends STSServiceException {
    name = "IDPRejectedClaimException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IDPRejectedClaimException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
    }
}
class InvalidIdentityTokenException extends STSServiceException {
    name = "InvalidIdentityTokenException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidIdentityTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
    }
}
class IDPCommunicationErrorException extends STSServiceException {
    name = "IDPCommunicationErrorException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IDPCommunicationErrorException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
    }
}

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/schemas/schemas_0.js
const _A = "Arn";
const _AKI = "AccessKeyId";
const _AR = "AssumeRole";
const _ARI = "AssumedRoleId";
const _ARR = "AssumeRoleRequest";
const _ARRs = "AssumeRoleResponse";
const _ARU = "AssumedRoleUser";
const _ARWWI = "AssumeRoleWithWebIdentity";
const _ARWWIR = "AssumeRoleWithWebIdentityRequest";
const _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
const _Au = "Audience";
const _C = "Credentials";
const _CA = "ContextAssertion";
const _DS = "DurationSeconds";
const _E = "Expiration";
const _EI = "ExternalId";
const _ETE = "ExpiredTokenException";
const _IDPCEE = "IDPCommunicationErrorException";
const _IDPRCE = "IDPRejectedClaimException";
const _IITE = "InvalidIdentityTokenException";
const _K = "Key";
const _MPDE = "MalformedPolicyDocumentException";
const _P = "Policy";
const _PA = "PolicyArns";
const _PAr = "ProviderArn";
const _PC = "ProvidedContexts";
const _PCLT = "ProvidedContextsListType";
const _PCr = "ProvidedContext";
const _PDT = "PolicyDescriptorType";
const _PI = "ProviderId";
const _PPS = "PackedPolicySize";
const _PPTLE = "PackedPolicyTooLargeException";
const _Pr = "Provider";
const _RA = "RoleArn";
const _RDE = "RegionDisabledException";
const _RSN = "RoleSessionName";
const _SAK = "SecretAccessKey";
const _SFWIT = "SubjectFromWebIdentityToken";
const _SI = "SourceIdentity";
const _SN = "SerialNumber";
const _ST = "SessionToken";
const _T = "Tags";
const _TC = "TokenCode";
const _TTK = "TransitiveTagKeys";
const _Ta = "Tag";
const _V = "Value";
const _WIT = "WebIdentityToken";
const _a = "arn";
const _aKST = "accessKeySecretType";
const _aQE = "awsQueryError";
const _c = "client";
const _cTT = "clientTokenType";
const _e = "error";
const _hE = "httpError";
const _m = "message";
const _pDLT = "policyDescriptorListType";
const _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
const _tLT = "tagListType";
const n0 = "com.amazonaws.sts";



var accessKeySecretType = [0, n0, _aKST, 8, 0];
var clientTokenType = [0, n0, _cTT, 8, 0];
var AssumedRoleUser = [3, n0, _ARU, 0, [_ARI, _A], [0, 0]];
var AssumeRoleRequest = [
    3,
    n0,
    _ARR,
    0,
    [_RA, _RSN, _PA, _P, _DS, _T, _TTK, _EI, _SN, _TC, _SI, _PC],
    [0, 0, () => policyDescriptorListType, 0, 1, () => tagListType, 64 | 0, 0, 0, 0, 0, () => ProvidedContextsListType],
];
var AssumeRoleResponse = [
    3,
    n0,
    _ARRs,
    0,
    [_C, _ARU, _PPS, _SI],
    [[() => Credentials, 0], () => AssumedRoleUser, 1, 0],
];
var AssumeRoleWithWebIdentityRequest = [
    3,
    n0,
    _ARWWIR,
    0,
    [_RA, _RSN, _WIT, _PI, _PA, _P, _DS],
    [0, 0, [() => clientTokenType, 0], 0, () => policyDescriptorListType, 0, 1],
];
var AssumeRoleWithWebIdentityResponse = [
    3,
    n0,
    _ARWWIRs,
    0,
    [_C, _SFWIT, _ARU, _PPS, _Pr, _Au, _SI],
    [[() => Credentials, 0], 0, () => AssumedRoleUser, 1, 0, 0, 0],
];
var Credentials = [
    3,
    n0,
    _C,
    0,
    [_AKI, _SAK, _ST, _E],
    [0, [() => accessKeySecretType, 0], 0, 4],
];
var schemas_0_ExpiredTokenException = [
    -3,
    n0,
    _ETE,
    {
        [_e]: _c,
        [_hE]: 400,
        [_aQE]: [`ExpiredTokenException`, 400],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_ExpiredTokenException, ExpiredTokenException);
var schemas_0_IDPCommunicationErrorException = [
    -3,
    n0,
    _IDPCEE,
    {
        [_e]: _c,
        [_hE]: 400,
        [_aQE]: [`IDPCommunicationError`, 400],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_IDPCommunicationErrorException, IDPCommunicationErrorException);
var schemas_0_IDPRejectedClaimException = [
    -3,
    n0,
    _IDPRCE,
    {
        [_e]: _c,
        [_hE]: 403,
        [_aQE]: [`IDPRejectedClaim`, 403],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_IDPRejectedClaimException, IDPRejectedClaimException);
var schemas_0_InvalidIdentityTokenException = [
    -3,
    n0,
    _IITE,
    {
        [_e]: _c,
        [_hE]: 400,
        [_aQE]: [`InvalidIdentityToken`, 400],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_InvalidIdentityTokenException, InvalidIdentityTokenException);
var schemas_0_MalformedPolicyDocumentException = [
    -3,
    n0,
    _MPDE,
    {
        [_e]: _c,
        [_hE]: 400,
        [_aQE]: [`MalformedPolicyDocument`, 400],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_MalformedPolicyDocumentException, MalformedPolicyDocumentException);
var schemas_0_PackedPolicyTooLargeException = [
    -3,
    n0,
    _PPTLE,
    {
        [_e]: _c,
        [_hE]: 400,
        [_aQE]: [`PackedPolicyTooLarge`, 400],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_PackedPolicyTooLargeException, PackedPolicyTooLargeException);
var PolicyDescriptorType = [3, n0, _PDT, 0, [_a], [0]];
var ProvidedContext = [3, n0, _PCr, 0, [_PAr, _CA], [0, 0]];
var schemas_0_RegionDisabledException = [
    -3,
    n0,
    _RDE,
    {
        [_e]: _c,
        [_hE]: 403,
        [_aQE]: [`RegionDisabledException`, 403],
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_RegionDisabledException, RegionDisabledException);
var Tag = [3, n0, _Ta, 0, [_K, _V], [0, 0]];
var schemas_0_STSServiceException = [-3, _s, "STSServiceException", 0, [], []];
TypeRegistry.TypeRegistry.for(_s).registerError(schemas_0_STSServiceException, STSServiceException);
var policyDescriptorListType = [1, n0, _pDLT, 0, () => PolicyDescriptorType];
var ProvidedContextsListType = [1, n0, _PCLT, 0, () => ProvidedContext];
var tagKeyListType = 64 | 0;
var tagListType = [1, n0, _tLT, 0, () => Tag];
var AssumeRole = [9, n0, _AR, 0, () => AssumeRoleRequest, () => AssumeRoleResponse];
var AssumeRoleWithWebIdentity = [
    9,
    n0,
    _ARWWI,
    0,
    () => AssumeRoleWithWebIdentityRequest,
    () => AssumeRoleWithWebIdentityResponse,
];

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js





class AssumeRoleCommand extends command.Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,getEndpointPlugin.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("AWSSecurityTokenServiceV20110615", "AssumeRole", {})
    .n("STSClient", "AssumeRoleCommand")
    .sc(AssumeRole)
    .build() {
}

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js





class AssumeRoleWithWebIdentityCommand extends command.Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,getEndpointPlugin.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {})
    .n("STSClient", "AssumeRoleWithWebIdentityCommand")
    .sc(AssumeRoleWithWebIdentity)
    .build() {
}

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STS.js




const commands = {
    AssumeRoleCommand: AssumeRoleCommand,
    AssumeRoleWithWebIdentityCommand: AssumeRoleWithWebIdentityCommand,
};
class STS extends STSClient {
}
(0,create_aggregated_client.createAggregatedClient)(commands, STS);

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js



// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
var setCredentialFeature = __webpack_require__(2624);
;// ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/stsRegionDefaultResolver.js


function stsRegionDefaultResolver(loaderConfig = {}) {
    return (0,configLoader.loadConfig)({
        ...regionConfig_config.NODE_REGION_CONFIG_OPTIONS,
        async default() {
            if (!warning.silence) {
                console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");
            }
            return "us-east-1";
        },
    }, { ...regionConfig_config.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig });
}
const warning = {
    silence: false,
};

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultStsRoleAssumers.js




const getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
    if (typeof assumedRoleUser?.Arn === "string") {
        const arnComponents = assumedRoleUser.Arn.split(":");
        if (arnComponents.length > 4 && arnComponents[4] !== "") {
            return arnComponents[4];
        }
    }
    return undefined;
};
const resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
    const region = typeof _region === "function" ? await _region() : _region;
    const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
    const stsDefaultRegion = await stsRegionDefaultResolver(loaderConfig)();
    credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
    return region ?? parentRegion ?? stsDefaultRegion;
};
const getDefaultRoleAssumer = (stsOptions, STSClient) => {
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params) => {
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId, } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
                logger,
                profile,
            });
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                ...stsOptions,
                userAgentAppId,
                profile,
                credentialDefaultProvider: () => async () => closureSourceCreds,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger,
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...(Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope }),
            ...(accountId && { accountId }),
        };
        (0,setCredentialFeature.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
        return credentials;
    };
};
const getDefaultRoleAssumerWithWebIdentity = (stsOptions, STSClient) => {
    let stsClient;
    return async (params) => {
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId, } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
                logger,
                profile,
            });
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                ...stsOptions,
                userAgentAppId,
                profile,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger,
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...(Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope }),
            ...(accountId && { accountId }),
        };
        if (accountId) {
            (0,setCredentialFeature.setCredentialFeature)(credentials, "RESOLVED_ACCOUNT_ID", "T");
        }
        (0,setCredentialFeature.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
        return credentials;
    };
};
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: getDefaultRoleAssumer(input, input.stsClientCtor),
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input, input.stsClientCtor),
    ...input,
});
const isH2 = (requestHandler) => {
    return requestHandler?.metadata?.handlerProtocol === "h2";
};

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultRoleAssumers.js


const getCustomizableStsClientCtor = (baseCtor, customizations) => {
    if (!customizations)
        return baseCtor;
    else
        return class CustomizableSTSClient extends baseCtor {
            constructor(config) {
                super(config);
                for (const customization of customizations) {
                    this.middlewareStack.use(customization);
                }
            }
        };
};
const defaultRoleAssumers_getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
const defaultRoleAssumers_getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity(stsOptions, getCustomizableStsClientCtor(STSClient, stsPlugins));
const defaultRoleAssumers_decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: defaultRoleAssumers_getDefaultRoleAssumer(input),
    roleAssumerWithWebIdentity: defaultRoleAssumers_getDefaultRoleAssumerWithWebIdentity(input),
    ...input,
});

;// ../../node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/index.js








/***/ })

};
;
//# sourceMappingURL=12.js.map