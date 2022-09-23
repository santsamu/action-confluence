"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeContents = void 0;
const core = __importStar(require("@actions/core"));
const lodash_1 = __importDefault(require("lodash"));
const parse_1 = require("./parse");
function makeHtml(jsonString) {
    let html = '';
    Object.keys(jsonString).map((x) => {
        const val = lodash_1.default.get(jsonString, x, '');
        const splitVal = lodash_1.default.split(val, '\n');
        if (lodash_1.default.isArray(splitVal)) {
            if (lodash_1.default.isEqual(x, 'li')) {
                html += '<ul>';
                splitVal.map(y => {
                    html += (0, parse_1.getHtmlValue)(x, y);
                });
                html += '</ul>';
            }
            else {
                splitVal.map(y => {
                    html += (0, parse_1.getHtmlValue)(x, y);
                });
            }
        }
        else {
            html += (0, parse_1.getHtmlValue)(x, val);
        }
    });
    return html;
}
function makeContents(contentsJson) {
    try {
        const jsonString = JSON.parse(contentsJson);
        let result = '';
        if (lodash_1.default.isArray(jsonString)) {
            jsonString.forEach((x) => {
                result += makeHtml(x);
            });
        }
        else {
            result += makeHtml(jsonString);
        }
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}
exports.makeContents = makeContents;
