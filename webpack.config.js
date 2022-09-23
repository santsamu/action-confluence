const { resolve } = require('path')

module.exports = {
    entry: './dist/main.js',
    target: 'node',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    }
}