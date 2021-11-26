const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        module: true
    },
    experiments: {
        outputModule: true,
    },
    target: "node16.13",
    mode: "production",
}