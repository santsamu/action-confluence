import * as core from "@actions/core";

const ParsingType = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    li: 'li'
} as const;
export type ParsingType = typeof ParsingType[keyof typeof ParsingType];

export function getHtmlValue(type: ParsingType, contents: string) {
    try {
        switch (type) {
            case 'h1':
                return `<h1>${contents}</h1>`
            case 'h2':
                return `<h2>${contents}</h2>`
            case 'h3':
                return `<h3>${contents}</h3>`
            case 'h4':
                return `<h4>${contents}</h4>`
            case 'h5':
                return `<h5>${contents}</h5>`
            case 'h6':
                return `<h6>${contents}</h6>`
            case 'p':
                return `<p>${contents}</p>`
            case 'li':
                return `<li>${contents}</li>`
            default:
                return contents
        }
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}