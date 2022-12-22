"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudWatchLogger = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var aws_sdk_1 = require("aws-sdk");
var CloudWatchLogger = /** @class */ (function () {
    function CloudWatchLogger(options) {
        this.options = options;
        var _a = this.options, _ = _a.groupName, __ = _a.streamName, cloudwatchOptions = __rest(_a, ["groupName", "streamName"]);
        this.cloudwatch = new aws_sdk_1.CloudWatchLogs(cloudwatchOptions);
    }
    CloudWatchLogger.prototype.serialize = function (level, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        var data = JSON.stringify({
            message: message,
            optionalParams: optionalParams,
        }, null, '\t');
        return "[".concat(level, "][").concat((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss'), "] ").concat(data);
    };
    CloudWatchLogger.prototype.write = function (level, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        this.cloudwatch.putLogEvents({
            logGroupName: this.options.groupName,
            logStreamName: this.options.streamName,
            logEvents: [
                {
                    message: this.serialize.apply(this, __spreadArray([level, message], optionalParams, false)),
                    timestamp: Date.now(),
                },
            ],
        }, function (err, _) {
            if (err) {
                console.error(err);
            }
        });
    };
    CloudWatchLogger.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.write.apply(this, __spreadArray(['log', message], optionalParams, false));
    };
    CloudWatchLogger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.write.apply(this, __spreadArray(['error', message], optionalParams, false));
    };
    CloudWatchLogger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.write.apply(this, __spreadArray(['warn', message], optionalParams, false));
    };
    CloudWatchLogger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.write.apply(this, __spreadArray(['debug', message], optionalParams, false));
    };
    CloudWatchLogger.prototype.verbose = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.write.apply(this, __spreadArray(['verbose', message], optionalParams, false));
    };
    CloudWatchLogger.create = function (options) {
        return new CloudWatchLogger(options);
    };
    return CloudWatchLogger;
}());
exports.CloudWatchLogger = CloudWatchLogger;
