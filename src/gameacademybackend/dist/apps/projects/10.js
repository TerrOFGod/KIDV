"use strict";
exports.id = 10;
exports.ids = [10];
exports.modules = {

/***/ 2960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  GetRoleCredentialsCommand: () => (/* reexport */ GetRoleCredentialsCommand),
  SSOClient: () => (/* reexport */ SSOClient)
});

// EXTERNAL MODULE: ../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js + 5 modules
var getEndpointPlugin = __webpack_require__(2635);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/command.js + 1 modules
var command = __webpack_require__(2636);
;// ../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/EndpointParameters.js
const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "awsssoportal",
    });
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};

// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js
var TypeRegistry = __webpack_require__(2640);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/exceptions.js
var exceptions = __webpack_require__(2641);
;// ../../node_modules/@aws-sdk/client-sso/dist-es/models/SSOServiceException.js


class SSOServiceException extends exceptions.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOServiceException.prototype);
    }
}

;// ../../node_modules/@aws-sdk/client-sso/dist-es/models/errors.js

class InvalidRequestException extends SSOServiceException {
    name = "InvalidRequestException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
    }
}
class ResourceNotFoundException extends SSOServiceException {
    name = "ResourceNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
class TooManyRequestsException extends SSOServiceException {
    name = "TooManyRequestsException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TooManyRequestsException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
}
class UnauthorizedException extends SSOServiceException {
    name = "UnauthorizedException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "UnauthorizedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}

;// ../../node_modules/@aws-sdk/client-sso/dist-es/schemas/schemas_0.js
const _AI = "AccountInfo";
const _ALT = "AccountListType";
const _ATT = "AccessTokenType";
const _GRC = "GetRoleCredentials";
const _GRCR = "GetRoleCredentialsRequest";
const _GRCRe = "GetRoleCredentialsResponse";
const _IRE = "InvalidRequestException";
const _L = "Logout";
const _LA = "ListAccounts";
const _LAR = "ListAccountsRequest";
const _LARR = "ListAccountRolesRequest";
const _LARRi = "ListAccountRolesResponse";
const _LARi = "ListAccountsResponse";
const _LARis = "ListAccountRoles";
const _LR = "LogoutRequest";
const _RC = "RoleCredentials";
const _RI = "RoleInfo";
const _RLT = "RoleListType";
const _RNFE = "ResourceNotFoundException";
const _SAKT = "SecretAccessKeyType";
const _STT = "SessionTokenType";
const _TMRE = "TooManyRequestsException";
const _UE = "UnauthorizedException";
const _aI = "accountId";
const _aKI = "accessKeyId";
const _aL = "accountList";
const _aN = "accountName";
const _aT = "accessToken";
const _ai = "account_id";
const _c = "client";
const _e = "error";
const _eA = "emailAddress";
const _ex = "expiration";
const _h = "http";
const _hE = "httpError";
const _hH = "httpHeader";
const _hQ = "httpQuery";
const _m = "message";
const _mR = "maxResults";
const _mr = "max_result";
const _nT = "nextToken";
const _nt = "next_token";
const _rC = "roleCredentials";
const _rL = "roleList";
const _rN = "roleName";
const _rn = "role_name";
const _s = "smithy.ts.sdk.synthetic.com.amazonaws.sso";
const _sAK = "secretAccessKey";
const _sT = "sessionToken";
const _xasbt = "x-amz-sso_bearer_token";
const n0 = "com.amazonaws.sso";



var AccessTokenType = [0, n0, _ATT, 8, 0];
var SecretAccessKeyType = [0, n0, _SAKT, 8, 0];
var SessionTokenType = [0, n0, _STT, 8, 0];
var AccountInfo = [3, n0, _AI, 0, [_aI, _aN, _eA], [0, 0, 0]];
var GetRoleCredentialsRequest = [
    3,
    n0,
    _GRCR,
    0,
    [_rN, _aI, _aT],
    [
        [
            0,
            {
                [_hQ]: _rn,
            },
        ],
        [
            0,
            {
                [_hQ]: _ai,
            },
        ],
        [
            () => AccessTokenType,
            {
                [_hH]: _xasbt,
            },
        ],
    ],
];
var GetRoleCredentialsResponse = [3, n0, _GRCRe, 0, [_rC], [[() => RoleCredentials, 0]]];
var schemas_0_InvalidRequestException = [
    -3,
    n0,
    _IRE,
    {
        [_e]: _c,
        [_hE]: 400,
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_InvalidRequestException, InvalidRequestException);
var ListAccountRolesRequest = [
    3,
    n0,
    _LARR,
    0,
    [_nT, _mR, _aT, _aI],
    [
        [
            0,
            {
                [_hQ]: _nt,
            },
        ],
        [
            1,
            {
                [_hQ]: _mr,
            },
        ],
        [
            () => AccessTokenType,
            {
                [_hH]: _xasbt,
            },
        ],
        [
            0,
            {
                [_hQ]: _ai,
            },
        ],
    ],
];
var ListAccountRolesResponse = [3, n0, _LARRi, 0, [_nT, _rL], [0, () => RoleListType]];
var ListAccountsRequest = [
    3,
    n0,
    _LAR,
    0,
    [_nT, _mR, _aT],
    [
        [
            0,
            {
                [_hQ]: _nt,
            },
        ],
        [
            1,
            {
                [_hQ]: _mr,
            },
        ],
        [
            () => AccessTokenType,
            {
                [_hH]: _xasbt,
            },
        ],
    ],
];
var ListAccountsResponse = [3, n0, _LARi, 0, [_nT, _aL], [0, () => AccountListType]];
var LogoutRequest = [
    3,
    n0,
    _LR,
    0,
    [_aT],
    [
        [
            () => AccessTokenType,
            {
                [_hH]: _xasbt,
            },
        ],
    ],
];
var schemas_0_ResourceNotFoundException = [
    -3,
    n0,
    _RNFE,
    {
        [_e]: _c,
        [_hE]: 404,
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_ResourceNotFoundException, ResourceNotFoundException);
var RoleCredentials = [
    3,
    n0,
    _RC,
    0,
    [_aKI, _sAK, _sT, _ex],
    [0, [() => SecretAccessKeyType, 0], [() => SessionTokenType, 0], 1],
];
var RoleInfo = [3, n0, _RI, 0, [_rN, _aI], [0, 0]];
var schemas_0_TooManyRequestsException = [
    -3,
    n0,
    _TMRE,
    {
        [_e]: _c,
        [_hE]: 429,
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_TooManyRequestsException, TooManyRequestsException);
var schemas_0_UnauthorizedException = [
    -3,
    n0,
    _UE,
    {
        [_e]: _c,
        [_hE]: 401,
    },
    [_m],
    [0],
];
TypeRegistry.TypeRegistry.for(n0).registerError(schemas_0_UnauthorizedException, UnauthorizedException);
var __Unit = "unit";
var schemas_0_SSOServiceException = [-3, _s, "SSOServiceException", 0, [], []];
TypeRegistry.TypeRegistry.for(_s).registerError(schemas_0_SSOServiceException, SSOServiceException);
var AccountListType = [1, n0, _ALT, 0, () => AccountInfo];
var RoleListType = [1, n0, _RLT, 0, () => RoleInfo];
var GetRoleCredentials = [
    9,
    n0,
    _GRC,
    {
        [_h]: ["GET", "/federation/credentials", 200],
    },
    () => GetRoleCredentialsRequest,
    () => GetRoleCredentialsResponse,
];
var ListAccountRoles = [
    9,
    n0,
    _LARis,
    {
        [_h]: ["GET", "/assignment/roles", 200],
    },
    () => ListAccountRolesRequest,
    () => ListAccountRolesResponse,
];
var ListAccounts = [
    9,
    n0,
    _LA,
    {
        [_h]: ["GET", "/assignment/accounts", 200],
    },
    () => ListAccountsRequest,
    () => ListAccountsResponse,
];
var Logout = [
    9,
    n0,
    _L,
    {
        [_h]: ["POST", "/logout", 200],
    },
    () => LogoutRequest,
    () => __Unit,
];

;// ../../node_modules/@aws-sdk/client-sso/dist-es/commands/GetRoleCredentialsCommand.js





class GetRoleCredentialsCommand extends command.Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,getEndpointPlugin.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("SWBPortalService", "GetRoleCredentials", {})
    .n("SSOClient", "GetRoleCredentialsCommand")
    .sc(GetRoleCredentials)
    .build() {
}

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
;// ../../node_modules/@aws-sdk/client-sso/dist-es/auth/httpAuthSchemeProvider.js


const defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
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
            name: "awsssoportal",
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
const defaultSSOHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "GetRoleCredentials": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        case "ListAccountRoles": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        case "ListAccounts": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        case "Logout": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0,resolveAwsSdkSigV4Config.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
        authSchemePreference: (0,normalizeProvider.normalizeProvider)(config.authSchemePreference ?? []),
    });
};

;// ../../node_modules/@aws-sdk/client-sso/package.json
const package_namespaceObject = /*#__PURE__*/JSON.parse('{"name":"@aws-sdk/client-sso","description":"AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native","version":"3.936.0","scripts":{"build":"concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"node ../../scripts/compilation/inline client-sso","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo","extract:docs":"api-extractor run --local","generate:client":"node ../../scripts/generate-clients/single-service --solo sso"},"main":"./dist-cjs/index.js","types":"./dist-types/index.d.ts","module":"./dist-es/index.js","sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"5.2.0","@aws-crypto/sha256-js":"5.2.0","@aws-sdk/core":"3.936.0","@aws-sdk/middleware-host-header":"3.936.0","@aws-sdk/middleware-logger":"3.936.0","@aws-sdk/middleware-recursion-detection":"3.936.0","@aws-sdk/middleware-user-agent":"3.936.0","@aws-sdk/region-config-resolver":"3.936.0","@aws-sdk/types":"3.936.0","@aws-sdk/util-endpoints":"3.936.0","@aws-sdk/util-user-agent-browser":"3.936.0","@aws-sdk/util-user-agent-node":"3.936.0","@smithy/config-resolver":"^4.4.3","@smithy/core":"^3.18.5","@smithy/fetch-http-handler":"^5.3.6","@smithy/hash-node":"^4.2.5","@smithy/invalid-dependency":"^4.2.5","@smithy/middleware-content-length":"^4.2.5","@smithy/middleware-endpoint":"^4.3.12","@smithy/middleware-retry":"^4.4.12","@smithy/middleware-serde":"^4.2.6","@smithy/middleware-stack":"^4.2.5","@smithy/node-config-provider":"^4.3.5","@smithy/node-http-handler":"^4.4.5","@smithy/protocol-http":"^5.3.5","@smithy/smithy-client":"^4.9.8","@smithy/types":"^4.9.0","@smithy/url-parser":"^4.2.5","@smithy/util-base64":"^4.3.0","@smithy/util-body-length-browser":"^4.2.0","@smithy/util-body-length-node":"^4.2.1","@smithy/util-defaults-mode-browser":"^4.3.11","@smithy/util-defaults-mode-node":"^4.2.14","@smithy/util-endpoints":"^3.2.5","@smithy/util-middleware":"^4.2.5","@smithy/util-retry":"^4.2.5","@smithy/util-utf8":"^4.2.0","tslib":"^2.6.2"},"devDependencies":{"@tsconfig/node18":"18.2.4","@types/node":"^18.19.69","concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typescript":"~5.8.3"},"engines":{"node":">=18.0.0"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["dist-*/**"],"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","browser":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.browser"},"react-native":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.native"},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-sso"}}');
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js
var emitWarningIfUnsupportedVersion = __webpack_require__(2642);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js + 2 modules
var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __webpack_require__(2643);
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
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js + 3 modules
var AwsSdkSigV4Signer = __webpack_require__(2654);
// EXTERNAL MODULE: ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsRestJsonProtocol.js + 6 modules
var AwsRestJsonProtocol = __webpack_require__(2961);
// EXTERNAL MODULE: ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js
var noAuth = __webpack_require__(2962);
// EXTERNAL MODULE: ../../node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js
var NoOpLogger = __webpack_require__(2619);
// EXTERNAL MODULE: ../../node_modules/@smithy/url-parser/dist-es/index.js + 1 modules
var url_parser_dist_es = __webpack_require__(2589);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/fromBase64.js
var fromBase64 = __webpack_require__(2659);
// EXTERNAL MODULE: ../../node_modules/@smithy/util-base64/dist-es/toBase64.js
var toBase64 = __webpack_require__(2660);
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
;// ../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/ruleset.js
const u = "required", v = "fn", w = "argv", x = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = { [u]: false, "type": "string" }, j = { [u]: true, "default": false, "type": "boolean" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] }, p = { [x]: g }, q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] }, r = [l], s = [m], t = [{ [x]: "Region" }];
const _data = { version: "1.0", parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i }, rules: [{ conditions: [{ [v]: b, [w]: [k] }], rules: [{ conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: k, properties: n, headers: n }, type: e }], type: f }, { conditions: [{ [v]: b, [w]: t }], rules: [{ conditions: [{ [v]: "aws.partition", [w]: t, assign: g }], rules: [{ conditions: [l, m], rules: [{ conditions: [{ [v]: c, [w]: [a, o] }, q], rules: [{ endpoint: { url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: r, rules: [{ conditions: [{ [v]: c, [w]: [o, a] }], rules: [{ conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://portal.sso.{Region}.amazonaws.com", properties: n, headers: n }, type: e }, { endpoint: { url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: s, rules: [{ conditions: [q], rules: [{ endpoint: { url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
const ruleSet = _data;

;// ../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/endpointResolver.js



const cache = new EndpointCache.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,resolveEndpoint.resolveEndpoint)(ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
customEndpointFunctions.customEndpointFunctions.aws = util_endpoints_dist_es.awsEndpointFunctions;

;// ../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.shared.js









const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2019-06-10",
        base64Decoder: config?.base64Decoder ?? fromBase64.fromBase64,
        base64Encoder: config?.base64Encoder ?? toBase64.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOHttpAuthSchemeProvider,
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
        protocol: config?.protocol ?? new AwsRestJsonProtocol.AwsRestJsonProtocol({ defaultNamespace: "com.amazonaws.sso" }),
        serviceId: config?.serviceId ?? "SSO",
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
;// ../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.js














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
            (0,defaultUserAgent.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_namespaceObject.version }),
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
;// ../../node_modules/@aws-sdk/client-sso/dist-es/auth/httpAuthExtensionConfiguration.js
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

;// ../../node_modules/@aws-sdk/client-sso/dist-es/runtimeExtensions.js




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,dist_es_extensions.getAwsRegionExtensionConfiguration)(runtimeConfig), (0,defaultExtensionConfiguration.getDefaultExtensionConfiguration)(runtimeConfig), (0,httpExtensionConfiguration.getHttpHandlerExtensionConfiguration)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,dist_es_extensions.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0,defaultExtensionConfiguration.resolveDefaultRuntimeConfig)(extensionConfiguration), (0,httpExtensionConfiguration.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

;// ../../node_modules/@aws-sdk/client-sso/dist-es/SSOClient.js
















class SSOClient extends client.Client {
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
            httpAuthSchemeParametersProvider: defaultSSOHttpAuthSchemeParametersProvider,
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

;// ../../node_modules/@aws-sdk/credential-provider-sso/dist-es/loadSso.js




/***/ })

};
;
//# sourceMappingURL=10.js.map