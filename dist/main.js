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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const make_1 = require("./make");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pageId = core.getInput('pageId');
            const pageTitle = core.getInput('pageTitle');
            const contentsJson = core.getInput('contentsJson');
            const jiraAuth = process.env.JIRA_AUTH;
            const jiraUrl = process.env.JIRA_URL;
            core.debug(`pageId: ${pageId}`);
            core.debug(`pageTitle: ${pageTitle}`);
            core.debug(`contentsJson: ${contentsJson}`);
            core.debug(`jiraAuth: ${jiraAuth}`);
            core.debug(`jiraUrl: ${jiraUrl}`);
            if (lodash_1.default.isEmpty(pageId) || lodash_1.default.isEmpty(jiraAuth) || lodash_1.default.isEmpty(jiraUrl)) {
                console.log('Check Value');
                return;
            }
            const currentPage = yield axios_1.default.get(`${jiraUrl}/wiki/rest/api/content/${pageId}?expand=body.storage,version`);
            const version = lodash_1.default.get(currentPage, 'version.number', '');
            const prevContents = lodash_1.default.get(currentPage, 'body.storage.value', '');
            yield axios_1.default.put(`${jiraUrl}/wiki/rest/api/content/${pageId}`, {
                "version": {
                    "number": lodash_1.default.toInteger(version) + 1
                },
                "title": pageTitle,
                "type": "page",
                "body": {
                    "storage": {
                        "value": `${prevContents}${(0, make_1.makeContents)(contentsJson)}`,
                        "representation": "storage"
                    }
                }
            }, {
                headers: {
                    "Authorization": `Basic ${jiraAuth}`
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                core.setFailed(error.message);
            }
        }
    });
}
run();
