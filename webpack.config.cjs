const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
} );

module.exports =  {
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
    plugins: [
        new webpack.DefinePlugin( {
            "process.env": dotenv.parsed
        } ),
    ],
}