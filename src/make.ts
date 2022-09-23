import * as core from "@actions/core";
import _ from "lodash";
import { getHtmlValue } from "./parse";

function makeHtml(jsonString: JSON) {
    let html = ''
    Object.keys(jsonString).map((x: any) => {
        const val = _.get(jsonString, x, '');
        const splitVal = _.split(val, '\n')
        if(_.isArray(splitVal)){
            if(_.isEqual(x, 'li')) {
                html += '<ul>'
                splitVal.map(y => {
                    html += getHtmlValue(x, y);
                })
                html += '</ul>'
            } else {
                splitVal.map(y => {
                    html += getHtmlValue(x, y);
                })
            }
        } else {
            html += getHtmlValue(x, val);
        }
    })
    return html;
}

export function makeContents(contentsJson: string) {
    try {
        const jsonString = JSON.parse(contentsJson);
        let result = '';
        if(_.isArray(jsonString)) {
            jsonString.forEach((x) => {
                result += makeHtml(x)
            })
        } else {
            result += makeHtml(jsonString)
        }
        return result;
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}