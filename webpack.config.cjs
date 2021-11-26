const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    target: "node",
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, 'public'),
    //     },
    //     compress: true,
    //     port: 3000,
    // },
}