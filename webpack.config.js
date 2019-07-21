const path = require('path');
const pathToPublicFolder = path.join(__dirname, 'public');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: pathToPublicFolder,
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        }]
    }
}