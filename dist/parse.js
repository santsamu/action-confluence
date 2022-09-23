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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlValue = void 0;
const core = __importStar(require("@actions/core"));
const ParsingType = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    li: 'li'
};
function getHtmlValue(type, contents) {
    try {
        switch (type) {
            case 'h1':
                return `<h1>${contents}</h1>`;
            case 'h2':
                return `<h2>${contents}</h2>`;
            case 'h3':
                return `<h3>${contents}</h3>`;
            case 'h4':
                return `<h4>${contents}</h4>`;
            case 'h5':
                return `<h5>${contents}</h5>`;
            case 'h6':
                return `<h6>${contents}</h6>`;
            case 'p':
                return `<p>${contents}</p>`;
            case 'li':
                return `<li>${contents}</li>`;
            default:
                return contents;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}
exports.getHtmlValue = getHtmlValue;
